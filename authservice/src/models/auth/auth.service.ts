import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signPayload(payload: any) {
        return sign(payload, 'seceret', { expiresIn: '12h' });
    }
    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }
}