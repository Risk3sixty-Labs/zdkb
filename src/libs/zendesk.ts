import axios from 'axios'

type ArticleCallback = (article: any, index: number) => any

export default function ZendeskClient(
  emailAddress = process.env.ZENDESK_AUTH_EMAIL,
  apiToken = process.env.ZENDESK_AUTH_TOKEN,
  zendeskUrl = process.env.ZENDESK_URL
) {
  return {
    client: axios.create({
      baseURL: zendeskUrl,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${emailAddress}/token:${apiToken}`
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    }),

    async getArticles(
      callback: ArticleCallback,
      locale = 'en-US',
      endpoint?: string,
      currentIndex: number = 1
    ) {
      endpoint =
        endpoint || `/api/v2/help_center/${locale.toLowerCase()}/articles.json`
      const { data } = await this.client.get(endpoint)
      await Promise.all(
        data.articles.map(async (article: any, ind: number) => {
          await callback(article, currentIndex * (ind + 1))
        })
      )

      if (data.next_page)
        await this.getArticles(
          callback,
          locale,
          data.next_page,
          currentIndex + 1
        )
    },
  }
}
