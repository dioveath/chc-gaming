const fs = require('fs');
const FFmpeg = require('fluent-ffmpeg');
const { Readable } = require('stream');

const { storage, ref, uploadBytes, getDownloadURL } = require('../config/firebase');
const { uploadBytesResumable } = require('firebase/storage');

module.exports = function encodeUploadClip(req, res, next) {
  if (!req.files) {
    return res.status(400).json({
      status: "fail",
      message: "No files were uploaded!",
    });
  }

  const { clip } = req.files;

  encodingAndUploading({ data: {
    media: { file: clip },
    userId: req.user.sub,
  } }, (videos, error) => {
    if(error)
      return res.status(400).json({
        status: "fail",
        errorList: ["Upload/Encode Error!", error.message],
      });          

    // create a clip body for creating clip in next middleware
    req.body = {
      ...req.body,
      author: req.user.sub,
      video_meta: videos[0].metadata,
      video_url: videos[0].video_url,
      likes: [],
      comments: []
    };

    return next();
  });

};

const encodingAndUploading = async (job, done) => {
  try {
    const { media } = job.data;
    const { file } = media;
    const fileMD5 = file.md5;
    const dir = `streams/${fileMD5}`; //dir to save

    //  Encode to various qualities
    console.log(`Start ${fileMD5} Encoding...`);
    const multipleResolution = [
      {
        output: `${file.name}_720p.mp4`,
        videoBitrate: "2400",
        audioBitrate: "128",
        size: "?x720",
      }
    ];

    const addOption = [
      "-crf 28",
      "-preset fast"
    ];

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const command = FFmpeg({ source: file.tempFilePath })
      .withVideoCodec("libx264")
      .withAudioCodec("aac");

    multipleResolution.forEach((data) => {
      // data : { output: string, videoBitrate: string, audioBitrate: string, size: string }
      command
        .output(`${dir}/${data.output}`, { end: true })
        .addOption(addOption)
        .withVideoBitrate(data.videoBitrate)
        .withAudioBitrate(data.audioBitrate)
        .withAudioChannels(2)
        .withSize(data.size);
    });

    command
      .on("codecData", (data) => {
        // job.progress(0, 100, "ENCODING");
        console.log(
          "Input is " + data.audio + " audio with " + data.video + " video"
        );
      })
      .on("progress", (progress) => {
        // job.progress(progress.percent, 100, "ENCODING");
        console.log("Encoding Processing: " + progress.percent + "% done");
      })
      .on("error", (err, stdout, stderr) => {
        console.log("Cannot process video: " + err.message, stdout, stderr);
        // job.failed().error(err);
      })
      .on("end", async () => {
        console.log("Encoding Process finished successfully");
        // Upload the files
        // await fileUpload(media, job.data.jwtToken, duration, job); // file upload into the DigitalOcean Spaces

        const encodedUploadedVideos = []; 

        multipleResolution.forEach(async (data) => {
          const videoPath = `${dir}/${data.output}`;
          const videoRef = ref(storage, `clips/${job.data.userId}/${data.output}`);

          const probeMetadata = await getVideoMetaData(videoPath);
          const stats = fs.statSync(videoPath);

          const metadata = {
            name: data.output,
            contentType: 'video/mp4',
            duration: probeMetadata?.streams[0].duration,
            size: stats.size,
            width: probeMetadata?.streams[0].width,
            height: probeMetadata?.streams[0].height
          };

          const uploadTask = await uploadBytesResumable(videoRef, fs.readFileSync(videoPath), metadata);

          uploadTask.task.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, (error) => {
            console.log('Upload failed:', error.message);            
          }, async () => {
            console.log('Uploaded a blob or file!');
            const downloadUrl = await getDownloadURL(videoRef);
            encodedUploadedVideos.push({
              video_url: downloadUrl,
              metadata
            });
            // fs.unlinkSync(videoPath);

            if(encodedUploadedVideos.length == multipleResolution.length) done(encodedUploadedVideos, null);
          });

        });


        // At this point we no longer need the source file, let's delete it.
        // Hoping the upload to Wasabi would be done by now. If not we will need to handle this
        fs.unlinkSync(file.tempFilePath);
      }).run();

  } catch (error) {
    console.log("Error: ", error);
    done(null, error);
  }
};


const getVideoMetaData = (filePath) => {
  let readStream = new Readable();
  readStream._read = () => {};
  readStream.push(fs.readFileSync(filePath));
  readStream.push(null);  
  return new Promise((resolve, reject) => {
    FFmpeg.ffprobe(readStream, (err, meta) => {
      if(err) reject(err);
      resolve(meta);
    });
  });
};
