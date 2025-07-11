import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Please enter a valid email address');
export const phoneSchema = z.string().regex(/^\+94\s?\d{2}\s?\d{3}\s?\d{4}$/, 'Please enter a valid Sri Lankan phone number (+94 XX XXX XXXX)');
export const nicSchema = z.string().regex(/^(\d{9}[vVxX]|\d{12})$/, 'Please enter a valid NIC number');

// Login validation schema
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

// Onboarding validation schemas
export const personalDetailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  fullname: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name must be less than 100 characters'),
  nicNo: nicSchema,
  address: z.string().min(10, 'Address must be at least 10 characters').max(200, 'Address must be less than 200 characters'),
  trainingInstitute: z.string().min(2, 'Training institute is required'),
  course: z.string().min(2, 'Course is required'),
  profilePhoto: z.instanceof(File, { message: 'Profile photo is required' }).optional()
});

export const contactInfoSchema = z.object({
  mobileNo: phoneSchema,
  residenceNo: phoneSchema,
  email: emailSchema,
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactTelephone: phoneSchema
});

export const documentsSchema = z.object({
  documents: z.array(z.instanceof(File)).min(3, 'At least 3 documents are required (NIC, Police report, Birth certificate)')
});

export const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Please enter a valid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter a valid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Please enter a valid CVV'),
  cardName: z.string().min(2, 'Cardholder name is required')
});

// Profile validation schemas
export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: emailSchema,
  phone: phoneSchema,
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional()
});

export const bankDetailsSchema = z.object({
  accountNo: z.string().min(8, 'Account number must be at least 8 digits').max(20, 'Account number must be less than 20 digits').regex(/^\d+$/, 'Account number must contain only numbers'),
  branch: z.string().min(2, 'Branch name is required'),
  branchCode: z.string().min(3, 'Branch code must be at least 3 characters').max(10, 'Branch code must be less than 10 characters'),
  accountHolderName: z.string().min(2, 'Account holder name is required'),
  bankName: z.string().min(1, 'Please select a bank')
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your new password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const traineeCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: emailSchema,
  phone: phoneSchema,
  program: z.string().min(1, 'Program is required'),
  batch: z.string().min(1, 'Batch is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required')
});

// Message validation schema
export const messageSchema = z.object({
  recipient: z.string().min(1, 'Please select a recipient'),
  subject: z.string().min(1, 'Subject is required').max(100, 'Subject must be less than 100 characters'),
  content: z.string().min(1, 'Message content is required').max(1000, 'Message must be less than 1000 characters')
});

// Settings validation schemas
export const systemSettingsSchema = z.object({
  instituteName: z.string().min(2, 'Institute name is required'),
  instituteEmail: emailSchema,
  institutePhone: phoneSchema,
  instituteAddress: z.string().min(10, 'Address must be at least 10 characters'),
  trainingHoursPerDay: z.number().min(1, 'Training hours must be at least 1').max(12, 'Training hours cannot exceed 12'),
  workingDaysPerWeek: z.number().min(1, 'Working days must be at least 1').max(7, 'Working days cannot exceed 7'),
  lateThresholdMinutes: z.number().min(1, 'Late threshold must be at least 1 minute'),
  monthlyFee: z.number().min(0, 'Monthly fee cannot be negative'),
  lateFeePercentage: z.number().min(0, 'Late fee percentage cannot be negative').max(100, 'Late fee percentage cannot exceed 100%')
});

export const emailSettingsSchema = z.object({
  smtpServer: z.string().min(1, 'SMTP server is required'),
  smtpPort: z.number().min(1, 'SMTP port is required').max(65535, 'Invalid port number'),
  smtpUsername: emailSchema,
  smtpPassword: z.string().min(1, 'SMTP password is required')
});

// Event validation schema
export const eventSchema = z.object({
  title: z.string().min(1, 'Event title is required').max(100, 'Title must be less than 100 characters'),
  type: z.enum(['training', 'payment', 'holiday', 'meeting', 'assessment']),
  date: z.string().min(1, 'Event date is required'),
  time: z.string().optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  attendees: z.number().min(0, 'Attendees cannot be negative').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional()
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
export type DocumentsFormData = z.infer<typeof documentsSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
export type TraineeCreateFormData = z.infer<typeof traineeCreateSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type SystemSettingsFormData = z.infer<typeof systemSettingsSchema>;
export type EmailSettingsFormData = z.infer<typeof emailSettingsSchema>;
export type EventFormData = z.infer<typeof eventSchema>;