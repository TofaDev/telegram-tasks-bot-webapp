import {IConfig} from "./config.interface";
import path from "path";
import * as fs from "fs";
import { LogLevel } from "../utils/Logger";

class Config {
    private readonly config: IConfig
    private readonly configPath = path.join(__dirname, '..','..','resources','config.json')

    constructor() {
        if (!fs.existsSync(this.configPath)) {
            this.createDefaultConfig() // Создаю стандартный конфиг, если он не существует
            // Logger.debug(`Конфиг не существует, создаём чистый. Настрой, потом запусти снова`)
            process.exit(0)
        }

        const rawData = fs.readFileSync(this.configPath, 'utf-8')
        this.config = JSON.parse(rawData) as IConfig
    }

    private createDefaultConfig(): void {
        const defaultConfig: IConfig = {
            telegram: {
                token: "123"
            },
            twitch: {
                token: "123"
            },
            redis: {
                port: 6379,
                host: "127.0.0.1",
                username: "default", 
                password: "my-top-secret",
                db: 0, 
            },
            logger: {
                level: LogLevel.DEBUG
            }
        }

        fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig, null, 2))
    }

    get<T extends keyof IConfig>(key: T): IConfig[T] {
        return this.config[key]
    }
}

export default Config;