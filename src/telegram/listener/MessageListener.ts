import {BotContext} from "../BotContext.interface";

export class MessageListener {

    async listen(context: BotContext): Promise<void> {
        const {id, registrationDate, role, telegramUid} = context.viewer!         
    }
}