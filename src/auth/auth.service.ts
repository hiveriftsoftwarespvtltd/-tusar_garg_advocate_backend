import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AdminDocument, Admin } from '../admin/schemas/admin.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || pass !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: adminEmail, sub: 'admin-1', role: 'ADMIN' };
    return {
      accessToken: this.jwtService.sign(payload),
      admin: {
        id: 'admin-1',
        name: 'System Admin',
        email: adminEmail,
        role: 'ADMIN',
      }
    };
  }
}
