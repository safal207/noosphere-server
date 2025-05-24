const axios = require("axios");

module.exports = async (req, res) => {
  // Разрешаем CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Ответ на preflight-запрос
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const TELEGRAM_TOKEN = "8197581773:AAFTpr4DiNbv4fjAnwfTrGagVJYjzIU_tVk"; // замени, если нужно
  const CHAT_ID = "-1002608013735"; // вставь сюда ID твоей группы (с минусом!)

  const { name, contact, message } = req.body;

  const text = `🔥 Новый сигнал с сайта Noosphere City:\n\n👤 Имя: ${name}\n✉️ Контакт: ${contact}\n💬 Сообщение: ${message}`;

  try {
    const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
    });

    console.log("✔️ Сообщение отправлено в Telegram:", response.data);
    res.status(200).send("OK");
  } catch (error) {
    console.error("❌ Ошибка Telegram:", error.response?.data || error.message);
    res.status(500).send("Telegram failed");
  }
};
