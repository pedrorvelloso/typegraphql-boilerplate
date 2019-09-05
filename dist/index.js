"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const server_1 = __importDefault(require("./server"));
const typedi_1 = __importDefault(require("typedi"));
typeorm_1.useContainer(typedi_1.default);
server_1.default.bootstrap();
//# sourceMappingURL=index.js.map