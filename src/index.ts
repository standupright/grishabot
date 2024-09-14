import VkBot from 'node-vk-bot-api';
import { core, openAI } from './core';
import { CONFIRMATION, PORT, TOKEN } from 'constants/env';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const bot = new VkBot({
  token: TOKEN,
  confirmation: CONFIRMATION,
});

bot.on(async (ctx) => {
  try {
    await core.sendMessage(ctx);
  } catch (e) {
    console.error(e);
}});

bot.command('/clear', async (ctx) => {
  try {
    await openAI.clearStack();
    await ctx.reply('Все забыл')
  } catch (e) {
    console.error(e);
}});


app.use(bodyParser.json());

// @ts-ignore-next-line
app.post('/', bot.webhookCallback);


app.listen(PORT);

process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
