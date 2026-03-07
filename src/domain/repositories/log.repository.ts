import { LogEntity } from '../entities/log.entity.js';

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): void;
}
