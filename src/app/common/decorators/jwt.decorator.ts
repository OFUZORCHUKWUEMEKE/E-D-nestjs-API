
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

export const Auth = Reflector.createDecorator<string>();


import { createParamDecorator, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from 'src/app/utils/functions';

export const Jwt = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();

        const token = request?.headers?.authorization?.split(" ")[1]

        if (!token) {
            throw new UnauthorizedException()
        }

        const payload = verifyToken(token)

        return payload
    },
);