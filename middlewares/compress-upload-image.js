const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');

const fs = require("fs");

const { storage, ref, getDownloadURL } = require("../config/firebase");
const { uploadBytesResumable } = require("firebase/storage");

module.exports = function compressUploadImage(req, res, next) {
  if (!req.files) {
    return res.status(400).json({
      status: "fail",
      errorList: ["No files were uploaded!"],
    });
  }

  const { photo } = req.files;

  compressAndUpload(
    {
      data: {
        media: { file: photo },
        userId: req.user.sub,
      },
    },
    (photo, error) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          status: "fail",
          errorList: [error.message],
        });        
      }

      req.body = {
        profile_link: photo.url,
      };
      req.params.id = req.user.sub;


      return next();
    }
  );
};

const compressAndUpload = async (job, done) => {
  const { media } = job.data;
  const { file } = media;

  try {
    const { userId } = job.data;
    const fileMD5 = file.md5;
    const dir = `photos/${fileMD5}`;    


    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const tempPath = `${dir}/${file.name}`;
    file.mv(tempPath);

    const files = await imagemin([tempPath], {
      destination: dir,
      plugins: [
        imageminMozjpeg({ quality: 10 }),
        imageminJpegtran({ progressive: true }),
        imageminPngquant({
          speed: 1,
          posterize: 1,
          dithering: 0.7,
          quality: [0, 0.04]}),        
      ],
    });

    const photoRef = ref(storage, `users/${userId}/images/profile_image`);


    if(files.length <= 0) {
      fs.unlinkSync(tempPath);      
      return done(null, new Error("Image types not supported!"));
    }

    console.log(files[0].destinationPath);
    const metadata = {
      contentType: 'image/png'
    };    

    const uploadTask = await uploadBytesResumable(
      photoRef,
      fs.readFileSync(tempPath),
      metadata
    );

    uploadTask.task.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload photo is " + progress + "% done");
      },
      (error) => {
        console.log("Upload photo failed:", error.message);
        fs.unlinkSync(files[0].destinationPath);        
        fs.unlinkSync(tempPath);
        return done(null, error);
      },
      async () => {
        console.log("Uploaded a photo!");
        fs.unlinkSync(files[0].destinationPath);        
        // fs.unlinkSync(tempPath);
        const downloadUrl = await getDownloadURL(photoRef);
        console.log(downloadUrl);
        return done({ url: downloadUrl }, null);
      }
    );

  } catch (e) {
    console.log(e);
    console.log("Error: " + e.message);
    return done(null, e);
  }
};
