import { Grid } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';

export interface UploadabelFile {
  file: File;
  errors: FileError[];
  url?: string;
}

export function MultiplefileUploadField() {
  const [files, setFiles] = useState<UploadabelFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((crr) => [...crr, ...mappedAcc, ...rejFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  return (
    <React.Fragment>
      <Grid item>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Grid>
      <br />
      {JSON.stringify(files)}
      <br />
      {files.map((fileWrapper, idx) => (
        <SingleFileUploadWithProgress
          key={idx}
          file={fileWrapper.file}
          onDelete={onDelete}
          onUpload={onUpload}
        />
      ))}
    </React.Fragment>
  );
}
