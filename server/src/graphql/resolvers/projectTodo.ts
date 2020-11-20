import { Request, Response } from 'express'
import Joi from '@hapi/joi'
import { isEmpty } from 'lodash'

import ProjectTodo, { AddTodoInput, AddTodoAssignInput, AddTodoCommentInput, EditTodoInput, DeleteTodoInput } from '../../models/ProjectTodo'
import {
  projectTodoName,
  addTodoFields,
  ID
} from '../../validation/joiSchema/'
import { dbErr, valErr } from '../../debuggers/debug'

export default {
  Query: {
    hasProjectTodoName: async (
      _: null,
      { name: inputName }: { name: string }
    ) => {
      await Joi.validate(inputName, projectTodoName)
      const todo = await ProjectTodo.findOne({ name: inputName }).exec()
      return todo ? true : false
    },
    hasTodoListByProjectId: async (
      _:null,
      { projectId }: { projectId: string }
    ) => {
      await Joi.validate(projectId, ID)
      const todoList = await ProjectTodo
        .find({ projectId, isActive: true })
        .populate('assign.assignUsers')
        .populate('assign.notifyUsers')
        .exec()
      return todoList
    },
    hasProjectTodoById: async (
      _: null,
      { _id }: { _id: string }
    ) => {
      await Joi.validate(_id, ID)
      const todo = await ProjectTodo
        .findById({ _id })
        .populate('assign.assignUsers')
        .populate('assign.notifyUsers')
        .populate('comment.createdBy')
        .exec()
      return todo
    }
  },
  Mutation: {
    addTodo: async (
      _: null,
      args: AddTodoInput,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args) && !isEmpty(addTodoFields)) {
        try {
          // validation
          await Joi.validate(args, addTodoFields, { abortEarly: false })
          try {
            const todo = await ProjectTodo.create(args)

            if (todo) {
              return todo
            }
          } catch (err) {
            dbErr(err)
            return err
          }
        } catch (err) {
          valErr(err)
          return err
        }
      }
    },
    editTodo: async(
      _: null,
      args: EditTodoInput,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args)) {
        try {
          const projectTodo = await ProjectTodo
            .findByIdAndUpdate({_id: args.id}, {$set: {name: args.name, detail: args.detail}}, {new: true})
            if (projectTodo) return projectTodo
        } catch (err) {
          dbErr(err)
          return err
        }
      }
    },
    deleteTodo: async (
      _: null,
      args: DeleteTodoInput,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args)) {
        try {
          //validation
          if (args.isDelete) {
            const todo = await ProjectTodo.findByIdAndDelete({ _id: args.id })
            return todo
          } else {
            const todo = await ProjectTodo.findByIdAndUpdate({ _id: args.id},{ $set: {isActive: false}})
            return todo
          }
        } catch (err) {
          valErr(err)
        }
      }
    },
    addTodoAssign: async (
      _: null,
      args: AddTodoAssignInput,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args)) {
        try {
          const todo = await ProjectTodo
            .findByIdAndUpdate({_id: args.id}, {$push: {assign: args}}, {new: true})
          if(todo.assign) {
            const todoList = await ProjectTodo.find({ projectId: todo.projectId })
            .populate('assign.assignUsers')
            .populate('assign.notifyUsers')
            return todoList
          }
        } catch (err) {
          dbErr(err)
          return err
        }
      }
    },
    addTodoComment: async (
      _: null,
      args: AddTodoCommentInput,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args)) {
        try {
          const todo = await ProjectTodo
            .findByIdAndUpdate({_id: args.id}, {$push: {comment: args}}, {new: true})
            .populate('comment.createdBy')
          if (todo.comment) {
            return todo.comment
          }
        } catch (err) {
          dbErr(err)
          return err
        }
      }
    }
  }
}
