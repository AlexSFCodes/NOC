import cron from 'node-cron';
import { FileSystemLogRepository } from '../infrastructure/repositories/file-system-log.repository.js';
import { CheckServerUseCase }      from '../application/use-cases/check-server.use-case.js';

const GOOGLE_URL       = 'https://www.google.com/?hl=es';
const CRON_EXPRESSION  = '*/5 * * * * *';

const logRepository = new FileSystemLogRepository();


const checkServer   = new CheckServerUseCase(logRepository);

cron.schedule(CRON_EXPRESSION, () => {
  checkServer.execute(GOOGLE_URL);
});
