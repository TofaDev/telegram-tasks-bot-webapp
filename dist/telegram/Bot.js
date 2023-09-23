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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const puregram_1 = require("puregram");
const MessageListener_1 = require("./listener/MessageListener");
const MessageContextMiddleware_1 = require("./middleware/MessageContextMiddleware");
const CommandRoleMiddleware_1 = require("./middleware/CommandRoleMiddleware");
const ProfileCommand_1 = require("./command/commands/ProfileCommand");
const TestAdminCommand_1 = require("./command/commands/TestAdminCommand");
const LinkTwitchAccountCommand_1 = require("./command/commands/twitch/LinkTwitchAccountCommand");
class Bot {
    constructor(config, serviceFactory) {
        // Logger.debug("Конструктор Bot вызван");
        this.config = config;
        this.messageContextMiddleware = new MessageContextMiddleware_1.MessageContextMiddleware(serviceFactory);
        this.messageListener = new MessageListener_1.MessageListener();
        this.telegramBot = puregram_1.Telegram.fromToken(config.get('telegram').token);
        this.commandRoleMiddleware = new CommandRoleMiddleware_1.CommandRoleMiddleware([new ProfileCommand_1.ProfileCommand()]);
    }
    registerMiddlewares() {
        // Logger.debug(`Миддлвари зареганы`)
        this.telegramBot.updates.use(this.messageContextMiddleware.middleware.bind(this.messageContextMiddleware));
        this.telegramBot.updates.use(this.commandRoleMiddleware.middleware.bind(this.commandRoleMiddleware));
        return this;
    }
    registerCommands() {
        this.commandRoleMiddleware.addCommands([new TestAdminCommand_1.TestAdminCommand(), new LinkTwitchAccountCommand_1.LinkTwitchAccountCommand()]);
        return this;
    }
    registerListeners() {
        // Logger.debug(`Листенеры зареганы`)
        this.telegramBot.updates.on('message', (context) => {
            this.messageListener.listen(context);
        });
        return this;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.telegramBot.updates.startPolling()
                .then(() => {
                // Logger.debug(`Телеграм бот запущен`)
            })
                .catch((e) => {
                // Logger.debug(`Телеграм бот не смог запуститься! ${e}`)
                process.exit(0);
            });
        });
    }
}
exports.Bot = Bot;
