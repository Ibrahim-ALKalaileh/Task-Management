import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./OptimizedImage.css";

const ImageWorker = new Worker(
  new URL("../../util/ImageWorker.js", import.meta.url)
);

const OptimizedImage = ({ imgObj, onClickAction = () => {}, className = "" }) => {
  const [workerSrc, setWorkerSrc] = useState(null);

  const {
    alt,
    src,
    src2x = null,
    src3x = null,
    width = "auto",
    height = "auto",
  } = imgObj;

  const getOptimalImageSrc = useCallback((src, src2x, src3x) => {
    if (window.innerWidth >= 2560 && src3x) return src3x;
    if (window.innerWidth >= 1440 && src2x) return src2x;
    return src;
  }, []);

  useEffect(() => {
    let currentWorkerSrc = null; 

    if (window.Worker) {
      const optimalSrc = getOptimalImageSrc(src, src2x, src3x);
      ImageWorker.postMessage({ imageUrl: optimalSrc });

      const handleBaseImage = (event) => {
        const { objectUrl } = event.data;
        setWorkerSrc(objectUrl);
        currentWorkerSrc = objectUrl; 
      };

      ImageWorker.addEventListener("message", handleBaseImage);

      return () => {
        ImageWorker.removeEventListener("message", handleBaseImage);
        if (currentWorkerSrc) URL.revokeObjectURL(currentWorkerSrc); 
      };
    } else {
      setWorkerSrc(getOptimalImageSrc(src, src2x, src3x));
    }
  }, [src, src2x, src3x, getOptimalImageSrc]);

  return (
    <div
      className={`responsive-image-container ${className}`}
      style={{ width: `${width}rem`, height: `${height}rem` }}
      onClick={onClickAction}
    >
      <img
        src={workerSrc}
        alt={alt}
        className={`responsive-image ${className}`}
      />
    </div>
  );
};

OptimizedImage.propTypes = {
  imgObj: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    src2x: PropTypes.string,
    src3x: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onClickAction: PropTypes.func,
  className: PropTypes.string,
};

export default React.memo(OptimizedImage);
