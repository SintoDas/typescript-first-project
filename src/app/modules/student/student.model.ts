import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { NextFunction } from 'express';

// Define interfaces for type checking
interface TStudentName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

interface TLocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

interface TStudent {
  id: string;
  password: string;
  name: TStudentName;
  gender: 'male' | 'female' | 'others';
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  dateOfBirth?: string;
  email: string;
  contactNO: string;
  emergencyContactNo: string;
  guardianInfo: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
}

// Organizing the schema
const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    max: [20, 'First Name cannot exceed 20 characters'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const guardianInfoSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id must be provided'],
      unique: true,
      ref: 'User',
    },
    name: studentNameSchema,
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    },
    bloodType: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNO: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    guardianInfo: guardianInfoSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Virtual
studentNameSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.middleName || ''} ${this.lastName}`;
});

// // Static method
// studentSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await this.findOne({ id });
//   return existingUser;
// };

// Model
export const Student = model<TStudent>('Student', studentSchema);
