export const setCanvasPreview = (image: HTMLImageElement, canvas: HTMLCanvasElement, crop: { x: number, y: number, width: number, height: number }): string => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2d context");

    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
    );

    ctx.restore();

    return canvas.toDataURL();
}