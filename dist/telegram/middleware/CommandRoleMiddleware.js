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
exports.CommandRoleMiddleware = void 0;
const UserRole_1 = require("../../enum/UserRole");
class CommandRoleMiddleware {
    constructor(commands) {
        this.commands = commands;
    }
    addCommands(commands) {
        this.commands.push(...commands);
    }
    middleware(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.text) {
                return next();
            }
            const commandName = context.text.split(' ')[0].substring(1);
            const command = this.commands.find(cmd => commandName.startsWith(cmd.name));
            if (!command) {
                return next(); // Неизвестная команда, пропустим дальше
            }
            if (context.viewer && context.viewer.role !== command.role) {
                yield context.reply(`У вас нет прав для выполнения этой команды. требуется: ${(0, UserRole_1.translateUserRole)(command.role)} , у вас: ${(0, UserRole_1.translateUserRole)(context.viewer.role)}`);
                return;
            }
            const args = context.text.split(" ");
            args.shift();
            context.command = {
                commandName,
                args
            };
            yield command.execute(context);
        });
    }
}
exports.CommandRoleMiddleware = CommandRoleMiddleware;
