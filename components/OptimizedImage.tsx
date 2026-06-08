import React from 'react';
import Image, {ImageProps} from 'next/image';

interface OptimizedImageProps
    extends Omit<ImageProps, 'src' | 'alt'> {
    src: string;
    alt: string;
    width: number;
    height: number;
    containerClassName?: string;
    imageClassName?: string;
    generateBlur?: boolean;
}

function generateBlurDataUrl(width: number, height: number): string {
    // SVG placeholder with aspect ratio preserved
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="#f0f0f0" width="${width}" height="${height}"/></svg>`;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export const OptimizedImage = React.forwardRef<
    HTMLImageElement,
    OptimizedImageProps
>(
    (
        {
            src,
            alt,
            width,
            height,
            priority = false,
            quality = 75,
            containerClassName = '',
            imageClassName = '',
            generateBlur = true,
            ...props
        },
        ref
    ) => {
        return (
            <div className={`relative overflow-hidden ${containerClassName}`}>
                <Image
                    ref={ref}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    priority={priority}
                    quality={quality}
                    placeholder={generateBlur ? 'blur' : 'empty'}
                    blurDataURL={generateBlur ? generateBlurDataUrl(width, height) : undefined}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={priority ? 'eager' : 'lazy'}
                    className={`object-cover ${imageClassName}`}
                    {...props}
                />
            </div>
        );
    }
);

OptimizedImage.displayName = 'OptimizedImage';