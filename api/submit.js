export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  // Honeypot check
  const { name, contact, message, website } = req.body || {};
  if (website) return res.status(200).send('OK'); // Просто игнорируем спам

  const token = process.env.TG_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) return res.status(500).send('Server misconfiguration');

  const text =
    `🔥 Новый отклик из Noosphere City:%0A` +
    `👤 Имя: ${name}%0A` +
    `✉️ Контакт: ${contact}%0A` +
    `💬 Сообщение: ${message}`;

  try {
    await fetch(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`
    );
    res.status(200).send('OK');
  } catch (err) {
    console.error('Telegram error:', err);
    res.status(502).send('Telegram failed');
  }
}
