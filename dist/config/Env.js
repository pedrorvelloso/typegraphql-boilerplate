"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const typedi_1 = require("typedi");
let EnvService = class EnvService {
    constructor() {
        const config = dotenv_1.default.parse(fs_1.default.readFileSync(`.env`));
        this.envConfig = this.validateInput(config);
    }
    get(key) {
        return this.envConfig[key];
    }
    validateInput(envConfig) {
        const envVarsSchema = joi_1.default.object({
            NODE_ENV: joi_1.default.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: joi_1.default.number().default(3000),
            DB_HOST: joi_1.default.string().default('localhost'),
            DB_PORT: joi_1.default.number().default(5432),
            DB_USERNAME: joi_1.default.string().required(),
            DB_PASSWORD: joi_1.default.string().required(),
            DB_DATABASE: joi_1.default.string().required(),
        });
        const { error, value: validatedEnvConfig } = joi_1.default.validate(envConfig, envVarsSchema);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
};
EnvService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], EnvService);
exports.default = EnvService;
//# sourceMappingURL=Env.js.map