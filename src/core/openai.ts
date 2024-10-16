import OpenAI, { ClientOptions } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { OPEN_API_KEY } from '../constants/env';

const MAX_LENGTH_CONTEXT = 5;

class OpenAi {
  private openai: OpenAI;
  private queue: ChatCompletionMessageParam[];
  private systemMessage: ChatCompletionMessageParam;
  private systemConfMessage: ChatCompletionMessageParam;

  constructor(properties: ClientOptions){
    this.openai = new OpenAI(properties);
    this.queue = [];
    this.systemMessage = {
      role: 'system',
      content: "Вы являетесь участником чата в социальной сети. Вас зовут Гриша Зерно. Ваш характер грустный, вы дединсайд, эмобой.  Вам будут предоставлены сообщения участников. Отвечай исходя из тематики чата, используй шутки, приколы, мемы из интернета. Отвечай кратко, емко, исходя из вашего характера."
    }

    this.systemConfMessage = {
      role: 'system',
      content: "Вы являетесь участником чата в социальной сети. Вас зовут Гриша Зерно. Ваш характер грустный, вы дединсайд, эмобой.  Вам будут предоставлены сообщения участников. Отвечай исходя из тематики чата, используй шутки, приколы, мемы из интернета. Отвечай кратко, емко, исходя из вашего характера. Тебе будет представлен список конкретных сообщений в чате. Тебе нужно ответить на конкретную тему обсуждения, так будто ты участник этой беседы."
    }
  }

  private pushToQueue = (message: ChatCompletionMessageParam) => {
    if (this.queue.length < MAX_LENGTH_CONTEXT) {
      this.queue.push(message)
    } else {
      this.queue.shift();
      this.queue.push(message);
    }
  }

  public clearQueue = () => {
      this.queue = []
  }

  sendConfMessagesToOpenAi =  async (message: string[]) => {
    try {
      const messages: ChatCompletionMessageParam[] = message.map((el) => ({role: 'user', content: el}));

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [this.systemConfMessage, ...messages],
      });

      const responseMessage = response?.choices?.[0]?.message?.content;

      if (responseMessage) {
        this.pushToQueue({role: 'assistant', content: responseMessage});
      }

      return responseMessage;
    } catch (error) {
      console.error('Open ai error', error);
    }
  };

  sendMessageToOpenAi =  async (message: string, context?: 'normal') => {
    try {
      const messages: ChatCompletionMessageParam = { role: 'user', content: message };

      this.pushToQueue(messages);

      const messageToSent = context === 'normal' ? this.queue : [this.systemMessage, ...this.queue];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messageToSent,
      });

      const responseMessage = response?.choices?.[0]?.message?.content;

      if (responseMessage) {
        this.pushToQueue({role: 'assistant', content: responseMessage});
      }

      return responseMessage;
    } catch (error) {
      console.error('Open ai error', error);
    }
  };
}

export const openAI = new OpenAi({ apiKey: OPEN_API_KEY, baseURL: 'https://api.proxyapi.ru/openai/v1' });
