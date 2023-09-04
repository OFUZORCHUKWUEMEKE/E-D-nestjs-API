import * as bcrypt from 'bcrypt'

export const hashpassword =  (password: string) =>  bcrypt.hashSync(password, 10)

export const comparepassword =  (password:string, encryptedpassword:string) =>  bcrypt.compareSync(password, encryptedpassword)