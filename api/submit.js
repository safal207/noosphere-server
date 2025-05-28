// api/submit.js
import axios from 'axios';

require('dotenv').config();  // ← подтянет переменные из .env.local

const TELEGRAM_TOKEN = process.env.TG_TOKEN;
const CHAT_ID         = process.env.CHAT_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const { name, contact, message } = req.body;
  const text = `🔥 Новый отклик из Noosphere City:\n\n👤 Имя: ${name}\n✉️ Контакт: ${contact}\n💬 Сообщение: ${message}`;

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      { chat_id: CHAT_ID, text }
    );
    if (response.data.ok) {
      return res.status(200).json({ ok: true });
    } else {
      throw new Error('Telegram API returned error');
    }
  } catch (err) {
    console.error('Telegram send error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
