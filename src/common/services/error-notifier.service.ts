import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ErrorNotifierService {
    private readonly telegramBotToken = process.env.TELEGRAM_TOKEN;
    private readonly chatId = process.env.TELEGRAM_ID;

    async notify(error: any, context: string = ''): Promise<void> {
        const message = `
❗️*ArticleBackend Xatolik ogohlantirish*
📍 *Context:* ${context}
🧾 *Error:* \`${error?.message || error}\`
`;

        try {
            await axios.post(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
                chat_id: this.chatId,
                text: message,
                parse_mode: 'Markdown',
            });
        } catch (e) {
            console.error('Telegramga yuborilmadi:', e.message);
        }
    }
}
