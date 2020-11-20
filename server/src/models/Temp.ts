import {Schema, Document, model} from 'mongoose'

interface TempDocumentI extends Document {
  authFor?: string
}

const tempSchema: Schema = new Schema({
    authFor: String
})

export default model<TempDocumentI>('Temp', tempSchema)