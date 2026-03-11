import cron from 'node-cron';
import { FileSystemLogRepository } from '../infrastructure/repositories/file-system-log.repository.js';
import { CheckServerUseCase }      from '../application/use-cases/check-server.use-case.js';
import console from 'node:console';
import { NodemailerEmailRepository } from '../infrastructure/repositories/nodemailer-email.repository.js';
import { SendEmailUseCase } from '../application/use-cases/send-email.use-case.js';

const GOOGLE_URL       = 'https://www.google.com/?hl=es';
const CRON_EXPRESSION  = '*/5 * * * * *';

const logRepository = new FileSystemLogRepository();
const emailRepository = new NodemailerEmailRepository();
const sendEmail = new SendEmailUseCase(emailRepository);

const checkServer   = new CheckServerUseCase(logRepository);


let lastStatus: boolean | null = null;

cron.schedule(CRON_EXPRESSION, async () => {

    const status = await checkServer.execute(GOOGLE_URL);

    if (lastStatus !== null && status !== lastStatus) {

        if (status) {
            console.log("Server prendido");
            await sendEmail.execute("Servidor volvió a funcionar");
        } else {
            console.log("Server apagado");
            await sendEmail.execute("Servidor se cayó");
        }

    }

    lastStatus = status;

});