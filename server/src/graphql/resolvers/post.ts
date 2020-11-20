import mongoose from 'mongoose'
import { isEmpty } from 'lodash'
import { dbErr } from '../../debuggers/debug'

import { saveFile } from '../../aws/s3/'

import { Post, PostInput } from '../../models'

export default {
  Mutation: {
    addPost: async (_: null, postInfo: PostInput) => {
      if (!isEmpty(postInfo)) {
        // file manipulation

        const imgUrls = []
        const vidUrls = []

        for (let file of postInfo.files) {
          let { createReadStream, filename, mimetype } = await file
          const type = mimetype.split('/')[0]
          const stream = createReadStream()

          // generate unique file name
          filename = `post-${Date.now()}${Math.round(
            Math.random() * 1000 + 1
          )}-${filename}`

          //TODO: validate file

          // save file to aws s3 bucket
          const remoteUrl = await saveFile(stream, filename, mimetype)

          if (type === 'image') {
            imgUrls.push(remoteUrl)
          } else if (type === 'video') {
            vidUrls.push(remoteUrl)
          }
        }
        // TODO: validation all data

        try {
          const scheduleTimezoneOffset = postInfo.tzOffset
          const currentTimezoneOffset = -new Date().getTimezoneOffset()
          const offsetDiff = scheduleTimezoneOffset - currentTimezoneOffset

          const post = await Post.create({
            ...postInfo,
            files: {
              imgUrls,
              vidUrls
            },
            scheduleAt: postInfo.scheduleAt + Math.floor(offsetDiff)
          })

          if (post) {
            return post
          }
        } catch (err) {
          dbErr(err)
        }
      }
    }
  }
}
