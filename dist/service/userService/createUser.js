"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const index_1 = require("../../index");
const User_1 = require("../../entity/User");
const createUser = async (firstName, lastName, email) => {
    const userRepository = index_1.AppDataSource.getRepository(User_1.User);
    //Cria um novo usuário e retorna os dados dele
    const newUser = userRepository.create({ firstName, lastName, email });
    return await userRepository.save(newUser);
};
exports.createUser = createUser;
