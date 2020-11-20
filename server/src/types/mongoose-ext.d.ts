declare module 'mongoose' {
  namespace SchemaTypeOpts {
    export interface ValidateOpts {
      message?: (value: string) => string
    }
  }
}
