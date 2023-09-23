import { UserRole } from "../../../enum/UserRole";
import { BotContext } from "../../BotContext.interface";
import { ICommand } from "../command.interface";

export class TestAdminCommand implements ICommand {
    name = "пенис"
    desk = "тестовая команда"
    role = UserRole.DEFAULT

    async execute(context: BotContext): Promise<void> {

        context.reply(`Чел, да ты админ!`)
        console.log(context.command)
    }
}