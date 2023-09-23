import { UserRole, translateUserRole } from "../../../enum/UserRole";
import { DateFormatter } from "../../../utils/DateFormatter";
import { BotContext } from "../../BotContext.interface";
import { ICommand } from "../command.interface";

export class ProfileCommand implements ICommand {
    
    name = "profile"
    desk = "посмотреть свой профиль в боте"
    role = UserRole.DEFAULT

    async execute(context: BotContext): Promise<void> {

        const {id, registrationDate, role, telegramUid} = context.viewer!     

        context.reply(`id: ${id}\ntelegram uid:${telegramUid}\nrole:${translateUserRole(role)}\ndate:${registrationDate}\nпривязка к твичу: ${context.twitchLink ? "Да" : "Нет"}`)
    }
}