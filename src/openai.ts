import 'dotenv/config'
import OpenAI from 'openai'
import { getChannelHistory } from './history'

export interface ChatgptMessageModel {
  role: 'user' | 'assistant'
  content: string
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getChatGptResponse() {
  const messages: ChatgptMessageModel[] = []
  const chatHistories = await getChannelHistory()
  chatHistories.forEach((message) => {
    messages.push({
      role: 'user',
      content: JSON.stringify(message),
    })
  })

  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-4-turbo',
  })

  return completion.choices[0].message.content
}

getChatGptResponse()
