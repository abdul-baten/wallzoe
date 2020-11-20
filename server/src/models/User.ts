import { Document, Model, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

import { secretError } from '../debuggers/debug'

export type UserInputSignUp = {
  email: string
  password: string
  confirmPassword: string
}

export type userInputSignIn = {
  usernameOrEmail: string
  password: string
}

interface UserDocumentI extends Document {
  username: string
  email: string
  password: string
  isAdmin?: boolean
  adminId?: Schema.Types.ObjectId
  role?: number
  matchPassword: (password: string) => Promise<boolean>

  _doc: object
}

interface UserModelI extends Model<UserDocumentI> {
  alreadyExist: (field: object) => Promise<boolean>
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      validate: {
        validator: async (username: string): Promise<boolean> =>
          !(await User.alreadyExist({ username })),
        message: (value: string) => 'Username already have taken'
      }
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: async (email: string): Promise<boolean> =>
          !(await User.alreadyExist({ email })),
        message: (value: string) => 'Email already have taken'
      }
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: Boolean,
    adminId: Schema.Types.ObjectId,
    role: Number
  },
  {
    timestamps: true
  }
)

userSchema.pre<UserDocumentI>('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 12)
      next()
    } catch (err) {
      secretError(err)
      next(err)
    }
  }
  next()
})

userSchema.statics.alreadyExist = async function(
  fields: object
): Promise<boolean> {
  return (await this.where(fields).countDocuments()) !== 0
}
userSchema.methods.matchPassword = async function(
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

const User: UserModelI = model<UserDocumentI, UserModelI>('User', userSchema)
export default User
