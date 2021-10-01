import React from 'react';
import LoaderRing from './LoaderRing';
import './Loading.scss';

interface LoadingProps {
  fullLoader?: boolean;
}

const Loading = ({ fullLoader = false }: LoadingProps) => (
  <div
    className={`${
      fullLoader ? 'fullLoading-wrapper' : 'partialLoading-wrapper'
    } center`}
  >
    <LoaderRing />
  </div>
);

export default Loading;
