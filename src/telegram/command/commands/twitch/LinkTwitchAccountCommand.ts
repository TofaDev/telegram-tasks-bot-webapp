import { UserRole } from "../../../../enum/UserRole";
import { BotContext } from "../../../BotContext.interface";
import { ICommand } from "../../command.interface";

export class LinkTwitchAccountCommand implements ICommand {

    name = "link";
    desk = "привязывает ваш аккаунт твича к боту"
    role = UserRole.DEFAULT;

    async execute(context: BotContext): Promise<void> {
        await context.reply(`Не реализовано`)
    }
    
}