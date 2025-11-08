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
    // Short click sound for typing - mechanical keyboard style with slight randomization
    const baseFrequency = 900;
    const pitchVariation = Math.random() * 100 - 50; // ±50Hz variation
    this.playTone(baseFrequency + pitchVariation, 0.04, 0.03);
  }

  playClick() {
    // Button click sound
    this.playTone(1200, 0.08, 0.06);
  }

  playEnter() {
    // Command execution sound
    this.playTone(600, 0.1, 0.08);
  }

  playError() {
    // Error sound
    this.playTone(200, 0.15, 0.1);
  }

  playBootSound() {
    // Terminal boot sequence sound
    if (!this.enabled || !this.context) return;
    
    // Play a sequence of tones for boot effect
    this.playTone(400, 0.1, 0.08);
    setTimeout(() => this.playTone(600, 0.1, 0.08), 100);
    setTimeout(() => this.playTone(800, 0.15, 0.08), 200);
  }
}

export const terminalSounds = new TerminalSounds();
