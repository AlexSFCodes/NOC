import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { LogEntity }    from '../../domain/entities/log.entity.js';
import { LogRepository } from '../../domain/repositories/log.repository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);


export class FileSystemLogRepository extends LogRepository {

  saveLog(log: LogEntity): void {
    const logsPath = path.join(__dirname, '../../../logs');

    if (!fs.existsSync(logsPath)) {
      fs.mkdirSync(logsPath);
    }

    const logFilepath = path.join(logsPath, `${log.severityLevel}.log`);
    const logText     = JSON.stringify({
      date:     log.date,
      message:  log.message,
      severity: log.severityLevel,
    }) + '\n';

    fs.appendFileSync(logFilepath, logText);
  }
}