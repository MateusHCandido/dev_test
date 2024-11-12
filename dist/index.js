"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Post_1 = require("./entity/Post");
const createPost_1 = require("./service/postService/createPost");
const createUser_1 = require("./service/userService/createUser");
const app = (0, express_1.default)();
app.use(express_1.default.json());
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "test_db",
    entities: [User_1.User, Post_1.Post],
    synchronize: true,
});
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const initializeDatabase = async () => {
    await wait(20000);
    try {
        await exports.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    }
    catch (err) {
        console.error("Error during Data Source initialization:", err);
        process.exit(1);
    }
};
initializeDatabase();
app.post('/users', async (req, res) => {
    //Solicita os dados de requisição de criação de usuário
    const { firstName, lastName, email } = req.body;
    //Tenta criar usuário
    try {
        const newUser = await (0, createUser_1.createUser)(firstName, lastName, email);
        res.status(201).json(newUser); //Reorna o usuário criado 
    }
    catch (error) {
        //Retorna código 400 com mensagem de erro
        console.error(error);
        res.status(400).json({ error: 'The user was not created due to unfilled fields' });
    }
});
//Endpoint para criar uma postagem
app.post('/posts', async (req, res) => {
    //Solicita os dados de requisição de criação de postagem
    const { title, description, userId } = req.body;
    try {
        //Chama a função de serviço para criar o post
        const newPost = await (0, createPost_1.createPost)(title, description, userId);
        res.status(201).json(newPost); // Retorna o post criado
    }
    catch (error) {
        //Retorna código 400 com mensagem de erro
        console.error(error);
        res.status(400).json({ error: 'Post was not created due to unfilled fields or unknown user' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
