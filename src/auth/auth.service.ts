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
    const adminEmail = (process.env.ADMIN_EMAIL || 'samunder2611@gmail.com').trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || '123456').trim();

    const inputEmail = (email || '').trim().toLowerCase();
    const inputPass = (pass || '').trim();

    // 1. Check Super Admin Master Credentials
    if (inputEmail === adminEmail && inputPass === adminPassword) {
      const payload = { email: adminEmail, sub: 'super-admin-1', role: 'SUPER_ADMIN' };
      return {
        accessToken: this.jwtService.sign(payload, { expiresIn: '3650d' }),
        admin: {
          id: 'super-admin-1',
          name: 'Super Admin',
          email: adminEmail,
          role: 'SUPER_ADMIN',
          permissions: ['ALL'],
        }
      };
    }

    // 2. Check Database Sub-Admins
    const dbAdmin = await this.adminModel.findOne({ email: inputEmail });
    if (!dbAdmin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (dbAdmin.status === 'INACTIVE') {
      throw new UnauthorizedException('This account has been deactivated. Please contact the administrator.');
    }

    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(inputPass, dbAdmin.passwordHash);
    } catch (e) {
      isMatch = false;
    }

    // Fallback comparison if plain string was stored
    if (!isMatch && dbAdmin.passwordHash === inputPass) {
      isMatch = true;
    }

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Update lastLogin timestamp
    dbAdmin.lastLogin = new Date();
    await dbAdmin.save();

    const payload = { 
      email: dbAdmin.email, 
      sub: dbAdmin._id.toString(), 
      role: dbAdmin.role || 'SUB_ADMIN' 
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '3650d' }),
      admin: {
        id: dbAdmin._id,
        name: dbAdmin.name,
        email: dbAdmin.email,
        role: dbAdmin.role || 'SUB_ADMIN',
        permissions: dbAdmin.permissions || [],
      }
    };
  }
}
