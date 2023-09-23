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
exports.MessageContextMiddleware = void 0;
class MessageContextMiddleware {
    constructor(serviceFactory) {
        this.userRepository = serviceFactory.getUserRepository();
    }
    middleware(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            context = yield this.writeViewerData(context);
            return next();
        });
    }
    writeViewerData(context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const senderTelegramId = (_a = context.from) === null || _a === void 0 ? void 0 : _a.id;
            if (senderTelegramId !== undefined) {
                if (!context.viewer) { // При каждом новом вызове срабатывает этот блок:
                    context.viewer = yield this.userRepository.getOrCreateViewerByTelegramId(senderTelegramId);
                    const twitchLink = yield this.userRepository.getViewerWithTwitchLink(context.viewer.id);
                    if (twitchLink) {
                        context.twitchLink = (twitchLink === null || twitchLink === void 0 ? void 0 : twitchLink.TwitchLink) || undefined;
                    }
                }
            }
            return context;
        });
    }
}
exports.MessageContextMiddleware = MessageContextMiddleware;
