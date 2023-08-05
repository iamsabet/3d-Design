import Resizer from "react-image-file-resizer";

export const downloadCanvasToImage = () => {
  const canvas = document.querySelector('canvas');
  setTimeout(() => {

    const dataURL = canvas?.toDataURL();
    const link = document.createElement("a");

    link.href = dataURL || "";
    link.download = "canvas.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 50)
};
export const makeid = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
export const reader = (file: any) =>
  new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      var image = new Image();
      // @ts-ignore
      image.src = e.target.result;
      //Validate the File Height and Width.
      image.onload = function () {
        // @ts-ignore
        var height = this.height;
        // @ts-ignore
        var width = this.width;
        resolve({ "file": fileReader.result, "width": width, "height": height });
      };


    }
    if (file && file.name)
      fileReader.readAsDataURL(file);
  });
export const readerResizer = (file: any) => {
  return new Promise((resolve, _reject) => {
    reader(file)
      .then((result: any) => {
        const width: number = result["width"]
        const height: number = result["height"]
        const ratio = width / height;
        const maxFixed = 1024;
        console.log("Original : " + width + " X " + height)

        var fileFormat: string = file.name.split(".")[file.name.split(".").length - 1]
        if (fileFormat === "jpg") {
          fileFormat = "jpeg";
        }

        fileFormat = fileFormat.toUpperCase()
        var finalWidth = 0
        var finalHeight = 0
        if (width < maxFixed && height < maxFixed) {
          console.log("Not Resized : " + width + " X " + height)
          resolve(result["file"])
        }
        else {
          if (ratio >= 1) {
            finalWidth = maxFixed;
            const wRatio = maxFixed / width
            finalHeight = Math.round(height * wRatio)
          }
          else {
            finalHeight = maxFixed;
            const hRatio = maxFixed / height
            finalWidth = Math.round(width * hRatio)
          }
          console.log("Resized : " + finalWidth + " X " + finalHeight)
          Resizer.imageFileResizer(
            file,
            finalWidth,
            finalHeight,
            fileFormat,
            100,
            0,
            (uri) => {
              resolve(uri);
            },
            "base64"
          );
        }

      }).catch(e => {
        console.error(e)
        _reject(e);
      })
  })

}

export const getContrastingColor = (color: any) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};
