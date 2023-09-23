import { NextMiddleware } from "middleware-io";
import { BotContext } from "../BotContext.interface";
import { ICommand } from "../command/command.interface";
import { translateUserRole } from "../../enum/UserRole";
import { TelegramBotCommand } from "puregram/generated";

export class CommandRoleMiddleware {

    private commands: ICommand[]
    
    constructor(commands: ICommand[]) {
    this.commands = commands;
    }

    public addCommands(commands: ICommand[]): void {
        this.commands.push(...commands)
    }

    async middleware(context: BotContext, next: NextMiddleware) {

        if (!context.text) {
            return next(); 
        }

    const commandName = context.text.split(' ')[0].substring(1)
    const command = this.commands.find(cmd => commandName.startsWith(cmd.name));

    if (!command) {
        return next(); // Неизвестная команда, пропустим дальше
        }
        if (context.viewer && context.viewer.role !== command.role) {
        await context.reply(`У вас нет прав для выполнения этой команды. требуется: ${translateUserRole(command.role)} , у вас: ${translateUserRole(context.viewer.role)}`);
        return;
    }

    const args = context.text.split(" ")
    args.shift()

    context.command = {
        commandName,
        args
    }

    await command.execute(context);
    }
}