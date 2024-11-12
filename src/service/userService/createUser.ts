import { AppDataSource } from '../../index';
import { User } from '../../entity/User';

export const createUser = async (firstName: string, lastName: string, email: string) => {
    const userRepository = AppDataSource.getRepository(User);

    //Cria um novo usuário e retorna os dados dele
    const newUser = userRepository.create({ firstName, lastName, email });
    return await userRepository.save(newUser);
};