import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import configuration from 'src/app/common/config/config';
import { CustomerRepository } from 'src/app/customer/customer.repository';
import * as jwt from 'jsonwebtoken'

const config = configuration()


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private jwtService: JwtService, private configService: ConfigService, private customerRepository: CustomerRepository) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        const payload = await this.extractTokenfromHeader(request)
        console.log(payload)
        request.user = payload
        const customer = await this.customerRepository.findOne({
            where: {
                id: payload.userId
            }
        })
        if (roles.includes(customer.customertype)) {
            return true
        } else {
            console.log('added successfully')
            return false
        }
    }

    async extractTokenfromHeader(request: Request) {
        try {
            const token = request?.headers?.authorization?.split(" ")[1]
            if (!token) {
                throw new UnauthorizedException()
            }

            const payload = this.jwtService.verifyAsync(token, { secret: config.JWT_SECRET })
            return payload
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return 'Expired Jwt Token'
            }
        }

    }
}