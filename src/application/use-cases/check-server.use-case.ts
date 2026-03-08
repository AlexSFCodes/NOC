import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity.js';
import { LogRepository }               from '../../domain/repositories/log.repository.js';

export class CheckServerUseCase {

  constructor(private readonly logRepository: LogRepository) {}

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);

      const log = response.ok
        ? new LogEntity('Server vivo',     LogSeverityLevel.low)
        : new LogEntity('Server no respondió', LogSeverityLevel.medium);

      this.logRepository.saveLog(log);

      console.log(response.ok
        ? 'Server responde correctamente'
        : 'No hay conexión con el servidor'
      );

      return response.ok;

    } catch (error) {
      const log = new LogEntity(`Server muriendo: ${error}`, LogSeverityLevel.high);
      this.logRepository.saveLog(log);
      console.error('Hubo un error: ' + error);
      return false;
    }
  }
}