"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const Logger_1 = require("../utils/Logger");
class Config {
    constructor() {
        this.configPath = path_1.default.join(__dirname, '..', '..', 'resources', 'config.json');
        if (!fs.existsSync(this.configPath)) {
            this.createDefaultConfig(); // Создаю стандартный конфиг, если он не существует
            // Logger.debug(`Конфиг не существует, создаём чистый. Настрой, потом запусти снова`)
            process.exit(0);
        }
        const rawData = fs.readFileSync(this.configPath, 'utf-8');
        this.config = JSON.parse(rawData);
    }
    createDefaultConfig() {
        const defaultConfig = {
            telegram: {
                token: "123"
            },
            twitch: {
                token: "123"
            },
            redis: {
                port: 6379,
                host: "127.0.0.1",
                username: "default",
                password: "my-top-secret",
                db: 0,
            },
            logger: {
                level: Logger_1.LogLevel.DEBUG
            }
        };
        fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig, null, 2));
    }
    get(key) {
        return this.config[key];
    }
}
exports.default = Config;
