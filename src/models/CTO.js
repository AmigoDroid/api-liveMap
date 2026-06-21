import { DataTypes } from "sequelize";

export default (sequelize) => {

    const CTO = sequelize.define("CTO", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        codigo: {
            type: DataTypes.STRING,
            unique: true
        },

        nome: DataTypes.STRING,

        capacidade: {
            type: DataTypes.INTEGER,
            defaultValue: 16
        },

        status: {
            type: DataTypes.ENUM(
                "ATIVA",
                "LOTADA",
                "MANUTENCAO"
            ),
            defaultValue: "ATIVA"
        },

        localizacao: {
            type:DataTypes.JSONB
        }

    });

    return CTO;
};