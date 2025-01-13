import { App } from '@slack/bolt'
import 'dotenv/config'
import { getChatGptResponse } from './openai'

const SLACK_BOT_USER_OAUTH_TOKEN = process.env.SLACK_BOT_USER_OAUTH_TOKEN
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET
const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN

const app = new App({
  token: SLACK_BOT_USER_OAUTH_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  appToken: SLACK_APP_TOKEN,
  socketMode: true,
})

async function startBot() {
  const port = 3000
  await app.start(process.env.PORT || port)
  console.log('Bolt app started!!')
}

app.event('message', async ({ say, message }) => {
  try {
    // @ts-ignore
    const text = message.text
    if (text.startsWith('<@U087TLPUX17>')) {
      const response = await getChatGptResponse()
      say(response)
    }
  } catch (error) {
    console.log('err')
    console.error(error)
  }
})

startBot()
