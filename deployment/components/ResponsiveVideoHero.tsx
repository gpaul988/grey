'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ResponsiveVideoHeroProps {
  /** Mobile video URL (640px width, optimized for mobile networks) */
  videoMobile?: string;
  
  /** Desktop video URL (1920px width, full quality) */
  videoDesktop?: string;
  
  /** Fallback video (used on both mobile/desktop if specific versions not provided) */
  videoFallback?: string;
  
  /** Poster image (shown while video loads, or as final fallback) */
  posterImage?: string;
  
  /** Alt text for poster image */
  posterAlt?: string;
  
  /** Content to overlay on the video (title, text, etc.) */
  children?: React.ReactNode;
  
  /** Optional overlay opacity (0-1, default 0.4) */
  overlayOpacity?: number;
  
  /** Height in viewport units or pixels. Defaults to responsive heights */
  heights?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  
  /** Additional CSS classes */
  className?: string;
  
  /** Enable/disable lazy loading (default true) */
  lazy?: boolean;
  
  /** Callback when video starts playing */
  onVideoPlay?: () => void;
  
  /** Callback when video has loaded metadata */
  onVideoLoadedMetadata?: () => void;
}

export default function ResponsiveVideoHero({
  videoMobile,
  videoDesktop,
  videoFallback,
  posterImage,
  posterAlt = 'Hero background',
  children,
  overlayOpacity = 0.4,
  heights = {
    mobile: 'h-[50vh] sm:h-[60vh]',
    tablet: 'md:h-[70vh]',
    desktop: 'lg:h-[80vh] xl:h-[90vh]',
  },
  className = '',
  lazy = true,
  onVideoPlay,
  onVideoLoadedMetadata,
}: ResponsiveVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(!lazy);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Determine video source based on device type
  const getVideoSrc = () => {
    if (isMobile && videoMobile) return videoMobile;
    if (!isMobile && videoDesktop) return videoDesktop;
    return videoFallback || videoDesktop || videoMobile;
  };

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Handle video playback
  useEffect(() => {
    if (!videoRef.current || !isInView) return;

    const video = videoRef.current;
    
    const handlePlay = () => {
      onVideoPlay?.();
    };

    const handleLoadedMetadata = () => {
      setIsLoading(false);
      onVideoLoadedMetadata?.();
    };

    const handleError = () => {
      setVideoError(true);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Try to play
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented, will play on user interaction
        setIsLoading(false);
      });
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [isInView, onVideoPlay, onVideoLoadedMetadata]);

  const heightClasses = `${heights.mobile} ${heights.tablet} ${heights.desktop}`;

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-b-3xl ${heightClasses} ${className}`}
    >
      {/* Video Element */}
      {isInView && !videoError && (
        <video
          ref={videoRef}
          src={getVideoSrc()}
          poster={posterImage}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload={lazy ? 'metadata' : 'auto'}
        />
      )}

      {/* Poster Image Fallback (shown if no video or video fails) */}
      {(videoError || !isInView || !getVideoSrc()) && posterImage && (
        <Image
          src={posterImage}
          alt={posterAlt}
          fill
          priority={!lazy}
          className="object-cover"
        />
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 animate-pulse" />
      )}

      {/* Overlay for readability */}
      <div
        className="absolute inset-0 rounded-b-3xl"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start rounded-b-3xl">
        <div className="w-full h-full flex flex-col justify-center items-start text-left px-4 sm:px-6 md:px-10 lg:px-[4.5rem] xl:px-[4.5rem]">
          {children}
        </div>
      </div>

      {/* No script fallback */}
      <noscript>
        {posterImage && (
          <img
            src={posterImage}
            alt={posterAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </noscript>
    </section>
  );
}
