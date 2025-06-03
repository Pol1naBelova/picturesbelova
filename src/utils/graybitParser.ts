import React from 'react';

interface Props {
  onImageLoaded: (image: HTMLImageElement | ImageData, meta?: any) => void;
}

const ImageUploader: React.FC<Props> = ({ onImageLoaded }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'gb7') {
      const buffer = await file.arrayBuffer();
      const { imageData, meta } = parseGrayBit7(buffer);
      onImageLoaded(imageData, meta);
    } else {
      const img = new Image();
      img.onload = () => onImageLoaded(img);
      img.src = URL.createObjectURL(file);
    }
  };

  return <input type="file" accept=".png,.jpg,.jpeg,.gb7" onChange={handleFileChange} />;
};

export default ImageUploader;
