import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async findAll() {
    return this.adminModel
      .find()
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id).select('-passwordHash').exec();
    if (!admin) {
      throw new NotFoundException(`Sub-admin with ID ${id} not found`);
    }
    return admin;
  }

  async create(body: any) {
    const { name, email, password, role, status, permissions } = body;

    if (!name || !email || !password) {
      throw new BadRequestException('Name, email, and password are required');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await this.adminModel.findOne({ email: normalizedEmail });
    if (existing) {
      throw new BadRequestException('An account with this email address already exists');
    }

    const passwordHash = await bcrypt.hash(password.trim(), 10);

    const newAdmin = new this.adminModel({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: role || 'SUB_ADMIN',
      status: status || 'ACTIVE',
      permissions: Array.isArray(permissions) ? permissions : [],
    });

    const saved = await newAdmin.save();
    const result = saved.toObject();
    delete (result as any).passwordHash;
    return result;
  }

  async update(id: string, body: any) {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException(`Sub-admin with ID ${id} not found`);
    }

    const { name, email, password, role, status, permissions } = body;

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      if (normalizedEmail !== admin.email) {
        const existing = await this.adminModel.findOne({ email: normalizedEmail, _id: { $ne: id } });
        if (existing) {
          throw new BadRequestException('An account with this email address already exists');
        }
        admin.email = normalizedEmail;
      }
    }

    if (name) admin.name = name.trim();
    if (role) admin.role = role;
    if (status) admin.status = status;
    if (permissions !== undefined) {
      admin.permissions = Array.isArray(permissions) ? permissions : [];
    }

    if (password && password.trim().length > 0) {
      admin.passwordHash = await bcrypt.hash(password.trim(), 10);
    }

    const updated = await admin.save();
    const result = updated.toObject();
    delete (result as any).passwordHash;
    return result;
  }

  async toggleStatus(id: string) {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException(`Sub-admin with ID ${id} not found`);
    }

    admin.status = admin.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const updated = await admin.save();
    const result = updated.toObject();
    delete (result as any).passwordHash;
    return result;
  }

  async remove(id: string) {
    const admin = await this.adminModel.findByIdAndDelete(id);
    if (!admin) {
      throw new NotFoundException(`Sub-admin with ID ${id} not found`);
    }
    return { success: true, message: 'Sub-admin deleted successfully' };
  }
}
