import { useEffect, useRef, useState } from "react";

export default function LazyVideo({ src }) {
    const ref = useRef();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setShow(true);
                observer.disconnect();
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="absolute inset-0">
            {show && (
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={src} type="video/mp4" />
                </video>
            )}
        </div>
    );
}