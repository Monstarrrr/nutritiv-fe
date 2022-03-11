import React, { useState } from 'react'
import nutritivApi from '../Api/nutritivApi';

export const ProfileAvatar = () => {
  const [file, setFile] = useState(null)

  const handleUpload = (e) => {
    setFile(e.target.files[0])
  }
  
  const onClick = () => {
    var data = new FormData();
    data.append("imageFile", file);
    
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
    <>
      <h3>
        Avatar
      </h3>
      <form onSubmit={() => false}>
        <input 
          id="file" 
          name="imageFile"
          type="file"
          onChange={handleUpload}
        />
        <br />
        <button
          disabled={!file}
          id="upload" 
          type="button" 
          onClick={onClick}
        >
          Save avatar
        </button>
      </form>

    </>
  );
};