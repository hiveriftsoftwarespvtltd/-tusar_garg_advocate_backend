import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {
    this.initEmailTransporter();
  }

  private initEmailTransporter() {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      this.logger.log(`Nodemailer transport initialized for user: ${user}`);
    } else {
      this.logger.warn(
        'SMTP_USER or SMTP_PASS not set in .env. Email notifications will be logged to console.',
      );
    }
  }

  async create(createContactDto: any): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    const savedContact = await createdContact.save();

    // Send Email Notification
    this.sendNotificationEmail(savedContact);

    return savedContact;
  }

  private async sendNotificationEmail(contact: Contact) {
    const adminEmail = process.env.NOTIFICATION_EMAIL || 'advocate.tushargarg@gmail.com';
    const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@tushargargadvocate.com';

    const subject = `[New Contact Submission] ${contact.subject || 'Website Inquiry'} from ${contact.name}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0d1b3e; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="color: #c9a84c; margin: 0; font-family: Georgia, serif;">New Legal Inquiry Received</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #e2e8f0;">Website Contact Form Submission</p>
        </div>
        <div style="padding: 24px; color: #1e293b; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #0d1b3e;">Client Name:</td>
              <td style="padding: 8px 0;">${contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0d1b3e;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${contact.email}" style="color: #c9a84c; text-decoration: none;">${contact.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0d1b3e;">Phone Number:</td>
              <td style="padding: 8px 0;"><a href="tel:${contact.phone}" style="color: #0d1b3e; font-weight: bold;">${contact.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0d1b3e;">Subject:</td>
              <td style="padding: 8px 0;">${contact.subject || 'General Consultation'}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 16px 0;" />
          <div>
            <p style="font-weight: bold; margin-bottom: 8px; color: #0d1b3e;">Message / Case Details:</p>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #c9a84c; font-size: 14px; line-height: 1.6;">
              ${contact.message}
            </div>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Tushar Garg Advocate & Legal Practice Management System
        </div>
      </div>
    `;

    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from: `"${contact.name} via Tushar Garg Advocate Portal" <${senderEmail}>`,
          to: adminEmail,
          replyTo: contact.email,
          subject,
          html: htmlContent,
        });
        this.logger.log(`Email notification successfully sent to ${adminEmail}`);
      } catch (err: any) {
        this.logger.error(`Failed to send notification email: ${err.message}`, err.stack);
      }
    } else {
      this.logger.log(`[SIMULATED EMAIL TO ${adminEmail}]:\nSubject: ${subject}\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nMessage: ${contact.message}`);
    }
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Contact | null> {
    return this.contactModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.contactModel.findByIdAndDelete(id).exec();
  }
}
