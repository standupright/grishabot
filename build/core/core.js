"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
const openai_1 = require("./openai");
class Core {
    constructor() {
        this.sendMessage = async (ctx) => {
            console.log('ctx', ctx);
            const message = ctx.message.text;
            const isValidMessage = message?.includes('Гриша');
            if (!isValidMessage || !message)
                return;
            const messageFromBot = message.replace('Гриша', '');
            const reply = await openai_1.openAI.sendMessageToOpenAi(messageFromBot);
            const messageToSend = reply || 'Затрудняюсь ответить';
            await ctx.reply(messageToSend);
        };
    }
}
exports.core = new Core();
