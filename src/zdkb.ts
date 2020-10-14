require('dotenv').config()

// import minimist from 'minimist'
import { v4 as uuidv4 } from 'uuid'
import { uploadObject } from './libs/aws'
import Zendesk from './libs/zendesk'

// const argv = minimist(process.argv.slice(2))
;(async function zdkb() {
  try {
    const backupInstancePrefix = `${Date.now()}__${uuidv4()}`
    const fullPrefixBase = [
      process.env.AWS_S3_PREFIX || 'zdkb',
      backupInstancePrefix,
    ]
    const zendesk = Zendesk()
    await zendesk.getArticles(async function processArticle(
      article: any,
      ind: number
    ) {
      const filePathInBucket = [
        ...fullPrefixBase,
        `${ind}__${article.title}.json`,
      ]
      await uploadObject(filePathInBucket.join('/'), JSON.stringify(article))
    })

    console.log(`Successfully saved your articles to`)
    console.log(`s3://${process.env.AWS_S3_BUCKET}/${fullPrefixBase.join('/')}`)
  } catch (err) {
    console.error(`Error processing knowledge base`, err)
  } finally {
    process.exit()
  }
})()
