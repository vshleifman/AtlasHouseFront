import { DropzoneState } from 'react-dropzone';

const PicInput = ({
  dropzone,
  picturesState,
  setter,
  pictureData,
}: {
  dropzone: DropzoneState;
  picturesState: typeof pictureData[];
  setter: (arg: any) => void;
  pictureData: { picture: string; name: string };
}) => {
  const isEmptyInput = pictureData.picture === '';

  const onClickErase = () => {
    const redactedPicturesState = picturesState.filter(picture => picture.picture !== pictureData.picture);
    setter(redactedPicturesState);
  };

  const EmptyInput = (
    <div
      tw={
        'max-height[18rem] h-20 min-w-15 width[fit-content] border-2 border-solid border-secondary bg-thinPlusSvg bg-primary bg-center bg-no-repeat transition-all duration-200 hover:bg-hover hover:bg-center hover:bg-no-repeat hover:bg-thickPlusSvg'
      }
      {...dropzone.getRootProps()}
    >
      <input {...dropzone.getInputProps()} />
      <img
        tw="h-full transition-all duration-200 hover:opacity-30"
        src={pictureData.picture ? `data:image/jpg;base64, ${pictureData.picture}` : undefined}
      />
    </div>
  );

  const FilledInput = (
    <div
      tw={
        'max-height[18rem] h-20 min-w-15 width[fit-content] border-2 border-solid border-secondary bg-thinPlusSvg bg-primary bg-center bg-no-repeat background-size[30px 30px] transition-all duration-200 hover:bg-hover hover:bg-center hover:bg-no-repeat hover:bg-closeSvg'
      }
      onClick={onClickErase}
    >
      <img
        tw="h-full transition-all duration-200 hover:opacity-30"
        src={pictureData.picture ? `data:image/jpg;base64, ${pictureData.picture}` : undefined}
      />
    </div>
  );

  return <>{isEmptyInput ? EmptyInput : FilledInput}</>;
};

export default PicInput;
