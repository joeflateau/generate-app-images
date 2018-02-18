# generate-app-images

## What:

This can take a single icon image and generate all of the icons and splash images you need for iOS and Android cordova apps.

## How: 

This exports a single function, `writeImages(options?: Options)`.

Options:
```javascript
{
    source: "./images/", // the folder where the source image(es) live
    fillColor: "", // the color to draw behind/around the image, default value is "". The special value "" (empty string) actually means we sample the top-left pixel and use that color
    applyGradientToIcons: true // whether to draw a gradient over the image to give it a 3d look
}
```

