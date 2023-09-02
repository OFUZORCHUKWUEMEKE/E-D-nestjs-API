import * as jwt from 'jsonwebtoken'
import configuration from '../common/config/config'

const config = configuration()

export const GenerateToken = async (email) => {
    const token = await jwt.sign(email, config.JWT_SECRET, { expiresIn: '5m' })
    return email
}