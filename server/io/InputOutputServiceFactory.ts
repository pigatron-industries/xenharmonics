import {config} from '../config';
import {InputOutputServiceInterface} from './InputOutputServiceInterface';

export async function getInputOutputService(): Promise<InputOutputServiceInterface> {
  if (config.platform === 'pi') {
    const io = await import('./PiInputOutputService');
    return new io.PiInputOutputService();
  } else {
    const io = await import('./NoOpInputOutputService');
    return new io.NoOpInputOutputService();
  }
}
