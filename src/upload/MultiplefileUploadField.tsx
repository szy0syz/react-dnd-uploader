import React, { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';

export interface UploadabelFile {
  file: File;
  errors: FileError[];
}

export function MultiplefileUploadField() {
  const [files, setFiles] = useState<UploadabelFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((crr) => [...crr, ...mappedAcc, ...rejFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {JSON.stringify(files)}
      </div>
      <br />
      <hr />
      <br />
      {files.map((fileWrapper,idx) => (
        <SingleFileUploadWithProgress key={idx} file={fileWrapper.file} />
      ))}
    </React.Fragment>
  );
}
