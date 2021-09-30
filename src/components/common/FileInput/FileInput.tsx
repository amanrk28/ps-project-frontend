import React, { useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { uploadFile } from 'utils/utils';
import './FileInput.scss';

interface FileInputProps {
  onChange: (url: string | undefined) => void;
}

interface UploadObjectProps {
  name: string;
  url?: string | undefined;
}

const FileInput = ({ onChange }: FileInputProps) => {
  const [fileName, setFileName] = useState('');

  const onUploadImage = async (event: React.FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files && files.length > 0) {
      const uploadObj: UploadObjectProps = await uploadFile(files[0]);
      setFileName(uploadObj.name);
      onChange(uploadObj.url);
    }
  };

  return (
    <div className="fileInput-wrapper">
      <label htmlFor="fileUpload" className="fileInput-upload">
        {!fileName && (
          <div className="imagebox center">
            <FileUploadIcon />
          </div>
        )}
        <div className="text">{fileName || 'Upload'}</div>
      </label>
      <input
        id="fileUpload"
        className="customFileInput"
        type="file"
        accept="image/*"
        onChange={onUploadImage}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileInput;
