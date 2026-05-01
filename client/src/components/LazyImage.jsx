import { useEffect, useRef, useState } from "react";

export default function LazyImage({ src, alt, className = "", ...props }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-opacity duration-500 ${
        imageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {isVisible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setImageLoaded(true)}
          className={className}
          {...props}
        />
      )}
    </div>
  );
}
