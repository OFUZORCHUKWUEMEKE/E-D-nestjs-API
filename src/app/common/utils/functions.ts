import * as bcrypt from 'bcrypt'

export const hashpassword = async (password: string) => bcrypt.hash(password, 10)

export const comparepassword = async (password, encryptedpassword) => await bcrypt.compare(password, encryptedpassword)