import type React from "react";

interface LoaderProps {
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text = 'Loading' }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <p className="fs-4">{text}</p>
      <div className="spinner-border" role="status" />
    </div>
  );
};