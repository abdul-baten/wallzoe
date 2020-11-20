import { Document, Model, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

import { secretError } from '../debuggers/debug'
import { string } from '@hapi/joi'

export type AddProjectInput = {
  name: string
}

export type EditProjectInput = {
  name: string,
  desc: string,
  id: Schema.Types.ObjectId
}

export type DeleteProjectInput = {
  id: Schema.Types.ObjectId,
  isDelete: boolean
}

interface ProjectDocumentI extends Document {
  name: string,
  desc: string,
  createdBy: Schema.Types.ObjectId,
  isActive: boolean,
  _doc: object
}

interface ProjectModelI extends Model<ProjectDocumentI> {
  alreadyExist: (field: object) => Promise<boolean>
}

const projectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    desc: String,
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: Schema.Types.ObjectId
  },
  {
    timestamps: true
  }
)

projectSchema.pre<ProjectDocumentI>('save', function(next) {
  try {
    next()
  } catch (err) {
    secretError(err)
    next(err)
  }
  next()
})

projectSchema.statics.alreadyExist = async function(
  fields: object
): Promise<boolean> {
  return (await this.where(fields).countDocuments()) !== 0
}

const Project: ProjectModelI = model<ProjectDocumentI, ProjectModelI>('Project', projectSchema)
export default Project
