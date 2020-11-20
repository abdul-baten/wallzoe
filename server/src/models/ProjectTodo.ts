import { Document, Model, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

import { secretError } from '../debuggers/debug'
import { string } from '@hapi/joi'

export type AddTodoInput = {
  name: string,
  detail: string,
  projectId: Schema.Types.ObjectId
}

export type EditTodoInput = {
  name: string,
  detail: string,
  id: Schema.Types.ObjectId
}

export type DeleteTodoInput = {
  id: Schema.Types.ObjectId,
  isDelete: boolean
}

export type AddTodoAssignInput = {
  id: Schema.Types.ObjectId,
  desc: string,
  assignUsers: [Schema.Types.ObjectId],
  notifyUsers: [Schema.Types.ObjectId],
  specDate: string,
  startDate: string,
  endDate: string,
  extra: string,
  isActive: boolean,
  dueDateType: string
}

export type AddTodoCommentInput = {
  id: Schema.Types.ObjectId,
  createdBy: Schema.Types.ObjectId,
  content: string
}

interface ProjectTodoDocumentI extends Document {
  name: string,
  detail?: string,
  projectId: Schema.Types.ObjectId,
  assign?: [{
    desc: string,
    assignUsers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    notifyUsers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    specDate: string,
    startDate: string,
    endDate: string,
    extra: string,
    isActive: boolean,
    dueDateType: string
  }],
  comment?: [
    {
      content: string,
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      createdDate: Date
    }
  ],
  isActive: boolean,
  _doc: object
}

interface ProjectTodoModelI extends Model<ProjectTodoDocumentI> {
  alreadyExist: (field: object) => Promise<boolean>
}

const projectTodoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    detail: String,
    projectId: Schema.Types.ObjectId,
    assign: [
      {
        desc: String,
        assignUsers: [{
          type: Schema.Types.ObjectId,
          ref: 'User'
        }],
        notifyUsers: [{
          type: Schema.Types.ObjectId,
          ref: 'User'
        }],
        specDate: String,
        startDate: String,
        endDate: String,
        extra: String,
        isActive: Boolean,
        dueDateType: String
      }
    ],
    comment: [
      {
        content: String,
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        createdDate: {
          type: Date,
          default: Date.now
        }
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

projectTodoSchema.pre<ProjectTodoDocumentI>('save', function(next) {
  try {
    next()
  } catch (err) {
    secretError(err)
    next(err)
  }
  next()
})

projectTodoSchema.statics.alreadyExist = async function(
  fields: object
): Promise<boolean> {
  return (await this.where(fields).countDocuments()) !== 0
}

const ProjectTodo: ProjectTodoModelI = model<ProjectTodoDocumentI, ProjectTodoModelI>('ProjectTodo', projectTodoSchema)
export default ProjectTodo
