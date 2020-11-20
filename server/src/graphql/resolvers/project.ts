import { Request, Response } from 'express'
import Joi from '@hapi/joi'
import { isEmpty } from 'lodash'

import Project, { AddProjectInput, EditProjectInput, DeleteProjectInput } from '../../models/Project'
import {
  projectname,
  addProjectFields,
  editProjectFields,
  ID
} from '../../validation/joiSchema/'
import { dbErr, valErr } from '../../debuggers/debug'

export default {
  Query: {
    hasProjectName: async (
      _: null,
      { name: inputProjectname }: { name: string }
    ) => {
      await Joi.validate(inputProjectname, projectname)
      const project = await Project.findOne({ name: inputProjectname }).exec()
      return project ? true : false
    },
    hasProjectByUserId: async (
      _: null,
      { createdBy }: { createdBy: string }
    ) => {
      await Joi.validate(createdBy, ID)
      const projects = await Project.find({ createdBy, isActive: true }).exec()
      return projects
    },
    hasProjectById: async (
      _: null,
      { _id }: { _id: string }
    ) => {
      await Joi.validate(_id, ID)
      const project = await Project.findById({ _id }).exec()
      return project
    }
  },
  Mutation: {
    addProject: async (
      _: null,
      args: AddProjectInput,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args) && !isEmpty(addProjectFields)) {
        try {
          // validation
          await Joi.validate(args, addProjectFields, { abortEarly: false })
          try {
            const project = await Project.create(args)

            if (project) {
              return project
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
    editProject: async (
      _: null,
      args: EditProjectInput,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args) && !isEmpty(editProjectFields)) {
        try {
          //validation
          await Joi.validate(args, editProjectFields, { abortEarly: false })
          try {
            const project = await Project
            .findByIdAndUpdate({_id: args.id}, {$set: {name: args.name, desc: args.desc}}, {new: true})

            if (project) return project
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
    deleteProject: async (
      _: null,
      args: DeleteProjectInput,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args)) {
        try {
          //validation
          if (args.isDelete) {
            const project = await Project.findByIdAndDelete({ _id: args.id })
            return project
          } else {
            const project = await Project.findByIdAndUpdate({ _id: args.id},{ $set: {isActive: false}})
            return project
          }
        } catch (err) {
          valErr(err)
        }
      }
    }
  }
}
