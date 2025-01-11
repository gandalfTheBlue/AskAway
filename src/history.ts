import { App } from '@slack/bolt'
import { WebClient } from '@slack/web-api'
import 'dotenv/config'

const CHANNEL_ID = 'C087EQZ1SFM'
const SLACK_BOT_USER_OAUTH_TOKEN = process.env.SLACK_BOT_USER_OAUTH_TOKEN
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET

const app = new App({
  token: SLACK_BOT_USER_OAUTH_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
})

// Function to get channel history
async function getChannelHistory(channelId) {
  // Initialize
  const web = new WebClient(SLACK_BOT_USER_OAUTH_TOKEN)
  try {
    // Call the conversations.history method using WebClient
    const result = await web.conversations.history({
      channel: channelId,
    })

    console.log('Channel History:', result.messages)
  } catch (error) {
    console.error('Error fetching channel history:', error)
  }
}

// Call the function
getChannelHistory(CHANNEL_ID)
