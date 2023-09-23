import { Redis } from "ioredis";
import Config from "../config/Config";
import {PrismaClient } from "@prisma/client";
import { CachedUserRepository } from "../database/CachedUserRepository";
import { RedisCache } from "../database/RedisCache";

export class ServiceFactory {

    private config: Config;
    private redisClient?: Redis
    private prismaClient?: PrismaClient
    private cachedUserRepository?: CachedUserRepository
    private redisCache?: RedisCache

    constructor(config: Config) {
        this.config = config;
    }

    async createPrismaClient(): Promise<this> {
        try {
            this.prismaClient = new PrismaClient();
            await this.prismaClient.$connect();
            console.log(`database connected!`)
            return this;
        } catch (e) {
            throw new Error(`Error while connecting to database: ${e}`);
        }
    }
    getPrismaClient(): PrismaClient {
        if (!this.prismaClient) {
            throw new Error("PrismaClient has not been initialized yet.");
        }
        return this.prismaClient;
    }
    
    async createRedisClient(): Promise<this> {
        return new Promise((resolve, reject) => {
            this.redisClient = new Redis(this.config.get("redis"));
            this.redisCache = new RedisCache(this.redisClient);
    
            this.redisClient.on("ready", () => {
                console.log(`redis connected!`)
                resolve(this);
            });
    
            this.redisClient.on("error", (e) => {
                reject(new Error(`Ошибка при подключении к редису: ${e}`));
            });
        });
    }

    getRedisClient(): Redis {
        if (!this.redisClient) {
            throw new Error("Redis client has not been initialized yet.");
        }
        return this.redisClient;
    }

    getUserRepository(): CachedUserRepository {
        if (!this.cachedUserRepository) {
            if (!this.redisCache || !this.prismaClient) {
                throw new Error("Dependencies for CachedUserRepository are not initialized.");
            }
            this.cachedUserRepository = new CachedUserRepository(this.redisCache, this.prismaClient);
        }
        return this.cachedUserRepository;
    }

    async closePrismaClient() {
        await this.prismaClient?.$disconnect();
    }

    async closeRedisClient() {
        await this.redisClient?.disconnect();
    }
    
}