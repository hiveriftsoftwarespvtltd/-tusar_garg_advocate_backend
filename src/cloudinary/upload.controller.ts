import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller(['upload', 'api/upload'])
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  /**
   * Upload binary image via multipart/form-data
   */
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB limit
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided in form-data under "file" field');
    }

    const res = await this.cloudinaryService.uploadFile(file, folder || 'tushar_advocate');
    return {
      success: true,
      url: res.secure_url,
      publicId: res.public_id,
      format: res.format,
      bytes: res.bytes,
      width: res.width,
      height: res.height,
    };
  }

  /**
   * Upload base64 encoded image string or remote image URL
   */
  @Post('base64')
  async uploadBase64(
    @Body('image') image: string,
    @Body('folder') folder?: string,
  ) {
    if (!image) {
      throw new BadRequestException('Field "image" with base64/url string is required');
    }

    const res = await this.cloudinaryService.uploadBase64(image, folder || 'tushar_advocate');
    return {
      success: true,
      url: res.secure_url,
      publicId: res.public_id,
      format: res.format,
      bytes: res.bytes,
      width: res.width,
      height: res.height,
    };
  }

  /**
   * Optional delete route by public ID
   */
  @Delete(':publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    return this.cloudinaryService.deleteImage(publicId);
  }
}
