import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  /**
   * Uploads a file buffer (from Multer) to Cloudinary with automatic optimization
   */
  async uploadFile(file: Express.Multer.File, folder = 'tushar_advocate'): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('No file provided for upload');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(error || new Error('Upload to Cloudinary failed'));
          }
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  /**
   * Uploads a base64 string or remote URL directly to Cloudinary
   */
  async uploadBase64(base64OrUrl: string, folder = 'tushar_advocate'): Promise<UploadApiResponse> {
    if (!base64OrUrl) {
      throw new BadRequestException('Image data is required');
    }

    try {
      const result = await cloudinary.uploader.upload(base64OrUrl, {
        folder,
        resource_type: 'auto',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });
      return result;
    } catch (error: any) {
      throw new BadRequestException(
        'Cloudinary upload failed: ' + (error?.message || 'Unknown error'),
      );
    }
  }

  /**
   * Delete an image from Cloudinary by public ID
   */
  async deleteImage(publicId: string): Promise<any> {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
      throw new BadRequestException('Cloudinary delete failed: ' + error?.message);
    }
  }
}
