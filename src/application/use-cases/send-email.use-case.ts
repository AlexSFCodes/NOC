import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity.js';
import { LogRepository } from '../../domain/repositories/log.repository.js';

export class SendEmailUseCase {

  constructor(
    private readonly logRepository: LogRepository
  ) {}

  async execute(message: string) {

    const log = new LogEntity(message, LogSeverityLevel.low);

    await this.logRepository.saveLog(log);

  }

}