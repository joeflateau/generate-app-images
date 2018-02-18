const Canvas = require("canvas");
const Image = Canvas.Image;
const fs = require("fs");

function writeImages(source = "./images/icon-1024.png", fillColor = "") {
  const img = openImage(source);

  if (fillColor === "") {
    const canvas = new Canvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const rgba = ctx.getImageData(0, 0, 1, 1).data;
    fillColor = `rgba(${rgba.join(",")})`;
  }

  [
    [40, 40, img, `./resources/ios/icon/icon-40.png`],
    [80, 80, img, `./resources/ios/icon/icon-40@2x.png`],
    [120, 120, img, `./resources/ios/icon/icon-40@3x.png`],
    [50, 50, img, `./resources/ios/icon/icon-50.png`],
    [100, 100, img, `./resources/ios/icon/icon-50@2x.png`],
    [60, 60, img, `./resources/ios/icon/icon-60.png`],
    [120, 120, img, `./resources/ios/icon/icon-60@2x.png`],
    [180, 180, img, `./resources/ios/icon/icon-60@3x.png`],
    [72, 72, img, `./resources/ios/icon/icon-72.png`],
    [144, 144, img, `./resources/ios/icon/icon-72@2x.png`],
    [76, 76, img, `./resources/ios/icon/icon-76.png`],
    [152, 152, img, `./resources/ios/icon/icon-76@2x.png`],
    [167, 167, img, `./resources/ios/icon/icon-83.5@2x.png`],
    [1024, 1024, img, `./resources/ios/icon/icon-1024.png`],
    [29, 29, img, `./resources/ios/icon/icon-small.png`],
    [58, 58, img, `./resources/ios/icon/icon-small@2x.png`],
    [87, 87, img, `./resources/ios/icon/icon-small@3x.png`],
    [57, 57, img, `./resources/ios/icon/icon.png`],
    [114, 114, img, `./resources/ios/icon/icon@2x.png`],
    [72, 72, img, `./resources/android/icon/drawable-hdpi-icon.png`],
    [38, 38, img, `./resources/android/icon/drawable-ldpi-icon.png`],
    [48, 48, img, `./resources/android/icon/drawable-mdpi-icon.png`],
    [96, 96, img, `./resources/android/icon/drawable-xhdpi-icon.png`],
    [144, 144, img, `./resources/android/icon/drawable-xxhdpi-icon.png`],
    [192, 192, img, `./resources/android/icon/drawable-xxxhdpi-icon.png`]
  ].forEach(([width, height, image, path]) =>
    writeImage(width, height, image, true, path, null, fillColor)
  );

  [
    [640, 1136, img, "./resources/ios/splash/Default-568h@2x~iphone.png", 512],
    [
      1536,
      2048,
      img,
      "./resources/ios/splash/Default-Portrait@2x~ipad.png",
      512
    ],
    [1024, 768, img, "./resources/ios/splash/Default-Landscape~ipad.png", 512],
    [768, 1024, img, "./resources/ios/splash/Default-Portrait~ipad.png", 512],
    [1242, 2208, img, "./resources/ios/splash/Default-736h.png", 512],
    [
      2732,
      2048,
      img,
      "./resources/ios/splash/Default-Landscape@~ipadpro.png",
      512
    ],
    [320, 480, img, "./resources/ios/splash/Default~iphone.png", 300],
    [
      2048,
      1536,
      img,
      "./resources/ios/splash/Default-Landscape@2x~ipad.png",
      512
    ],
    [
      2048,
      2732,
      img,
      "./resources/ios/splash/Default-Portrait@~ipadpro.png",
      512
    ],
    [
      2732,
      2732,
      img,
      "./resources/ios/splash/Default@2x~universal~anyany.png",
      512
    ],
    [2208, 1242, img, "./resources/ios/splash/Default-Landscape-736h.png", 512],
    [640, 960, img, "./resources/ios/splash/Default@2x~iphone.png", 512],
    [750, 1334, img, "./resources/ios/splash/Default-667h.png", 512],

    [
      960,
      1600,
      img,
      "./resources/android/splash/drawable-port-xxhdpi-screen.png",
      512
    ],
    [
      720,
      128,
      img,
      "./resources/android/splash/drawable-port-xhdpi-screen.png",
      512
    ],
    [
      1280,
      1920,
      img,
      "./resources/android/splash/drawable-port-xxxhdpi-screen.png",
      512
    ],
    [
      1600,
      960,
      img,
      "./resources/android/splash/drawable-land-xxhdpi-screen.png",
      512
    ],
    [
      1280,
      720,
      img,
      "./resources/android/splash/drawable-land-xhdpi-screen.png",
      512
    ],
    [
      480,
      800,
      img,
      "./resources/android/splash/drawable-port-hdpi-screen.png",
      512
    ],
    [
      480,
      320,
      img,
      "./resources/android/splash/drawable-land-mdpi-screen.png",
      300
    ],
    [
      200,
      320,
      img,
      "./resources/android/splash/drawable-port-ldpi-screen.png",
      128
    ],
    [
      1920,
      1280,
      img,
      "./resources/android/splash/drawable-land-xxxhdpi-screen.png",
      512
    ],
    [
      320,
      480,
      img,
      "./resources/android/splash/drawable-port-mdpi-screen.png",
      300
    ],
    [
      320,
      200,
      img,
      "./resources/android/splash/drawable-land-ldpi-screen.png",
      200
    ],
    [
      800,
      480,
      img,
      "./resources/android/splash/drawable-land-hdpi-screen.png",
      300
    ]
  ].forEach(([width, height, image, path, size]) =>
    writeImage(width, height, image, false, path, size, fillColor)
  );
}

function openImage(path) {
  const img = new Image();
  const data = fs.readFileSync(path);
  img.src = data;
  return img;
}

function writeImage(
  width,
  height,
  image,
  drawGradient,
  savePath,
  size,
  fillColor
) {
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  ctx.fillStyle = fillColor;

  ctx.fillRect(0, 0, width, height);

  if (size == null) {
    ctx.drawImage(image, 0, 0, width, height);
  } else {
    ctx.drawImage(
      image,
      width / 2 - size / 2,
      height / 2 - size / 2,
      size,
      size
    );
  }
  if (drawGradient) {
    ctx.globalCompositeOperation = "soft-light";

    const shadow = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    shadow.addColorStop(0.0, "rgba(255,255,255,0.6)");
    shadow.addColorStop(1.0, "rgba(000,000,000,0.6)");
    ctx.fillStyle = shadow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "source-over";
  }
  fs.writeFileSync(savePath, canvas.toBuffer());
}

module.exports.writeImages = writeImages;
