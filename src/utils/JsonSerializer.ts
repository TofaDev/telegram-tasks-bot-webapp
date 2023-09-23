export class JsonSerializer {

    static serialize<T>(data: T): string {
        const replacer = (key: string, value: unknown): unknown | string => {
        if (typeof value === 'bigint') {
        return value.toString();
        }
        return value;
    };
    return JSON.stringify(data, replacer);
    }
}