import { useCallback, useRef } from 'react';

// Lazily initialize audio context to comply with browser autoplay policies
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  // @ts-expect-error -- webkitAudioContext is vendor-prefixed and not in standard TypeScript DOM types
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  return new AudioContextClass();
};

export function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientNodesRef = useRef<{ osc1: OscillatorNode, osc2: OscillatorNode, gain: GainNode } | null>(null);

  const initContext = () => {
    if (!ctxRef.current) {
      ctxRef.current = getAudioContext();
    }
    if (ctxRef.current?.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  };

  const playSynth = useCallback((type: OscillatorType, freq: number, duration: number, vol = 0.1) => {
    const ctx = initContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }, []);

  const playBloop = useCallback(() => {
    playSynth('sine', 800, 0.1, 0.1);
  }, [playSynth]);

  const playTypewriter = useCallback(() => {
    // Very short, snappy tech click
    playSynth('square', 1200, 0.05, 0.02);
  }, [playSynth]);

  const playSuccess = useCallback(() => {
    const ctx = initContext();
    if (!ctx) return;
    // Ascending major chord
    playSynth('sine', 440, 0.5, 0.1); // A4
    setTimeout(() => playSynth('sine', 554.37, 0.5, 0.1), 100); // C#5
    setTimeout(() => playSynth('sine', 659.25, 0.5, 0.1), 200); // E5
  }, [playSynth]);

  const playError = useCallback(() => {
    const ctx = initContext();
    if (!ctx) return;
    // Descending discordant tone
    playSynth('sawtooth', 300, 0.3, 0.05);
    setTimeout(() => playSynth('sawtooth', 250, 0.4, 0.05), 150);
  }, [playSynth]);

  const playHover = useCallback(() => {
    // Subtle low-pitched sweep
    playSynth('sine', 150, 0.1, 0.02);
  }, [playSynth]);

  const toggleAmbient = useCallback((play: boolean) => {
    const ctx = initContext();
    if (!ctx) return;
    
    if (play && !ambientNodesRef.current) {
        // Create an eerie, low-frequency pulsing drone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.value = 55; // Low A
        
        osc2.type = 'triangle';
        osc2.frequency.value = 55.5; // Slight detune for beating effect

        filter.type = 'lowpass';
        filter.frequency.value = 200;

        gain.gain.value = 0;
        
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.start();
        osc2.start();
        
        // Fade in
        gain.gain.setTargetAtTime(0.015, ctx.currentTime, 2);

        ambientNodesRef.current = { osc1, osc2, gain };
    } else if (!play && ambientNodesRef.current) {
        // Fade out and cleanup
        const { osc1, osc2, gain } = ambientNodesRef.current;
        gain.gain.setTargetAtTime(0, ctx.currentTime, 1);
        
        setTimeout(() => {
            try {
                osc1.stop();
                osc2.stop();
                osc1.disconnect();
                osc2.disconnect();
                gain.disconnect();
            } catch {
                // Ignore if already stopped
            }
        }, 2000);
        ambientNodesRef.current = null;
    }
  }, []);

  return {
    playBloop,
    playTypewriter,
    playSuccess,
    playError,
    playHover,
    toggleAmbient
  };
}
