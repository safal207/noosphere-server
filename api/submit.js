// file: api/submit.js
import fetch from 'node-fetch';  // если у вас Node.js 20+, можно использовать глобальный fetch

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST allowed');
    return;
  }

  const { name, contact, message } = req.body;
  const text = `🔥 Новый отклик из Noosphere City:%0A%0A`
             + `👤 Имя: ${name}%0A`
             + `✉️ Контакт: ${contact}%0A`
             + `💬 Сообщение: ${message}`;

  // Читаем секреты из ENV
  const token  = process.env.TG_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) {
    console.error('Missing TG_TOKEN or CHAT_ID in environment');
    res.status(500).send('Server misconfiguration');
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Telegram error:', err);
    res.status(502).send('Telegram failed');
  }
}
