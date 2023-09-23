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
exports.CachedUserRepository = void 0;
const UserRole_1 = require("../enum/UserRole");
const JsonSerializer_1 = require("../utils/JsonSerializer");
class CachedUserRepository {
    constructor(redisCache, prisma) {
        this.redisCache = redisCache;
        this.prisma = prisma;
    }
    getFromCache(viewerTelegramId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.redisCache.get(viewerTelegramId);
        });
    }
    setToCache(viewerTelegramId, viewer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisCache.set(viewerTelegramId.toString(), JsonSerializer_1.JsonSerializer.serialize(viewer));
        });
    }
    attachTwitchLinkToViewer(viewerId, twitchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitchLink = yield this.prisma.twitchLink.create({
                data: {
                    twitchId: twitchId,
                    viewerId: viewerId,
                },
            });
            return twitchLink;
        });
    }
    getViewerWithTwitchLink(viewerUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.viewer.findUnique({
                where: {
                    id: viewerUid
                },
                include: {
                    TwitchLink: true
                }
            });
        });
    }
    getOrCreateViewerByTelegramId(viewerTelegramId) {
        return __awaiter(this, void 0, void 0, function* () {
            let viewer = yield this.getFromCache(viewerTelegramId);
            if (!viewer) { // Если юзера нету в кэше
                console.log(`Юзера ${viewerTelegramId} нет в кэше`);
                viewer = yield this.prisma.viewer.findUnique({
                    where: {
                        telegramUid: viewerTelegramId
                    }
                });
                if (!viewer) { // Если юзера нет в БД
                    console.log(`Юзера ${viewerTelegramId} нет в БД`);
                    viewer = yield this.prisma.viewer.create({
                        data: {
                            telegramUid: viewerTelegramId,
                            registrationDate: new Date(),
                            role: UserRole_1.UserRole.DEFAULT
                        }
                    });
                    console.log(`Записал юзера ${viewerTelegramId} в бд`);
                }
                yield this.setToCache(viewerTelegramId, viewer); // Заношу в кэш
                console.log(`Записал юзера ${viewerTelegramId} в кэш`);
            }
            return viewer;
        });
    }
}
exports.CachedUserRepository = CachedUserRepository;
