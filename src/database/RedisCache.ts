import { Viewer } from '@prisma/client';
import {Redis} from 'ioredis';


export class RedisCache {

    private client: Redis

    constructor(client: Redis) {
        this.client = client
    }

    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value)
    }

    async get(key: string | number): Promise<Viewer | null> {

        if (typeof key === "number") {
            key = key.toString();
        }

        const data = await this.client.get(key)
        if (data) {
            return JSON.parse(data) as Viewer
        } else {
            return null
        }
    }
}