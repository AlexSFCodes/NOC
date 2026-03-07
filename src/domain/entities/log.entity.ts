

export enum LogSeverityLevel {
  low    = 'low',
  medium = 'medium',
  high   = 'high',
}

export class LogEntity {
  public message: string;
  public date: Date;
  public severityLevel: LogSeverityLevel;

  constructor(message: string, severityLevel: LogSeverityLevel) {
    this.message       = message;
    this.date          = new Date();
    this.severityLevel = severityLevel;
  }

}