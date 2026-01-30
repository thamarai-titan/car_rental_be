import bcrypt from 'bcrypt'
import {prisma} from '../prisma/prisma.ts'
import type { UsertInputType } from '../modules/types/auth.types.ts'


export const createUser = async ({username,password}:UsertInputType) => {
    if(!username || !password) {
        throw new Error("Missing Fields")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    return prisma.user.create({
        data:{
            username,
            password:hashedPassword
        }
    })
}


export const signInUser = async ({ username }: { username: string }) => {
  if (!username) {
    throw new Error("Missing username");
  }

  return prisma.user.findUnique({ where: { username } });
};
