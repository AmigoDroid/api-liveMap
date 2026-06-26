import { enviarEmail } from "./mail.js";
import { enviarSMS } from "./sms.js";

class NotificationManager {

    constructor() {

        this.queue = [];
        this.running = false;
        this.processing = false;
    }

    start() {

        if (this.running) return;

        this.running = true;

        this.loop();
    }

    stop() {
        this.running = false;
    }

    async loop() {

        while (this.running) {

            if (this.processing || this.queue.length === 0) {
                await this.sleep(1000);
                continue;
            }

            this.processing = true;

            const job = this.queue.shift();

            try {

                switch (job.tipo) {

                    case "EMAIL":
                        await enviarEmail(job.payload);
                        break;

                    case "SMS":
                        await enviarSMS(job.payload);
                        break;

                }

                console.log(`✔ ${job.tipo} enviado`);

            } catch (err) {

                console.error(`Erro ao enviar ${job.tipo}`);

                if (job.tentativas < 5) {

                    job.tentativas++;

                    this.queue.push(job);

                    console.log(`Reagendado (${job.tentativas})`);

                }

            }

            this.processing = false;

        }

    }

    email(payload) {

        this.queue.push({

            tipo: "EMAIL",
            payload,
            tentativas: 0

        });

    }

    sms(payload) {

        this.queue.push({

            tipo: "SMS",
            payload,
            tentativas: 0

        });

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

export default new NotificationManager();