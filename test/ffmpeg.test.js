const FFmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { Readable } = require('stream');

const getVideoMetaData = (file) => {
  return new Promise((resolve, reject) => {
    FFmpeg.ffprobe(file, (err, meta) => {
      if(err) reject(err);
      resolve(meta);
    });
  });
};

(async () => {

  const videoPath = "streams/511f0cd00451f2350d9abb2bab078e55/MVI_2761.MP4_720p.mp4";
  let readStream = new Readable();
  readStream._read = () => {};
  readStream.push(fs.readFileSync(videoPath));
  readStream.push(null);


  const probeMetadata = await getVideoMetaData(readStream);
  const stats = fs.statSync(videoPath);
  console.log(stats);
  console.log(probeMetadata);
})();
