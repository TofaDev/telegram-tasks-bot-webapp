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
exports.ServiceFactory = void 0;
const ioredis_1 = require("ioredis");
const client_1 = require("@prisma/client");
const CachedUserRepository_1 = require("../database/CachedUserRepository");
const RedisCache_1 = require("../database/RedisCache");
class ServiceFactory {
    constructor(config) {
        this.config = config;
    }
    createPrismaClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.prismaClient = new client_1.PrismaClient();
                yield this.prismaClient.$connect();
                console.log(`database connected!`);
                return this;
            }
            catch (e) {
                throw new Error(`Error while connecting to database: ${e}`);
            }
        });
    }
    getPrismaClient() {
        if (!this.prismaClient) {
            throw new Error("PrismaClient has not been initialized yet.");
        }
        return this.prismaClient;
    }
    createRedisClient() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient = new ioredis_1.Redis(this.config.get("redis"));
                this.redisCache = new RedisCache_1.RedisCache(this.redisClient);
                this.redisClient.on("ready", () => {
                    console.log(`redis connected!`);
                    resolve(this);
                });
                this.redisClient.on("error", (e) => {
                    reject(new Error(`Ошибка при подключении к редису: ${e}`));
                });
            });
        });
    }
    getRedisClient() {
        if (!this.redisClient) {
            throw new Error("Redis client has not been initialized yet.");
        }
        return this.redisClient;
    }
    getUserRepository() {
        if (!this.cachedUserRepository) {
            if (!this.redisCache || !this.prismaClient) {
                throw new Error("Dependencies for CachedUserRepository are not initialized.");
            }
            this.cachedUserRepository = new CachedUserRepository_1.CachedUserRepository(this.redisCache, this.prismaClient);
        }
        return this.cachedUserRepository;
    }
    closePrismaClient() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.prismaClient) === null || _a === void 0 ? void 0 : _a.$disconnect());
        });
    }
    closeRedisClient() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.redisClient) === null || _a === void 0 ? void 0 : _a.disconnect());
        });
    }
}
exports.ServiceFactory = ServiceFactory;
