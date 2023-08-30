import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import configuration from 'src/app/common/config/config';
import { Ireq } from '../dto/auth.dto';

const config = configuration()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.JWT_SECRET,
        });
    }

    async validate(payload: Ireq) {
        return { userId: payload.userId, firstname: payload.firstname, email: payload.email }
    }
}