import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { ensureSignedOut } from '../../authentication/utils'

class Guest extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    /* 
      get the resolve function from field 
      if not found then default field resolver will be used
    */
    const { resolve = defaultFieldResolver } = field

    // overwrite resolve function push with one middleware function
    field.resolve = function(...args) {
      const [, , { req }] = args
      ensureSignedOut(req) // if this function passed without any error then
      return resolve.apply(this, args) // resolve continue with it's native args
    }
  }
}

export default Guest
