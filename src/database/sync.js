// 🔥 Agora importamos APENAS o loader central de modelos
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

    // 🔥 Usamos o db.sequelize para garantir que os modelos e associações estejam carregados na sincronização
    if (env === "development") {
        await db.sequelize.sync({ alter: true });
    } else {
        await db.sequelize.sync({ alter: false });
    }

    const tables = await db.sequelize.getQueryInterface().showAllTables();

    console.log("\n✓ Tabelas verificadas/criadas no PostgreSQL:");
    console.log(tables);
}

export function ServerDatabase() {
    let attempts = 0;
    const MAX_ATTEMPTS = 10;
    console.log(`iniciando banco de dados...`);
    async function startServer() {
    while (true) {
        try {
            console.log("Tentando conectar ao banco de dados...");

            // 🔥 Autentica usando a instância encapsulada no loader
            await db.sequelize.authenticate();

            console.log("✓ Conexão estabelecida com sucesso!");

            await syncDatabase();

            return true;

        } catch (error) {
            handleDatabaseError(error);

            attempts++;

            if (attempts >= MAX_ATTEMPTS) {
                console.log("❌ Falha definitiva na conexão com o banco. Encerrando API...");
                process.exit(1);
            }

            console.log(
                `Nova tentativa de conexão em ${RECONNECT_DELAY / 1000} segundos... [Tentativa ${attempts}/${MAX_ATTEMPTS}]`
            );

            await sleep(RECONNECT_DELAY);
        }
    }
}
return {
    startServer,
  };
}