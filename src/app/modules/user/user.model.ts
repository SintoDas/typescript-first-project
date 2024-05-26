import { NextFunction } from 'express';
import { TUser } from './user.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
// eslint-disable-next-line @typescript-eslint/no-this-alias

const userSchema = new Schema(
  {
    id: { type: String, required: true },
    password: {
      type: String,
    },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
// Middleware
userSchema.pre('save', async function (next: NextFunction) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next: NextFunction) {
  doc.password = '';
  next();
});

export const User = model<TUser>('user', userSchema);
