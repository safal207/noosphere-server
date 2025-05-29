export default async function handler(req, res) {
  // 1. CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  // 2. Чтение секретов из ENV
  const token  = process.env.TG_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) {
    console.error('Missing TG_TOKEN or CHAT_ID in env');
    return res.status(500).send('Server misconfiguration');
  }

  try {
    const { name, contact, message } = req.body;
    const text =
      `🔥 Новый сигнал с сайта Noosphere City:\n\n` +
      `👤 Имя: ${name}\n` +
      `✉️ Контакт: ${contact}\n` +
      `💬 Сообщение: ${message}`;

    // 3. Отправка в Telegram
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    res.status(200).send('OK');
  } catch (err) {
    console.error('Telegram error:', err);
    res.status(502).send('Telegram failed');
  }
}
