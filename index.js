const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TELEGRAM_TOKEN = '8197581773:AAFTpr4DiNbv4fjAnwfTrGagVJYjzIU_tVk';
const CHAT_ID = '501665369';

app.post('/submit', async (req, res) => {
  const { name, contact, message } = req.body;
  const text = `🔥 Новый сигнал с сайта Noosphere City:\n\n👤 Имя: ${name}\n✉️ Контакт: ${contact}\n💬 Сообщение: ${message}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text
    });
    res.status(200).send('OK');
  } catch (err) {
    res.status(500).send('Ошибка');
  }
});

module.exports = app;
