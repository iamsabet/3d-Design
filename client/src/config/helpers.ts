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
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
export const readerResizer = (file: any) => {
  let fileFormat: string = file.name.split(".")[file.name.split(".").length - 1]
  if (fileFormat === "jpg") {
    fileFormat = "jpeg";
  }
  fileFormat = fileFormat.toUpperCase()
  return new Promise((resolve, _reject) => {
    Resizer.imageFileResizer(
      file,
      1024,
      1024,
      fileFormat,
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );

  });
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
