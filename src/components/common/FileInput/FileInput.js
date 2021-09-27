import React, { useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { uploadFile } from 'utils/utils';
import './FileInput.scss';

const FileInput = ({ onChange }) => {
  const [fileName, setFileName] = useState('');

  const onUploadImage = async e => {
    const uploadObj = await uploadFile(e.target.files[0]);
    setFileName(uploadObj.name);
    onChange(uploadObj.url);
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
