"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSerializer = void 0;
class JsonSerializer {
    static serialize(data) {
        const replacer = (key, value) => {
            if (typeof value === 'bigint') {
                return value.toString();
            }
            return value;
        };
        return JSON.stringify(data, replacer);
    }
}
exports.JsonSerializer = JsonSerializer;
