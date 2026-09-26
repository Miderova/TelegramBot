require('dotenv').config();

const { TelegramBot } = require('node-telegram-bot-api'); 

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true }); 

console.log('Погнали! Бот ожил 🚀');

const menu = {
    reply_markup: { 
        keyboard: [
            [{ text: "🔮 Че там по будущему?" }],
            [{ text: "🎰 Крутануть казик" }],
            [{ text: "🥑 Квест на слабо" }],
            [{ text: "📂 Кинь мемчанский" }]
        ],
        resize_keyboard: true
    }
};

bot.onText(/\/start/, (msg) => {
    const name = msg.from.first_name;
    bot.sendMessage(
        msg.chat.id, 
        `Здорово, ${name}! 👋\nЯ тут, чтобы генерировать кринж и помогать тебе страдать фигней. Тыкай кнопки ниже!`, 
        menu
    );
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text || text.startsWith('/')) return;

    if (text === "🔮 Че там по будущему?") {
        const predictions = [
            "Вижу... завтра ты забудешь зарядить мобилу перед выходом. 📱❌",
            "Цыганка нагадала: твой кот реально считает себя главным в доме. 🐈",
            "Тебя ждет серьезное путешествие... от дивана до холодильника. 🚶‍♂️🧀",
            "В твоем коде потеряется скобка. Искать будешь до трех ночи. 💻"
        ];
        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        bot.sendMessage(chatId, randomPrediction);

    } else if (text === "🎰 Крутануть казик") {
        if (Math.random() > 0.5) {
            bot.sendMessage(chatId, "🤑 Изи вин! Выиграл пачку сухарей и респект от местных пацанов.");
        } else {
            bot.sendMessage(chatId, "📉 Минус бабки. Все ушло инвесторам в Дубай, твой рацион на неделю — дошик.");
        }

    } else if (text === "🥑 Квест на слабо") {
        const actions = [
            "Напиши бывшему/бывшей 'купи батон' и удали чат. 🍞",
            "Подойди к зеркалу и скажи 5 раз: 'Я супер-программист'. 🤓",
            "Удали какую-нибудь строчку в коде наугад и попробуй запуститься. 🔥"
        ];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        bot.sendMessage(chatId, `Твое задание:\n\n⚠️ *${randomAction}*`, { parse_mode: 'Markdown' });

    } else if (text.includes("мемчанский")) {
        // Шанс 70% на картинку и 30% на текстовый текстовый арт/анекдот
        if (Math.random() > 0.3) {
            const memes = [
                'https://i.pinimg.com/736x/77/19/00/77190088c8605dde08fdd0b3ab1a5441.jpg',
                'https://i.pinimg.com/736x/2d/65/ae/2d65aecb006cb02e4b0b38619a9114de.jpg',
                'https://i.pinimg.com/736x/35/8f/28/358f286a869c4ebd84d4ef39ed6308c1.jpg',
                'https://i.pinimg.com/736x/e6/8a/c6/e68ac642af84737473645fceea2d54d4.jpg',
                'https://i.pinimg.com/1200x/f2/b1/aa/f2b1aa41ffc10a27dde0d992e8fd463e.jpg',
                'https://i.pinimg.com/736x/e6/c0/06/e6c0061a0af1b08a0c9139151ebed34d.jpg',
                'https://i.pinimg.com/1200x/33/fb/4c/33fb4c6ad866a32fef6daa47edf02243.jpg',
                'https://i.pinimg.com/736x/50/2b/09/502b09ed2f6943b7309e4c18a8616fc4.jpg',
                'https://i.pinimg.com/736x/e6/30/4b/e6304b789879337c3d83be7bb2cab799.jpg',
                'https://i.pinimg.com/736x/ce/66/71/ce66712704bdd13bbf7596655ff15095.jpg'
            ];
            
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            
            bot.sendPhoto(chatId, randomMeme, { caption: "Лови мем экспертного уровня! 🔥" })
                .catch((err) => {
                    console.error('Ошибка отправки:', err.message);
                    bot.sendMessage(chatId, "⚠️ Картинка где-то застряла в интернетах, попробуй еще раз!");
                });
        } else {
            // Те самые текстовые анекдоты из символов
            const darkArts = [
                "```\n   _____\n  |     |\n  |     O\n  |    /|\\\n  |    / \\\n  |\n _|_ \n```\n*Колобок повесился. А нет, это не Колобок...*",
                "```\n   ▲\n  ◤ ◥  🔥\n (  🚌  )\n```\n*Загадка: летит, горит и матерится?*\n*Ответ: Школьный автобус, летящий со скалы.*",
                "```\n  💀  💀  💀\n  |_| |_| |_|\n```\n*Обычный день на кладбище. Тишина, покой и никакого JS.*",
                "```\n  [☠️] -> [💻]\n```\n*Твой дед, когда узнал, что ты пишешь ботов на коллбэках вместо асинхронных функций.*"
            ];
            
            const randomArt = darkArts[Math.floor(Math.random() * darkArts.length)];
            bot.sendMessage(chatId, randomArt, { parse_mode: 'Markdown' });
        }
    } else {
        bot.sendMessage(chatId, `Ты пишешь: "${text}", но лучше жмякни на кнопки! 👇`, menu);
    }
});
