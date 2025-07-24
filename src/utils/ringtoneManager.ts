import { audioGenerator } from './audioGenerator';

export interface RingtoneOption {
  id: string;
  name: string;
  audioBuffer?: AudioBuffer;
}

export class RingtoneManager {
  private ringtones: Map<string, AudioBuffer> = new Map();
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // 恢复音频上下文
      await audioGenerator.resumeContext();
      
      // 生成Nokia经典铃声
      const nokiaTune = audioGenerator.generateNokiaTune();
      this.ringtones.set('nokia', nokiaTune);
      
      // 生成蜂鸣声
      const beep = audioGenerator.generateBeep();
      this.ringtones.set('beep', beep);
      
      this.initialized = true;
    } catch (error) {
      console.warn('Failed to initialize ringtones:', error);
    }
  }

  async playRingtone(ringtoneId: string): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    if (ringtoneId === 'silent') {
      return; // 静音模式，不播放任何声音
    }

    const audioBuffer = this.ringtones.get(ringtoneId);
    if (audioBuffer) {
      try {
        audioGenerator.playAudioBuffer(audioBuffer);
      } catch (error) {
        console.warn('Failed to play ringtone:', error);
      }
    }
  }

  getRingtoneOptions(): RingtoneOption[] {
    return [
      { id: 'nokia', name: 'Nokia Tune' },
      { id: 'beep', name: 'Beep' },
      { id: 'silent', name: 'Silent' }
    ];
  }

  // 预览铃声（用于设置界面）
  async previewRingtone(ringtoneId: string): Promise<void> {
    await this.playRingtone(ringtoneId);
  }
}

// 单例实例
export const ringtoneManager = new RingtoneManager();