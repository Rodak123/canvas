import type React from "react";

interface LoaderProps {
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text = 'Loading' }) => {
  return (
    <>
      <p>{text}...</p>
    </>
  );
};