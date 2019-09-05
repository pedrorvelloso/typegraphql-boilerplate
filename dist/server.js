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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const Env_1 = __importDefault(require("./config/Env"));
let App = class App {
    constructor() {
        this.app = express_1.default();
        this.apolloServer();
        this.configService = typedi_1.Container.get(Env_1.default);
        this.server = new http_1.default.Server(this.app);
    }
    apolloServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = yield type_graphql_1.buildSchema({
                resolvers: [path_1.default.resolve(__dirname, 'graphql', '**', '*-resolver.{js,ts}')],
                container: typedi_1.Container,
            });
            const apollo = new apollo_server_express_1.ApolloServer({
                schema,
                playground: true,
            });
            apollo.applyMiddleware({ app: this.app });
            return apollo;
        });
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.createConnection({
                type: 'postgres',
                host: this.configService.get('DB_HOST'),
                port: this.configService.get('DB_PORT'),
                username: this.configService.get('DB_USERNAME'),
                password: this.configService.get('DB_PASSWORD'),
                database: this.configService.get('DB_DATABASE'),
                synchronize: true,
                entities: [path_1.default.resolve(__dirname, 'entity', '**', '*.*')],
                migrations: [path_1.default.resolve(__dirname, 'migration', '**', '*.*')],
                cli: {
                    entitiesDir: path_1.default.resolve(__dirname, 'entity'),
                    migrationsDir: path_1.default.resolve(__dirname, 'migration'),
                },
            });
        });
    }
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dbConnection();
                this.server.listen(this.configService.get('PORT'), () => {
                    console.log(`Server running on port ${this.configService.get('PORT')}`);
                });
            }
            catch (error) {
                console.log('Failed to start server');
                console.error(error);
            }
        });
    }
};
App = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], App);
exports.default = new App();
//# sourceMappingURL=server.js.map