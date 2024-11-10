import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Box
      sx={{
        border: "3px dotted lightgray",
        p: 1,
        borderRadius: 3,
        cursor: "pointer",
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag `n` drop some files here, or click to select files</p>
        )}
      </div>
    </Box>
  );
};

export default FileDropZone;
