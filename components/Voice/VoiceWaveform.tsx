'use client';

import { useEffect, useRef, useState } from 'react';

export interface VoiceWaveformProps {
  isActive?: boolean;
  audioData?: Uint8Array;
  color?: string;
  height?: number;
}

/**
 * Real-time audio waveform visualizer
 * Shows live waveform during recording/playback
 */
export const VoiceWaveform = ({
  isActive = false,
  audioData,
  color = '#3b82f6',
  height = 100,
}: VoiceWaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  // Initialize Web Audio API
  useEffect(() => {
    if (!isActive) return;

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyserNode);

        setAnalyser(analyserNode);
      } catch (error) {
        console.error('Audio initialization failed:', error);
      }
    };

    initAudio();
  }, [isActive]);

  // Draw waveform
  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const sliceWidth = canvas.width / dataArray.length;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, canvas.height - y);
        } else {
          ctx.lineTo(x, canvas.height - y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyser, color]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={height}
      className="w-full border border-gray-300 rounded bg-white"
    />
  );
};

/**
 * Static waveform display (for pre-recorded audio)
 */
export const StaticWaveform = ({
  audioData,
  color = '#3b82f6',
  height = 100,
}: {
  audioData: Uint8Array | number[];
  color?: string;
  height?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const sliceWidth = canvas.width / audioData.length;
    let x = 0;

    for (let i = 0; i < audioData.length; i++) {
      const v = (audioData[i] as number) / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        ctx.moveTo(x, canvas.height - y);
      } else {
        ctx.lineTo(x, canvas.height - y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }, [audioData, color]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={height}
      className="w-full border border-gray-300 rounded bg-white"
    />
  );
};
