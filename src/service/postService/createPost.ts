import { AppDataSource } from '../../index';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

export const createPost = async (title: string, description: string, userId: number) => {
  const postRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  //Verifica se o usuário existe
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  //Cria o novo post
  const newPost = postRepository.create({ title, description, userId });
  return await postRepository.save(newPost);
};