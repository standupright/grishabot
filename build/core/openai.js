"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAI = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../constants/env");
const MAX_LENGTH_CONTEXT = 10;
class OpenAi {
    constructor(properties) {
        this.pushToStack = (message) => {
            if (this.stack.length < MAX_LENGTH_CONTEXT) {
                this.stack.push(message);
            }
            else {
                this.stack = [message];
            }
        };
        this.clearStack = () => {
            this.stack = [];
        };
        this.sendMessageToOpenAi = async (message) => {
            try {
                const messages = { role: 'user', content: message };
                this.pushToStack(messages);
                console.log(this.stack);
                const response = await this.openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: this.stack,
                });
                const responseMessage = response?.choices?.[0]?.message?.content;
                console.log('responseMessage', responseMessage);
                if (responseMessage) {
                    this.pushToStack({ role: 'assistant', content: responseMessage });
                }
                return responseMessage;
            }
            catch (error) {
                console.error('Open ai error', error);
            }
        };
        this.openai = new openai_1.default(properties);
        this.stack = [];
    }
}
exports.openAI = new OpenAi({ apiKey: env_1.OPEN_API_KEY, baseURL: 'https://api.proxyapi.ru/openai/v1' });
