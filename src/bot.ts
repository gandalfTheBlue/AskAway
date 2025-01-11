import { App } from '@slack/bolt'
import 'dotenv/config'

const SLACK_BOT_USER_OAUTH_TOKEN = process.env.SLACK_BOT_USER_OAUTH_TOKEN
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET

const app = new App({
  token: SLACK_BOT_USER_OAUTH_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
})

async function startBot() {
  const port = 3000
  await app.start(process.env.PORT || port)
  console.log('Bolt app started!!')
}

startBot()
