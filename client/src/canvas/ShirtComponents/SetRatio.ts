import React from 'react'

const SetRatio = (img: string, setter: React.Dispatch<React.SetStateAction<number>>, canvasId: string) => {
    const image = new Image();
    image.src = img;
    canvasId;
    // console.count("ratio calculates for canvas " + canvasId)
    //Validate the File Height and Width.
    image.onload = function () {
        // @ts-ignore
        var height = this.height;
        // @ts-ignore
        var width = this.width;
        return setter((_) => width / height);
    };
}

export default SetRatio