'use client';
import { useState, useEffect } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageStorage = process.env.NEXT_PUBLIC_STORAGE_PROVIDER == "minio"
        ? `${process.env.NEXT_PUBLIC_MINIO_URL}/zucal-public`
        : `${process.env.NEXT_PUBLIC_AWS_URL}`
    const images = [
        { src: `${imageStorage}/main_page.png`, alt: "Main page" },
        { src: `${imageStorage}/schedule_page.png`, alt: "Schedule page" },
        { src: `${imageStorage}/book_page.png`, alt: "Book page" },
        { src: `${imageStorage}/profile_page.png`, alt: "Profile page" },
        { src: `${imageStorage}/login_page.png`, alt: "Login page" },
    ];

    useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const getImageStyles = (index: number) => {
        const position = (index - currentIndex + images.length) % images.length;
        const baseClasses = "absolute w-full h-full transition-all duration-1000 ease-out";

        if (position === 0) {
            return `${baseClasses} z-20 translate-x-0 translate-y-0 scale-100 opacity-100`;
        } else if (position === 1) {
            return `${baseClasses} z-10 translate-x-8 translate-y-4 scale-95 opacity-50`;
        } else {
            return `${baseClasses} z-0 translate-x-8 translate-y-4 scale-95 opacity-0`;
        }
    };

    return (
        <div className="relative w-full max-w-2xl h-96 my-8 mx-auto mb-0 p-4">
            <div className="relative w-full h-full">
                {images.map((image, index) => (
                    <div key={index} className={getImageStyles(index)}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;