import React from 'react';
import './Loading.scss';

const Loading = () => (
  <div className="loading-wrapper center">
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
