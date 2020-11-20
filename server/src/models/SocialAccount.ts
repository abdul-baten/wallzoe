import { Document, Schema, model } from 'mongoose'

type FbPages = {
  id: string
  name: string
  accessToken: string
  pictureUrl?: string
}
type FbGroups = {
  id: string
  name: string
  privacy?: string
  pictureUrl?: string
}

interface AccountDocumentI extends Document {
  accountType: string
  accountId: string
  accessToken: string
  userName?: string
  email?: string
  pictureUrl?: string
  pages?: Array<FbPages>
  groups?: Array<FbGroups>

  _doc: object
}

const aSchema = {
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
  userName: {
    type: String
  },
  email: {
    type: String
  },
  pictureUrl: {
    type: String
  },
  pages: {
    type: [
      {
        id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        accessToken: {
          type: String,
          required: true
        },
        pictureUrl: String
      }
    ]
  },
  groups: {
    type: [
      {
        id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        privacy: String,
        pictureUrl: String
      }
    ]
  }
}

const accountSchema = new Schema(aSchema)

export default model<AccountDocumentI>('SocialAccount', accountSchema)
