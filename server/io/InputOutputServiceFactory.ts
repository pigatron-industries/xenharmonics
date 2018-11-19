import {config} from '../config';
import {InputOutputServiceInterface} from './InputOutputServiceInterface';

export async function getInputOutputService(): Promise<InputOutputServiceInterface> {
  if (config.platform === 'pi') {
    const io = await import('./pi/PiInputOutputService');
    return new io.PiInputOutputService();
  } else {
    const io = await import('./noop/NoOpInputOutputService');
    return new io.NoOpInputOutputService();
  }
}
