require('dotenv').config();

// ФИГУРНЫЕ СКОБКИ { TelegramBot }. Это исправило ошибку
const { TelegramBot } = require('node-telegram-bot-api'); 

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true }); 

console.log('Bot is running...');

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Привет, ${msg.from.first_name}! Я бот на JS. Напиши что-нибудь, и я повторю`);
});

bot.on('message', (msg) => {
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(msg.chat.id, msg.text);
    }
});

bot.onText(/\/keyboard/, (msg) => {
    const keyboard = {
        reply_markup: { 
            keyboard: [
                [{ text: "Кнопка 1" }],
                [{ text: "Кнопка 2" }],
                [{ text: "Кнопка 3" }]
            ],
            resize_keyboard: true
        }
    };
    bot.sendMessage(msg.chat.id, "Выберите действие:", keyboard);
});

bot.on('message', (msg) => {
    if (msg.text === "Кнопка 1") {
        bot.sendMessage(msg.chat.id, "Вы нажали Кнопку 1");
    } else if (msg.text === "Кнопка 2") {
        bot.sendMessage(msg.chat.id, "Вы нажали Кнопку 2");
    } else if (msg.text === "Кнопка 3") {
        bot.sendMessage(msg.chat.id, "Вы нажали Кнопку 3");
    }
});