import VkBot from 'node-vk-bot-api';
import dotenv from 'dotenv';
import OpenAI from 'openai';


dotenv.config();

const OpenAi = new OpenAI({ apiKey: process.env.OPEN_API_KEY, baseURL: 'https://api.proxyapi.ru/openai/v1' });


const sendMessageToOpenAi =  async (message) => {
  try {
    const messages = [{ role: 'user', content: message }];
    const response = await OpenAi.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
    });
    console.log('open ai response', response);

    return response?.choices?.[0]?.message.content;
  } catch (error) {
    console.error('Open ai error', error);
  }
};


const sendMessage = async (ctx) => {
  const isNewDate =  ctx.message.date >= new Date().getTime() * - 60*1000;

  if (
    isNewDate &&
    ctx.message.type === 'message_new' &&
    ctx.message.text.includes('Гриша')
  ) {
    const messageFromBot = ctx.message.text;
    const reply = await sendMessageToOpenAi(messageFromBot);

    const messageToSend = reply || 'Затрудняюсь ответить'

    await ctx.reply(messageToSend);
  }
};

const bot = new VkBot({
  token: process.env.TOKEN
});


bot.on(async (ctx) => {
  try {
    await sendMessage(ctx);
  } catch (e) {
    console.error(e);
}});

bot.startPolling();

process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
