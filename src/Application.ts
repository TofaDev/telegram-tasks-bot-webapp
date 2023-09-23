import {Bot} from "./telegram/Bot";
import Config from "./config/Config";
import { ServiceFactory } from "./factory/ServiceFactory";
import { Logger } from "./utils/Logger";

class Application {
    private serviceFactory: ServiceFactory
    private readonly config: Config;
    private readonly logger: Logger
    private bot?: Bot;

    constructor() {
        this.config = new Config()
        this.logger = new  Logger(this.config.get("logger").level)
        this.serviceFactory = new ServiceFactory(this.config)
    }

    createBot(): void {
        this.logger.debug(`createBot вызван в Application`)
        this.bot = new Bot(this.config, this.serviceFactory)
        this.logger.debug(`Создан экземпляр бота`)
    }

    async startBot(): Promise<void> {
        if(!this.bot) {
            this.logger.debug(`Бот ещё не инициализирован, чтобы его запускать`)
            process.exit(0)
        }

        await this.bot
        .registerMiddlewares()
        .registerCommands()
        .registerListeners()
            .start();

            this.logger.debug(`Выполнена инициализация запуска бота`)
    }

    async initializeServiceFactory() {
        await this.serviceFactory.createPrismaClient()
        console.log(`Клиент призмы создан`)
        await this.serviceFactory.createRedisClient()
        console.log(`Клиент редиса создан`)
    }

    getServiceFactory() {
        return this.serviceFactory
    }

    getLogger(): Logger {
        return this.logger
    }

}



const start = async () => {
    const app = new Application()

    await app.initializeServiceFactory()
    app.createBot()
    await app.startBot();
}

start()
