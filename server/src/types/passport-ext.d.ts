import 'passport'

declare module 'passport' {
  interface AuthenticateOptions {
    authType?: string
  }
}
