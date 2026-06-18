'use client';

import { useState, useRef, useEffect } from 'react';

export interface VoiceRecorderProps {
  onRecordComplete?: (audioBlob: Blob) => void;
  onError?: (error: Error) => void;
  maxDuration?: number; // seconds
  language?: string;
}

export const VoiceRecorder = ({
  onRecordComplete,
  onError,
  maxDuration = 60,
  language = 'en',
}: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if browser supports Web Audio API
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      setIsSupported(false);
      onError?.(new Error('Web Audio API not supported'));
    }
  }, [onError]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, {
          type: 'audio/webm',
        });
        onRecordComplete?.(audioBlob);

        // Cleanup
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        mediaRecorderRef.current = null;
      };

      mediaRecorder.onerror = (event) => {
        onError?.(new Error(`Recording error: ${event.error}`));
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // Timer
      timerRef.current = setInterval(() => {
        setDuration((prev) => {
          const next = prev + 1;
          if (next >= maxDuration) {
            stopRecording();
          }
          return next;
        });
      }, 1000);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to start recording'));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop all tracks
      streamRef.current?.getTracks().forEach((track) => track.stop());
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
        <p>Web Audio API is not supported in your browser.</p>
        <p className="text-sm mt-1">Please use a modern browser: Chrome, Firefox, Safari, or Edge.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="text-sm text-gray-600">Recording in: {language}</div>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`relative w-24 h-24 rounded-full font-bold text-white transition-all transform hover:scale-105 ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50'
            : 'bg-blue-500 hover:bg-blue-600 shadow-lg'
        }`}
      >
        {isRecording ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-pulse text-2xl">⏹️</div>
            <span className="text-xs">Stop</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-2xl">🎤</div>
            <span className="text-xs">Record</span>
          </div>
        )}
      </button>

      {isRecording && (
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 bg-red-500 rounded-full animate-bounce"
                style={{
                  height: `${8 + (i * 4)}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <span className="text-lg font-mono font-bold text-red-600">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </span>
          <span className="text-sm text-gray-600">
            / {maxDuration}s
          </span>
        </div>
      )}

      {duration > 0 && !isRecording && (
        <div className="text-sm text-green-600 font-medium">
          ✓ Recorded {duration}s
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        <p>Your microphone is {isRecording ? 'active' : 'ready'}</p>
        <p className="mt-1">Max {maxDuration} seconds per recording</p>
      </div>
    </div>
  );
};
