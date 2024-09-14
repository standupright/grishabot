import OpenAI, { ClientOptions } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { TOKEN } from '../constants/env';

const MAX_LENGTH_CONTEXT = 10;

class OpenAi {
  private openai: OpenAI;
  private stack: ChatCompletionMessageParam[];

  constructor(properties: ClientOptions){
    this.openai = new OpenAI(properties);
    this.stack = [];
  }

  private pushToStack = (message: ChatCompletionMessageParam) => {
    if (this.stack.length < MAX_LENGTH_CONTEXT) {
      this.stack.push(message)
    } else {
      this.stack = [message];
    }
  }

  public clearStack = () => {
      this.stack = []
  }

  sendMessageToOpenAi =  async (message: string) => {
    try {
      const messages: ChatCompletionMessageParam = { role: 'user', content: message };

      this.pushToStack(messages);

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: this.stack,
      });

      const responseMessage = response?.choices?.[0]?.message.content;

      if (responseMessage) {
        this.pushToStack({role: 'assistant', content: responseMessage});
      }

      return responseMessage;
    } catch (error) {
      console.error('Open ai error', error);
    }
  };
}

export const openAI = new OpenAi({ apiKey: TOKEN, baseURL: 'https://api.proxyapi.ru/openai/v1' });
