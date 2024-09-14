"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_vk_bot_api_1 = __importDefault(require("node-vk-bot-api"));
const core_1 = require("./core");
const env_1 = require("constants/env");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// typescript disable
const app = (0, express_1.default)();
const bot = new node_vk_bot_api_1.default({
    token: env_1.TOKEN,
    confirmation: env_1.CONFIRMATION,
});
bot.on(async (ctx) => {
    try {
        await core_1.core.sendMessage(ctx);
    }
    catch (e) {
        console.error(e);
    }
});
bot.command('/clear', async (ctx) => {
    try {
        await core_1.openAI.clearStack();
        await ctx.reply('Все забыл');
    }
    catch (e) {
        console.error(e);
    }
});
app.use(body_parser_1.default.json());
app.post('/confirmation', (req, res) => {
    res.status(200).send(env_1.CONFIRMATION);
});
app.listen(env_1.PORT);
process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
