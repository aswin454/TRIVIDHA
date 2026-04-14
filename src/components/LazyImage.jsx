import { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

export default function LazyImage({ src, alt, width, height, className = '', loading = 'lazy' }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (loading === 'eager') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${loaded ? 'loaded' : 'loading'} ${className}`}
      style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}
    >
      {inView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={() => setLoaded(true)}
          className={`lazy-image ${loaded ? 'visible' : 'hidden'}`}
        />
      )}
      {!loaded && <div className="lazy-image-skeleton" />}
    </div>
  );
}
