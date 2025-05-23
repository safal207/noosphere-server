const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TELEGRAM_TOKEN = '8197581773:AAFTpr4DiNbv4fjAnwfTrGagVJYjzIU_tVk';
const CHAT_ID = '501665369';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, contact, message } = req.body;
  const text = `🔥 Новый сигнал с сайта Noosphere City:\n\n👤 Имя: ${name}\n✉️ Контакт: ${contact}\n💬 Сообщение: ${message}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
    });

    res.status(200).send('OK');
  } catch (err) {
    console.error('Ошибка отправки в Telegram:', err.message);
    res.status(500).send('Ошибка при отправке');
  }
};

module.exports = handler;
