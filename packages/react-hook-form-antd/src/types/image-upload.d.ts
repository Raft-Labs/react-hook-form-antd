export declare type Size = {
  width: number;
  height: number;
};
export declare type MediaSize = {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
};
export declare type Point = {
  x: number;
  y: number;
};
export declare type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};
export declare type VideoSrc = {
  src: string;
  type?: string;
};

export declare type CropperProps = {
  image?: string;
  video?: string | VideoSrc[];
  transform?: string;
  crop: Point;
  zoom: number;
  rotation: number;
  aspect: number;
  minZoom: number;
  maxZoom: number;
  cropShape: 'rect' | 'round';
  cropSize?: Size;
  objectFit?: 'contain' | 'horizontal-cover' | 'vertical-cover' | 'auto-cover';
  showGrid?: boolean;
  zoomSpeed: number;
  zoomWithScroll?: boolean;
  onCropChange: (location: Point) => void;
  onZoomChange?: (zoom: number) => void;
  onRotationChange?: (rotation: number) => void;
  onCropComplete?: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onCropAreaChange?: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onCropSizeChange?: (cropSize: Size) => void;
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
  onMediaLoaded?: (mediaSize: MediaSize) => void;
  style: {
    containerStyle?: React.CSSProperties;
    mediaStyle?: React.CSSProperties;
    cropAreaStyle?: React.CSSProperties;
  };
  classes: {
    containerClassName?: string;
    mediaClassName?: string;
    cropAreaClassName?: string;
  };
  restrictPosition: boolean;
  mediaProps:
    | React.ImgHTMLAttributes<HTMLElement>
    | React.VideoHTMLAttributes<HTMLElement>;
  disableAutomaticStylesInjection?: boolean;
  initialCroppedAreaPixels?: Area;
  initialCroppedAreaPercentages?: Area;
  onTouchRequest?: (e: React.TouchEvent<HTMLDivElement>) => boolean;
  onWheelRequest?: (e: WheelEvent) => boolean;
  setImageRef?: (ref: React.RefObject<HTMLImageElement>) => void;
  setVideoRef?: (ref: React.RefObject<HTMLVideoElement>) => void;
  setMediaSize?: (size: MediaSize) => void;
  setCropSize?: (size: Size) => void;
  nonce?: string;
};

export type ImgCropProps = {
  aspect?: number;
  shape?: 'rect' | 'round';
  grid?: boolean;
  quality?: number;
  fillColor?: string;
  zoom?: boolean;
  rotate?: boolean;
  minZoom?: number;
  maxZoom?: number;
  modalTitle?: string;
  modalWidth?: number | string;
  modalOk?: string;
  modalCancel?: string;
  modalMaskTransitionName?: string;
  modalClassName?: string;
  modalTransitionName?: string;
  onModalOk?: (file: void | boolean | string | Blob | File) => void;
  onModalCancel?: () => void;
  beforeCrop?: (file: RcFile, fileList: RcFile[]) => boolean | Promise<boolean>;
  onUploadFail?: (err: Error) => void;
  cropperProps?: Partial<CropperProps>;
};
