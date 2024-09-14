"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../constants/env");
class OpenAi {
    constructor(properties) {
        this.pushToStack = (message) => {
            if (this.stack.length < MAX_LENGTH_CONTEXT) {
                this.stack.push();
            }
            sendMessageToOpenAi = async (message) => {
                try {
                    const messages = [{ role: 'user', content: message }];
                    const response = await this.openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: messages,
                    });
                    console.log('open ai response', response);
                    return response?.choices?.[0]?.message.content;
                }
                catch (error) {
                    console.error('Open ai error', error);
                }
            };
        };
        this.openAI = new OpenAi({ apiKey: env_1.TOKEN, baseURL: 'https://api.proxyapi.ru/openai/v1' });
        this.openai = new openai_1.default(properties);
        this.stack = [];
    }
}
