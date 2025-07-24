// 音频生成工具
export class AudioGenerator {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  // 生成Nokia经典铃声 (完整版)
  generateNokiaTune(): AudioBuffer {
    const sampleRate = this.audioContext.sampleRate;
    const duration = 6; // 6秒，更长的铃声
    const frameCount = sampleRate * duration;
    const arrayBuffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = arrayBuffer.getChannelData(0);

    // Nokia经典铃声完整音符序列 (Grande Valse)
    const notes = [
      // 第一段主旋律
      { freq: 659.25, duration: 0.15 }, // E5
      { freq: 587.33, duration: 0.15 }, // D5
      { freq: 369.99, duration: 0.3 },  // F#4
      { freq: 415.30, duration: 0.3 },  // G#4
      { freq: 554.37, duration: 0.15 }, // C#5
      { freq: 493.88, duration: 0.15 }, // B4
      { freq: 293.66, duration: 0.3 },  // D4
      { freq: 329.63, duration: 0.3 },  // E4
      { freq: 493.88, duration: 0.15 }, // B4
      { freq: 440.00, duration: 0.15 }, // A4
      { freq: 277.18, duration: 0.3 },  // C#4
      { freq: 329.63, duration: 0.3 },  // E4
      { freq: 440.00, duration: 0.6 },  // A4 (延长)
      
      // 短暂停顿
      { freq: 0, duration: 0.2 },
      
      // 第二段变奏
      { freq: 659.25, duration: 0.1 },  // E5 (更快)
      { freq: 698.46, duration: 0.1 },  // F5
      { freq: 659.25, duration: 0.1 },  // E5
      { freq: 587.33, duration: 0.2 },  // D5
      { freq: 369.99, duration: 0.25 }, // F#4
      { freq: 415.30, duration: 0.25 }, // G#4
      { freq: 554.37, duration: 0.1 },  // C#5
      { freq: 587.33, duration: 0.1 },  // D5
      { freq: 554.37, duration: 0.1 },  // C#5
      { freq: 493.88, duration: 0.2 },  // B4
      { freq: 293.66, duration: 0.25 }, // D4
      { freq: 329.63, duration: 0.25 }, // E4
      { freq: 493.88, duration: 0.1 },  // B4
      { freq: 523.25, duration: 0.1 },  // C5
      { freq: 493.88, duration: 0.1 },  // B4
      { freq: 440.00, duration: 0.2 },  // A4
      { freq: 277.18, duration: 0.25 }, // C#4
      { freq: 329.63, duration: 0.25 }, // E4
      { freq: 440.00, duration: 0.4 },  // A4
      
      // 结尾装饰音
      { freq: 0, duration: 0.1 },
      { freq: 440.00, duration: 0.1 },  // A4
      { freq: 493.88, duration: 0.1 },  // B4
      { freq: 554.37, duration: 0.1 },  // C#5
      { freq: 587.33, duration: 0.1 },  // D5
      { freq: 659.25, duration: 0.3 },  // E5 (结束音)
    ];

    let currentFrame = 0;
    notes.forEach((note, index) => {
      const noteDuration = note.duration;
      const noteFrames = Math.floor(sampleRate * noteDuration);
      
      if (note.freq === 0) {
        // 静音
        for (let i = 0; i < noteFrames && currentFrame < frameCount; i++) {
          channelData[currentFrame] = 0;
          currentFrame++;
        }
      } else {
        for (let i = 0; i < noteFrames && currentFrame < frameCount; i++) {
          const t = i / sampleRate;
          const noteProgress = i / noteFrames;
          
          // 改进的包络：ADSR (Attack, Decay, Sustain, Release)
          let envelope = 1;
          if (noteProgress < 0.1) {
            // Attack: 快速上升
            envelope = noteProgress / 0.1;
          } else if (noteProgress < 0.3) {
            // Decay: 轻微衰减
            envelope = 1 - (noteProgress - 0.1) * 0.2 / 0.2;
          } else if (noteProgress < 0.8) {
            // Sustain: 保持
            envelope = 0.8;
          } else {
            // Release: 衰减
            envelope = 0.8 * (1 - (noteProgress - 0.8) / 0.2);
          }
          
          // 添加轻微的颤音效果
          const vibrato = 1 + 0.02 * Math.sin(2 * Math.PI * 5 * t);
          
          // 主音 + 轻微的泛音
          const fundamental = Math.sin(2 * Math.PI * note.freq * vibrato * t);
          const harmonic2 = 0.3 * Math.sin(2 * Math.PI * note.freq * 2 * vibrato * t);
          const harmonic3 = 0.1 * Math.sin(2 * Math.PI * note.freq * 3 * vibrato * t);
          
          channelData[currentFrame] = (fundamental + harmonic2 + harmonic3) * envelope * 0.25;
          currentFrame++;
        }
      }
      
      // 音符间的短暂间隔（除了静音音符）
      if (note.freq !== 0) {
        const silenceFrames = Math.floor(sampleRate * 0.02);
        for (let i = 0; i < silenceFrames && currentFrame < frameCount; i++) {
          channelData[currentFrame] = 0;
          currentFrame++;
        }
      }
    });

    return arrayBuffer;
  }

  // 生成简单蜂鸣声
  generateBeep(): AudioBuffer {
    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.5; // 0.5秒
    const frameCount = sampleRate * duration;
    const arrayBuffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = arrayBuffer.getChannelData(0);

    const frequency = 800; // 800Hz蜂鸣声
    
    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      const envelope = Math.sin(Math.PI * t / duration); // 正弦包络
      channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
    }

    return arrayBuffer;
  }

  // 播放音频缓冲区
  playAudioBuffer(audioBuffer: AudioBuffer): void {
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    source.start();
  }

  // 恢复音频上下文（用户交互后）
  async resumeContext(): Promise<void> {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

// 单例实例
export const audioGenerator = new AudioGenerator();