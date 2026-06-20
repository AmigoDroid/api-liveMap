import { DataTypes } from "sequelize";

export default (sequelize) => {

    return sequelize.define("IncidenteRede", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        tipo: {
            type: DataTypes.ENUM(
                "ROMPIMENTO",
                "FALHA_OLT",
                "FALHA_SPLITTER",
                "FALHA_CTO",
                "MANUTENCAO"
            )
        },

        elementoTipo: {
            type: DataTypes.STRING
        },

        elementoId: {
            type: DataTypes.UUID
        },

        descricao: DataTypes.TEXT,

        status: {
            type: DataTypes.ENUM(
                "ABERTO",
                "EM_ANALISE",
                "RESOLVIDO"
            ),
            defaultValue: "ABERTO"
        }

    });

};