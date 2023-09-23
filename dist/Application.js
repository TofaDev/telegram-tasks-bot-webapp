"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("./telegram/Bot");
const Config_1 = __importDefault(require("./config/Config"));
const ServiceFactory_1 = require("./factory/ServiceFactory");
const Logger_1 = require("./utils/Logger");
class Application {
    constructor() {
        this.config = new Config_1.default();
        this.logger = new Logger_1.Logger(this.config.get("logger").level);
        this.serviceFactory = new ServiceFactory_1.ServiceFactory(this.config);
    }
    createBot() {
        this.logger.debug(`createBot вызван в Application`);
        this.bot = new Bot_1.Bot(this.config, this.serviceFactory);
        this.logger.debug(`Создан экземпляр бота`);
    }
    startBot() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.bot) {
                this.logger.debug(`Бот ещё не инициализирован, чтобы его запускать`);
                process.exit(0);
            }
            yield this.bot
                .registerMiddlewares()
                .registerCommands()
                .registerListeners()
                .start();
            this.logger.debug(`Выполнена инициализация запуска бота`);
        });
    }
    initializeServiceFactory() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.serviceFactory.createPrismaClient();
            console.log(`Клиент призмы создан`);
            yield this.serviceFactory.createRedisClient();
            console.log(`Клиент редиса создан`);
        });
    }
    getServiceFactory() {
        return this.serviceFactory;
    }
    getLogger() {
        return this.logger;
    }
}
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new Application();
    yield app.initializeServiceFactory();
    app.createBot();
    yield app.startBot();
});
start();
