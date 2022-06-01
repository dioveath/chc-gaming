const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const fs = require('fs');

(async () => {
  const dir = `compressed`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }    

  const files = await imagemin([`test.jpg`], {
    destination: dir,
    plugins: [
      imageminMozjpeg({ quality: 50 }),
      imageminJpegtran({ progressive: true }),      
    ]
  });

  console.log(files);

})();

