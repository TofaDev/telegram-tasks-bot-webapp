export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARNING = 2,
    ERROR = 3
}



export class Logger {

    private logLevel: LogLevel

    constructor(logLevel: LogLevel) {
        this.logLevel = logLevel
    }

    private shouldLog(logLevel: LogLevel): boolean {
        return this.logLevel <= logLevel
    }

    debug(text: string): void {
        if(this.shouldLog(LogLevel.DEBUG)) console.log(`[DEBUG]: ${text}`)
    }

    info(text: string): void {
        if(this.shouldLog(LogLevel.INFO)) console.log(`[INFO]: ${text}`)
    }
    error(text: string): void {
        if(this.shouldLog(LogLevel.ERROR)) console.log(`[ERROR]: ${text}`)
    }
    warning(text: string): void {
        if(this.shouldLog(LogLevel.WARNING)) console.log(`[WARNING]: ${text}`)
    }

}