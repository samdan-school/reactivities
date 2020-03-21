﻿import React, {useRef} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
  setImage: (file: Blob | null) => void;
  imagePreview: string;
}

const PhotoWidgetCropper: React.FC<IProps> = ({setImage, imagePreview}) => {
  const cropper = useRef<Cropper>(null);
  const cropImage = () => {
    if (cropper.current && typeof cropper.current.getCroppedCanvas() === 'undefined') return;
    cropper && cropper.current && cropper.current.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, 'image/jpeg');
  };

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{height: 200, width: '100%'}}
      aspectRatio={1}
      preview='.img-preview'
      guides={false}
      viewMode={1}
      dragMode='move'
      scalable
      cropBoxMovable
      cropBoxResizable
      crop={cropImage}/>
  );
};

export default PhotoWidgetCropper;