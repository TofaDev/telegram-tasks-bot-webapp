import { CachedUserRepository } from "../../database/CachedUserRepository";
import { ServiceFactory } from "../../factory/ServiceFactory";
import { BotContext } from "../BotContext.interface";
import { NextMiddleware } from 'middleware-io';

export class MessageContextMiddleware {

    private userRepository: CachedUserRepository

    constructor(serviceFactory: ServiceFactory) {
        this.userRepository = serviceFactory.getUserRepository()
    }

    async middleware(context: BotContext, next: NextMiddleware) {
        context = await this.writeViewerData(context)

        return next()
    }

    private async writeViewerData(context: BotContext): Promise<BotContext> {
        const senderTelegramId: number | undefined = context.from?.id

        if(senderTelegramId !== undefined) {
            if(!context.viewer) { // При каждом новом вызове срабатывает этот блок:
                context.viewer = await this.userRepository.getOrCreateViewerByTelegramId(senderTelegramId)

                const twitchLink = await this.userRepository.getViewerWithTwitchLink(context.viewer.id)
                if (twitchLink) {
                    context.twitchLink = twitchLink?.TwitchLink || undefined;
                }
            }
        }

        return context
    }
}