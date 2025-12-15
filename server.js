const TelegramBot = require('node-telegram-bot-api');

const token = "8201836607:AAGfGEe9g7LdhqhMNNk1NQb_3XuyCIiWm4s";
const ADMIN_CHAT_ID = 1786112880;
const bot = new TelegramBot(token, { polling: true });
    const userState = {};

bot.onText(/\/start/, (msg) => {

  // console.log(msg);
    //keyboard options
    bot.sendMessage(msg.chat.id, "Welcome please choose a command:", 
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "/register", callback_data: "register"} ],
                [{text: "/about", callback_data: "about"},
                     {text: "/help", callback_data: "help"}] 
            ],
        }
    }
);

});



    

bot.on('callback_query', (callbackQuery) => {
 const chatId = callbackQuery.message.chat.id;
 const data = callbackQuery.data;

 // REMOVE loading animation
  bot.answerCallbackQuery(callbackQuery.id);

  if (data === 'register') {
    bot.sendMessage(chatId, 'Please choose your grade:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '11', callback_data: 'grade_11' },
            { text: '12', callback_data: 'grade_12' }
          ],
          [
            { text: '11_and_12', callback_data: 'both_11_and_12' }
          ]
        ]
      }
    });
} else if (data === 'grade_11') {
    userState[chatId] = { step: "ASK_NAME",grade: '11' };
    bot.sendMessage(chatId, 'please enter your name:');
} else if (data === 'grade_12') {
  userState[chatId] = { step: "ASK_NAME",grade: '12' };
  bot.sendMessage(chatId, 'please enter your name:');
} else if (data === 'both_11_and_12') {
  userState[chatId] = { step: "ASK_NAME",grade: 'Both 11 AND 12' };
  bot.sendMessage(chatId, 'please enter your name:');
    } else if (data === "help") {
        bot.sendMessage(chatId, "step1, step2");
    }  else if (data === "about") {
        bot.sendMessage(chatId, "this online course for grade 11 and 12");
    }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!userState[chatId]) return;

  switch (userState[chatId].step) {
    case 'ASK_NAME':
      userState[chatId].name = text;
      userState[chatId].step = 'ASK_AGE';
      bot.sendMessage(chatId, 'How old are you?');
      break;

    case 'ASK_AGE':
      userState[chatId].age = text;
      userState[chatId].step = 'ASK_PHOTO';
      bot.sendMessage(
        chatId,
        `Thanks! Name: ${userState[chatId].name}, Age: ${userState[chatId].age} Please pay to 09xxxxxxxx(telebirr) or 1000xxxxxxxxxxx(cbe) and send the screenshot of the reciept`
      );
      // delete userState[chatId]; // reset
      break;
  }
});

bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;

  if (!userState[chatId]) return;
  if (userState[chatId].step !== 'ASK_PHOTO') return;

  // Get highest resolution photo
  const photo = msg.photo[msg.photo.length - 1];
  const fileId = photo.file_id;

  try {
    const filePath = await bot.downloadFile(fileId, './photos');

    userState[chatId].photo = filePath;

    // console.log(userState);
    const username = msg.from.username;
    const link = username
    ? `@${username}`
    : 'No username';

     // Send photo to admin
  await bot.sendPhoto(ADMIN_CHAT_ID, fileId, {
    caption:
      `🆕 New Registration\n\n` +
      `👤 Name: ${userState[chatId].name}\n` +
      `🎂 Age: ${userState[chatId].age}\n` +
      `👤 Grade: ${userState[chatId].grade}\n` +
      `🆔 Username: ${link}\n` +
      `🆔 User ID: ${chatId}`
  });

    bot.sendMessage(
      chatId,
      `✅ Registration complete!\n\n You will soon be added to the channel once your payment check is confirmed.\n\nName: ${userState[chatId].name}\nAge: ${userState[chatId].age}`
    );


  } catch (err) {
    bot.sendMessage(chatId, '❌ Failed to save photo. Please try again.');
    console.error(err);
  }
});


// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, `Thanks! Name: ${userState[chatId].name}, Age: ${userState[chatId].age}`);
// });

console.log('Bot is running...');

