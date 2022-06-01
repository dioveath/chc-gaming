const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');

(async () => {
  const dir = `compressed`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }    

  const files = await imagemin([`test2.jpg`], {
    destination: dir,
    plugins: [
      imageminMozjpeg({ quality: 10 }),
      imageminJpegtran({ progressive: true }),
      imageminPngquant({
        speed: 1,
        posterize: 1,
        dithering: 0.7,
        quality: [0, 0.04]}),
    ]
  });

  console.log(files);

})();

