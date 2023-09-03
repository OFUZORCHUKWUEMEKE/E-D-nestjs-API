import * as jwt from 'jsonwebtoken'
import configuration from '../common/config/config'

const config = configuration()

export const GenerateToken = async (id: string, email: string) => {
    // const payload = { email }
    const token = await jwt.sign({ id, email }, config.JWT_SECRET, { expiresIn: '5m' })
    return token
}

export const verifyToken = async (token: string) => jwt.verify(token,config.JWT_SECRET)