import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const PicInput = ({
  picturesState,
  setPicturesState,
  currentPictureFile,
}: {
  picturesState: File[];
  setPicturesState: (arg: any) => void;
  currentPictureFile: File;
}) => {
  const isEmptyFile = currentPictureFile.name === '';

  const [picture64, setPicture64] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let newPicState: File[] = picturesState;

      newPicState = [...newPicState, ...acceptedFiles];
      setPicturesState(newPicState);
    },
    [picturesState],
  );

  const dropzone = useDropzone({ onDrop });

  useEffect(() => {
    const fileTo64 = async () => {
      let binary = '';
      const bytes = new Uint8Array(await currentPictureFile.arrayBuffer());
      bytes.forEach(byte => (binary += String.fromCharCode(byte)));
      setPicture64(window.btoa(binary));
    };

    fileTo64();
  }, [currentPictureFile]);

  const onClickErase = () => {
    const redactedPicturesState = picturesState.concat();
    redactedPicturesState.splice(
      redactedPicturesState.findIndex(pictureFile => pictureFile.name === currentPictureFile.name),
      1,
    );
    setPicturesState(redactedPicturesState);
  };

  const EmptyInput = (
    <div
      tw={
        'max-height[18rem] h-20 min-w-15 width[fit-content] border-2 border-solid border-secondary bg-thinPlusSvg bg-primary bg-center bg-no-repeat transition-all duration-200 hover:bg-hover hover:bg-center hover:bg-no-repeat hover:bg-thickPlusSvg'
      }
      {...dropzone.getRootProps()}
    >
      <input {...dropzone.getInputProps()} />
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
        src={picture64 ? `data:${currentPictureFile.type};base64, ${picture64}` : undefined}
        alt=""
      />
    </div>
  );

  return <>{isEmptyFile ? EmptyInput : FilledInput}</>;
};

export default PicInput;
