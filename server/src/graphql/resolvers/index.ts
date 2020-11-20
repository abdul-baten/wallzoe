import { merge } from 'lodash'
import root from './root'
import socialAccount from './socialAccount'
import user from './user'
import project from './project'
import post from './post'
import projectTodo from './projectTodo'
import temp from './temp'

export default merge(
  root,
  socialAccount,
  user,
  post,
  project,
  projectTodo,
  temp
)
