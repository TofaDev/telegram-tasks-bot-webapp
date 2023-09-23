import { LogLevel } from "../utils/Logger"

export interface IConfig {
    telegram: {
        token: string
    }
    twitch: {
        token: string
    }
    redis: {
        port: number,
        host: string
        username?: string
        password?: string
        db?: number
    },
    logger: {
        level: LogLevel
    }
}