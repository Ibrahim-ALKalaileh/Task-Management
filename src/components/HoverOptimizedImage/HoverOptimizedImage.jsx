import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import "./HoverOptimizedImage.css";

const BaseImageWorker = new Worker(
  new URL("../../util/ImageWorker.js", import.meta.url)
);
const HoverImageWorker = new Worker(
  new URL("../../util/ImageWorker.js", import.meta.url)
);

const HoverOptimizedImage = ({ imgObj, onClickAction = () => {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [workerSrc, setWorkerSrc] = useState(null);
  const [workerHoverSrc, setWorkerHoverSrc] = useState(null);

  const {
    alt,
    src,
    src2x,
    src3x,
    hoverSrc,
    hoverSrc2x,
    hoversrc3x,
    width = "auto",
    height = "auto",
  } = imgObj;

  const getOptimalImageSrc = useCallback((src, src2x, src3x) => {
    if (window.innerWidth >= 2560 && src3x) return src3x;
    if (window.innerWidth >= 1440 && src2x) return src2x;
    return src;
  }, []);

  useEffect(() => {
    if (window.Worker) {
      const optimalSrc = getOptimalImageSrc(src, src2x, src3x);
      BaseImageWorker.postMessage({ imageUrl: optimalSrc });

      const handleBaseImage = (event) => {
        const { objectUrl } = event.data;
        setWorkerSrc(objectUrl);
      };

      BaseImageWorker.addEventListener("message", handleBaseImage);

      if (hoverSrc) {
        const optimalHoverSrc = getOptimalImageSrc(hoverSrc, hoverSrc2x, hoversrc3x);
        HoverImageWorker.postMessage({ imageUrl: optimalHoverSrc });

        const handleHoverImage = (event) => {
          const { objectUrl } = event.data;
          setWorkerHoverSrc(objectUrl);
        };

        HoverImageWorker.addEventListener("message", handleHoverImage);

        return () => {
          HoverImageWorker.removeEventListener("message", handleHoverImage);
        };
      }

      return () => {
        BaseImageWorker.removeEventListener("message", handleBaseImage);
      };
    } else {
      setWorkerSrc(getOptimalImageSrc(src, src2x, src3x));
      setWorkerHoverSrc(getOptimalImageSrc(hoverSrc, hoverSrc2x, hoversrc3x));
    }
  }, [src, src2x, src3x, hoverSrc, hoverSrc2x, hoversrc3x, getOptimalImageSrc]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className={`responsive-image-container ${isHovered ? "hoverImage" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: `${width}rem`, height: `${height}rem` }}
      onClick={onClickAction}
    >
      <img
        src={isHovered && workerHoverSrc ? workerHoverSrc : workerSrc}
        alt={alt}
        className="responsive-image"
      />
    </div>
  );
};

HoverOptimizedImage.propTypes = {
  imgObj: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    src2x: PropTypes.string,
    src3x: PropTypes.string,
    hoverSrc: PropTypes.string,
    hoverSrc2x: PropTypes.string,
    hoversrc3x: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onClickAction: PropTypes.func,
};

export default React.memo(HoverOptimizedImage);
