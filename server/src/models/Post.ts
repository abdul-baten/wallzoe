import { Document, Schema, model } from 'mongoose'

type File = {
  createReadStream: () => any
  filename: string
  mimetype: string
  encoding: string
}

export type PostInput = {
  accountType: string
  accountId: string
  accessToken: string
  scheduleAt: number
  tzOffset: number
  textContent?: string
  files?: [File]
}

export interface PostDocumentI extends Document {
  accountType: string
  accountId: string
  accessToken: string
  scheduleAt: number
  tzOffset: number
  isPublished: boolean
  textContent?: string
  files?: {
    imgUrls: [string]
    vidUrls: [string]
  }
}

const postSchema: Schema = new Schema(
  {
    accountType: {
      type: String,
      required: true
    },
    accountId: {
      type: String,
      required: true
    },
    accessToken: {
      type: String,
      required: true
    },
    scheduleAt: {
      type: Number,
      required: true
    },
    tzOffset: {
      type: Number,
      required: true
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false
    },
    textContent: String,
    files: {
      imgUrls: Array,
      vidUrls: Array
    }
  },
  {
    timestamps: true
  }
)

export default model<PostDocumentI>('Post', postSchema)
