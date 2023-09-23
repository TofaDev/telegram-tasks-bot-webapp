import { PrismaClient, TwitchLink, Viewer } from "@prisma/client";
import { RedisCache } from "./RedisCache";
import { UserRole } from "../enum/UserRole";
import { JsonSerializer } from "../utils/JsonSerializer";

export class CachedUserRepository {

    private redisCache: RedisCache
    private prisma: PrismaClient

    constructor(redisCache: RedisCache, prisma: PrismaClient) {
        this.redisCache = redisCache
        this.prisma = prisma
    }

    private async getFromCache(viewerTelegramId: number): Promise<Viewer | null> {
        return this.redisCache.get(viewerTelegramId);
    }

    private async setToCache(viewerTelegramId: number, viewer: Viewer) {
    
        await this.redisCache.set(viewerTelegramId.toString(), JsonSerializer.serialize<Viewer>(viewer));
    }

    async attachTwitchLinkToViewer(viewerId: number, twitchId: string): Promise<TwitchLink> {
        
        const twitchLink = await this.prisma.twitchLink.create({
            data: {
            twitchId: twitchId,
            viewerId: viewerId,
            },
        });
    
        return twitchLink;
    }

    async getViewerWithTwitchLink(viewerUid: number) {
        return await this.prisma.viewer.findUnique({
            where: {
                id: viewerUid
            },
            include: {
                TwitchLink: true
            }
        });
    }

    async getOrCreateViewerByTelegramId(viewerTelegramId: number): Promise<Viewer> {

        let viewer = await this.getFromCache(viewerTelegramId)
        

        if(!viewer) { // Если юзера нету в кэше
            console.log(`Юзера ${viewerTelegramId} нет в кэше`)
            viewer = await this.prisma.viewer.findUnique({ // Ищу в БД
                where: {
                    telegramUid: viewerTelegramId
                }
            })

            if(!viewer) { // Если юзера нет в БД
                console.log(`Юзера ${viewerTelegramId} нет в БД`)
                viewer = await this.prisma.viewer.create({ // Регаю в бд
                    data: {
                        telegramUid: viewerTelegramId,
                        registrationDate: new Date(),
                        role: UserRole.DEFAULT
                    }
                })
                console.log(`Записал юзера ${viewerTelegramId} в бд`)
            }
            await this.setToCache(viewerTelegramId, viewer) // Заношу в кэш
            console.log(`Записал юзера ${viewerTelegramId} в кэш`)
        }
        return viewer
    }
}