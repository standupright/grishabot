
import { openAI } from './openai';

const CONF_LENGTH = 10;

const COUNTER_LENGTH =  50;

class Core {
  private counter: number;
  private messageQueue: string[];

  constructor(){
    this.counter = 0;
    this.messageQueue = [];
  };

  private increase = () => {
    if (this.counter > COUNTER_LENGTH) {
      this.counter = 0;
    } else {
      this.counter = this.counter + 1;
    }
  }

  private pushToQueue = (message: string) => {
    if (this.messageQueue.length < CONF_LENGTH) {
      this.messageQueue.push(message)
    } else {
      this.messageQueue.shift();
      this.messageQueue.push(message);
    }
  }

// todo: refactor
  sendMessage = async (ctx: VkBotContext) => {
      const message = ctx.message.text;

      if (message) {
        this.increase();
        this.pushToQueue(message);
      }


      if (this.counter === COUNTER_LENGTH) {
        const reply = await openAI.sendConfMessagesToOpenAi(this.messageQueue);

        const messageToSend = reply || 'Затрудняюсь ответить'

        await ctx.reply(messageToSend);
      }

      const isNormalContext = message?.includes('Григорий');

      if (isNormalContext && message) {

        const messageFromBot = message.replace('Григорий', '');

        const reply = await openAI.sendMessageToOpenAi(messageFromBot, 'normal');

        const messageToSend = reply || 'Затрудняюсь ответить'

        await ctx.reply(messageToSend);
      }

      const isValidMessage =  message?.includes('Гриша');

      if (!isValidMessage || !message) {
        return;
      };

      const messageFromBot = message.replace('Гриша', '');

      const reply = await openAI.sendMessageToOpenAi(messageFromBot);

      const messageToSend = reply || 'Затрудняюсь ответить'

      await ctx.reply(messageToSend);


  };

}

export const core = new Core();
