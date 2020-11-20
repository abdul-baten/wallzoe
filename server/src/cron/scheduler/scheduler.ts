import { CronJob } from 'cron'
import { Post } from '../../models'
import postInFBPage from './facebook/page'

import config from 'config'
import rp from 'request-promise'

export const postScheduler = () => {
  const cronJob = new CronJob(
    '*/20 * * * * *',
    async () => {
      const currentTime = Math.floor(new Date().getTime() / 1000 / 60)
      const post = await Post.findOne({
        isPublished: false,
        scheduleAt: currentTime
      }).exec()

      if (post) {
        if (post.accountType === 'facebook-page') {
          await postInFBPage(post)
        }
      }
    },
    null,
    true
  )
  cronJob.start()
}
