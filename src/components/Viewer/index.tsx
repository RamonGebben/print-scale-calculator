import React, { useCallback, useState } from 'react';
import { ModelDimensions, StlViewer } from 'react-stl-viewer';

type Props = {
  scale: number;
  onFinishLoading?: (dimensions: ModelDimensions) => void;
};

const Viewer: React.FC<Props> = ({ scale, onFinishLoading }) => {
  const [file, setFile] = useState<File>();
  const [dragOver, setDragOver] = useState<boolean>(false);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('file dropped');
    setFile(e.dataTransfer.files[0]);
  }, []);

  const extraProps = {
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
    },
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(true);
    },
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(true);
    },
    onDrop,
  };

  console.log(scale);

  return (
    <>
      {file && (
        <StlViewer
          url={URL.createObjectURL(file)}
          style={{
            position: 'absolute',
            top: '0vh',
            left: '0vw',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          shadows
          orbitControls
          onFinishLoading={onFinishLoading}
          modelProps={{
            color: '#008675',
            scale: isNaN(scale) ? 1 : scale / 100,
          }}
          showAxes
          floorProps={{
            gridLength: 350,
            gridWidth: 350,
          }}
          // {...extraProps}
        />
      )}
      {!file && (
        <div
          style={{
            position: 'absolute',
            top: '0vh',
            left: '0vw',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            {...extraProps}
            style={{
              maxWidth: '320px',
              width: '100%',
              height: '200px',
              border: '2px dashed #aaa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: dragOver ? '#aaa' : '#fff',
              transition: 'all .2s ease-out',
            }}
          >
            <h2>Drop STL</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Viewer;
