import { WebClient } from '@slack/web-api'
import 'dotenv/config'

const SLACK_BOT_USER_OAUTH_TOKEN = process.env.SLACK_BOT_USER_OAUTH_TOKEN

export async function getChannelHistory() {
  const CHANNEL_ID = 'C087EQZ1SFM'
  const web = new WebClient(SLACK_BOT_USER_OAUTH_TOKEN)
  try {
    const result = await web.conversations.history({
      channel: CHANNEL_ID,
    })

    return result.messages.map((message) => {
      return {
        user: message.user,
        type: message.type,
        text: message.text,
      }
    })
  } catch (error) {
    console.error('Error fetching channel history:', error)
  }
}

getChannelHistory()
