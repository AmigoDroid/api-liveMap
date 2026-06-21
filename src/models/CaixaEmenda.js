import { DataTypes } from "sequelize";

export default (sequelize) => {

    const CaixaEmenda = sequelize.define("CaixaEmenda", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        codigo: {
            type: DataTypes.STRING,
            unique: true
        },

        tipo: {
            type: DataTypes.ENUM(
                "CEO",
                "CTO",
                "CAIXA_PASSAGEM"
            )
        },

        localizacao: {
            type: DataTypes.JSONB
        }

    });

    return CaixaEmenda;
};