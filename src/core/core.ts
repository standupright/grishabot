
import { openAI } from './openai';

class Core {
  sendMessage = async (ctx: VkBotContext) => {
      const message = ctx.message.text;

      console.log('ctx', ctx);

      const isValidMessage =  message?.includes('Гриша');

      if (!isValidMessage || !message) {
        await ctx.reply('Не валидное сообщение');
        return;
      };

      const messageFromBot = message.replace('Гриша', '');

      const reply = await openAI.sendMessageToOpenAi(messageFromBot);

      const messageToSend = reply || 'Затрудняюсь ответить'

      await ctx.reply(messageToSend);
  };

}

export const core = new Core();
