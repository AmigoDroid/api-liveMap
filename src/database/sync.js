import sequelize from "../config/database.js";
import db from "../models/index.js";

const RECONNECT_DELAY = 5000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function handleDatabaseError(error) {

    console.error("\n=================================");
    console.error("ERRO AO INICIALIZAR O BANCO");
    console.error("=================================\n");

    console.error(`Erro: ${error.name}`);

    if (error.parent?.message) {
        console.error("\nErro original:");
        console.error(error.parent.message);
    }

    console.error("\n=================================\n");
}

async function syncDatabase() {

    const env = process.env.NODE_ENV || "development";

    console.log(`Ambiente: ${env}`);

    if (env === "development") {
        await sequelize.sync({ alter: true });
    } else {
        await sequelize.sync({ alter: false });
    }

    const tables = await sequelize.getQueryInterface().showAllTables();

    console.log("\n✓ Tabelas criadas:");
    console.log(tables);
}

export async function initializeDatabase() {

    let attempts = 0;
    const MAX_ATTEMPTS = 10;

    while (true) {

        try {

            console.log("Tentando conectar ao banco...");

            await sequelize.authenticate();

            console.log("✓ Banco conectado");

            await syncDatabase();

            return true;

        } catch (error) {

            handleDatabaseError(error);

            attempts++;

            if (attempts >= MAX_ATTEMPTS) {
                console.log("❌ Falha definitiva na conexão com o banco.");
                process.exit(1);
            }

            console.log(
                `Nova tentativa em ${RECONNECT_DELAY / 1000} segundos...`
            );

            await sleep(RECONNECT_DELAY);
        }
    }
}