import {Telegram} from "puregram";
import Config from "../config/Config";
import {MessageListener} from "./listener/MessageListener";
import {BotContext} from "./BotContext.interface";
import { MessageContextMiddleware } from "./middleware/MessageContextMiddleware";
import { ServiceFactory } from "../factory/ServiceFactory";
import { CommandRoleMiddleware } from "./middleware/CommandRoleMiddleware";
import { ProfileCommand } from "./command/commands/ProfileCommand";
import { TestAdminCommand } from "./command/commands/TestAdminCommand";
import { LinkTwitchAccountCommand } from "./command/commands/twitch/LinkTwitchAccountCommand";

export class Bot {
    private messageContextMiddleware: MessageContextMiddleware
    private telegramBot: Telegram;
    private config: Config;
    private messageListener: MessageListener;
    private commandRoleMiddleware: CommandRoleMiddleware;

    constructor(config: Config, serviceFactory: ServiceFactory) {
        // Logger.debug("Конструктор Bot вызван");
        this.config = config
        this.messageContextMiddleware = new MessageContextMiddleware(serviceFactory)
        this.messageListener = new MessageListener()
        this.telegramBot = Telegram.fromToken(config.get('telegram').token)

        this.commandRoleMiddleware = new CommandRoleMiddleware([new ProfileCommand()])
    }

    registerMiddlewares(): this {
        // Logger.debug(`Миддлвари зареганы`)
        this.telegramBot.updates.use(this.messageContextMiddleware.middleware.bind(this.messageContextMiddleware))
        this.telegramBot.updates.use(this.commandRoleMiddleware.middleware.bind(this.commandRoleMiddleware))

        return this
    }

    registerCommands(): this {

        this.commandRoleMiddleware.addCommands([new TestAdminCommand(), new LinkTwitchAccountCommand()])

        return this
    }

    registerListeners(): this {
        // Logger.debug(`Листенеры зареганы`)
    this.telegramBot.updates.on('message', (context: BotContext) => {
        this.messageListener.listen(context)
    })

        return this
    }
    async start(): Promise<void> {
        this.telegramBot.updates.startPolling()
            .then(() => {
                // Logger.debug(`Телеграм бот запущен`)
            })
            .catch((e) => {
                // Logger.debug(`Телеграм бот не смог запуститься! ${e}`)
                process.exit(0)
            })
    }
}