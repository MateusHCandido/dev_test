"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const index_1 = require("../../index");
const Post_1 = require("../../entity/Post");
const User_1 = require("../../entity/User");
const createPost = async (title, description, userId) => {
    const postRepository = index_1.AppDataSource.getRepository(Post_1.Post);
    const userRepository = index_1.AppDataSource.getRepository(User_1.User);
    //Verifica se o usuário existe
    const user = await userRepository.findOneBy({ id: userId });
    if (!user)
        throw new Error('User not found');
    //Cria o novo post
    const newPost = postRepository.create({ title, description, userId });
    return await postRepository.save(newPost);
};
exports.createPost = createPost;
