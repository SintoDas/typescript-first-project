import mongoose, { Schema, Types, model } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface TStudent {
  id: string;
  user: mongoose.Types.ObjectId;
  password: string;
  name: TStudentName;
  gender: 'male' | 'female' | 'others';
  bloodType: BloodType;
  dateOfBirth?: string;
  email: string;
  contactNO: string;
  emergencyContactNo: string;
  guardianInfo: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  isDeleted: boolean;
}

const StudentSchema: Schema = new Schema({
  id: { type: String, required: true },
  user: { type: Types.ObjectId, required: true },
  name: { type: Object, required: true },
  gender: { type: String, enum: ['male', 'female', 'others'], required: true },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNO: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  guardianInfo: { type: Object, required: true },
  localGuardian: { type: Object, required: true },
  profileImg: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
});

export const StudentModel = model<TStudent>('Student', StudentSchema);
