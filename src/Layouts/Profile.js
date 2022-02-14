import React from 'react';
import { storageValues } from '../Helpers/localStorage';

export default function Profile() {
  return (
    <div>
      <h3>
        accessToken: 
      </h3>
      <p style={{fontSize: '12px'}}>
        { storageValues.accessToken }
      </p>
      <h3>
        refreshToken:
      </h3>
      <p style={{fontSize: '12px'}}>
        { storageValues.refreshToken }
      </p>
    </div>
  )
}
