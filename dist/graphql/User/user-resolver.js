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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const User_1 = require("~/entity/User");
const typeorm_1 = require("typeorm");
const UserInput_1 = require("./UserInput");
let UserResolver = class UserResolver {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    createUser(createUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepository.create(createUserData);
            return this.userRepository.save(user);
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(returns => User_1.User),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(of => User_1.User),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(User_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user-resolver.js.map