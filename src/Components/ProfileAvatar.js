import React, { useState } from 'react'
import nutritivApi from '../Api/nutritivApi';

export const ProfileAvatar = () => {
  const [file, setFile] = useState(null)
  
  const handleUpload = (e) => {
    setFile(e.target.files[0])
  }
  
  const onClick = () => {
    var data = new FormData();
    data.append("file", file);
    
    try {
      nutritivApi.post(
        `/users/addAvatar`,
        data,
      )
    } catch (err) {
      console.log('# err :', err)
    }
  };

  return (
    <form onSubmit={() => false}>
      <input 
        id="file" 
        type="file" 
        onChange={handleUpload}
      />
      <button
        id="upload" 
        type="button" 
        onClick={onClick}
      >
        Upload
      </button>
    </form>
  );
};