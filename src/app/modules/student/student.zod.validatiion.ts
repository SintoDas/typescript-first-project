import { z } from 'zod';

const StudentNameZodSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const GuardianZodSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const LocalGuardianZodSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const StudentZodSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: StudentNameZodSchema,
  gender: z.enum(['male', 'female', 'others']),
  bloodType: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().min(1),
  contactNO: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  guardianInfo: GuardianZodSchema,
  localGuardian: LocalGuardianZodSchema,
  profileImg: z.string().min(1),
  isActive: z.enum(['active', 'blocked']).optional(),
  isDeleted: z.boolean(),
});

export default StudentZodSchema;
