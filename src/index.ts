import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { createPost } from './service/postService/createPost';
import { createUser } from './service/userService/createUser';

const app = express();
app.use(express.json());

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User,Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', async (req, res) => {
  //Solicita os dados de requisição de criação de usuário
  const { firstName, lastName, email} = req.body;

  //Tenta criar usuário
  try{
    const newUser = await createUser(firstName, lastName, email);
    res.status(201).json(newUser); //Reorna o usuário criado 
  }catch(error){
    //Retorna código 400 com mensagem de erro
    console.error(error);
    res.status(400).json({ error: 'The user was not created due to unfilled fields'});
  }

});


//Endpoint para criar uma postagem
app.post('/posts', async (req, res) => {
  //Solicita os dados de requisição de criação de postagem
  const { title, description, userId } = req.body;

  try {
    //Chama a função de serviço para criar o post
    const newPost = await createPost(title, description, userId);
    res.status(201).json(newPost); // Retorna o post criado
  } catch (error) {
    //Retorna código 400 com mensagem de erro
    console.error(error);
    res.status(400).json({ error: 'Post was not created due to unfilled fields or unknown user' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
