import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // ← LINHA QUE FALTAVA

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = {};

const files = fs
  .readdirSync(__dirname)
  .filter(file => file !== "index.js" && file.endsWith(".js"));

for (const file of files) {
  try {
    const module = await import(pathToFileURL(path.join(__dirname, file)).href);
    const factory = module.default;

    if (typeof factory !== "function") {
      console.log(`${file}: ❌ NÃO EXPORTA FUNÇÃO`);
      continue;
    }

    const model = factory(sequelize, DataTypes);

    if (!model || !model.name) {
      console.log(`${file}: ❌ MODEL INVÁLIDO`);
      continue;
    }

    models[model.name] = model;
    console.log(`${file}: ✔ OK`);

  } catch (err) {
    console.log(`${file}: ❌ ERRO ->`, err.stack);
  }
}

for (const modelName of Object.keys(models)) {
  if (typeof models[modelName].associate === "function") {
    models[modelName].associate(models);
  }
}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;