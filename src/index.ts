import VkBot from 'node-vk-bot-api';
import { core, openAI } from './core';
import { TOKEN } from 'constants/env';

const bot = new VkBot({
  token: TOKEN,
});

bot.on(async (ctx) => {
  try {
    const currentTime = Math.floor((Date.now() - 10*1000) / 1000);
    const isOld = ctx.message.date < currentTime;

    if (isOld) return;

    await core.sendMessage(ctx);
  } catch (e) {
    console.error(e);
}});

bot.command('/clear', async (ctx) => {
  try {
    await openAI.clearQueue();
    await ctx.reply('Все забыл')
  } catch (e) {
    console.error(e);
}});


bot.startPolling();


process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
