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
exports.ProfileCommand = void 0;
const UserRole_1 = require("../../../enum/UserRole");
class ProfileCommand {
    constructor() {
        this.name = "profile";
        this.desk = "посмотреть свой профиль в боте";
        this.role = UserRole_1.UserRole.DEFAULT;
    }
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, registrationDate, role, telegramUid } = context.viewer;
            context.reply(`id: ${id}\ntelegram uid:${telegramUid}\nrole:${(0, UserRole_1.translateUserRole)(role)}\ndate:${registrationDate}\nпривязка к твичу: ${context.twitchLink ? "Да" : "Нет"}`);
        });
    }
}
exports.ProfileCommand = ProfileCommand;
