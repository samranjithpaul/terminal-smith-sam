// Terminal sound effects utility
class TerminalSounds {
  private context: AudioContext | null = null;
  private enabled = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(frequency: number, duration: number, volume: number = 0.1) {
    if (!this.enabled || !this.context) return;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + duration);
  }

  playKeypress() {
    // Short click sound for typing
    this.playTone(800, 0.05, 0.05);
  }

  playClick() {
    // Button click sound
    this.playTone(1200, 0.08, 0.08);
  }

  playEnter() {
    // Command execution sound
    this.playTone(600, 0.1, 0.1);
  }

  playError() {
    // Error sound
    this.playTone(200, 0.15, 0.12);
  }
}

export const terminalSounds = new TerminalSounds();
