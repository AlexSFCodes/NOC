import { LogEntity }    from '../../domain/entities/log.entity.js';
import { LogRepository } from '../../domain/repositories/log.repository.js';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import fs  from 'fs';

dotenv.config(); 
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export class NodemailerEmailRepository extends LogRepository {

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.MAILER_SECRET_KEY
    }
  });

  async saveLog(log: LogEntity): Promise<void> {

    try {
        const logsPath = path.join(__dirname, '../../../logs');
        const logFilepath = path.join(logsPath, `${log.severityLevel}.log`);
        if (!fs.existsSync(logFilepath)) {
            console.log("No hay logs a enviar");
            return;
        }
      const html = `
      <div style="font-family: Arial; background:#f4f6f8; padding:20px;">
        <div style="max-width:500px;margin:auto;background:white;padding:20px;border-radius:8px;">
          <h1 style="text-align:center;">Server Alert</h1>
          <p>Se detectó un evento en el servidor</p>

          <ul>
            <li><strong>Mensaje:</strong> ${log.message}</li>
            <li><strong>Severidad:</strong> ${log.severityLevel}</li>
            <li><strong>Fecha:</strong> ${log.date}</li>
          </ul>
        </div>
      </div>
      `;

      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
        subject: `[NOC ALERT] ${log.severityLevel}`,
        html:html,
        attachments: [
            {
            filename: `${log.severityLevel}.log`,
            path: logFilepath
            }]
            });
      console.log("Email enviado");

    } catch (error) {
      console.error("Error enviando email", error);
    }

  }
}