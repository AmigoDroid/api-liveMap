import { DataTypes } from "sequelize";

export default (sequelize) => {

    const ConexaoFisica = sequelize.define("ConexaoFisica", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        origemTipo: {
            type: DataTypes.ENUM(
                "POP",
                "RACK",
                "OLT",
                "CARTAO_OLT",
                "PORTA_PON",
                "DIO",
                "PORTA_DIO",
                "CABO",
                "TUBO",
                "FIBRA",
                "CAIXA",
                "SPLITTER",
                "CTO",
                "PORTA_CTO",
                "ONU",
                "CLIENTE"
            ),
            allowNull: false
        },

        origemId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        destinoTipo: {
            type: DataTypes.ENUM(
                "POP",
                "RACK",
                "OLT",
                "CARTAO_OLT",
                "PORTA_PON",
                "DIO",
                "PORTA_DIO",
                "CABO",
                "TUBO",
                "FIBRA",
                "CAIXA",
                "SPLITTER",
                "CTO",
                "PORTA_CTO",
                "ONU",
                "CLIENTE"
            ),
            allowNull: false
        },

        destinoId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        tipo: {
            type: DataTypes.ENUM(
                "FUSAO",
                "PATCHCORD",
                "ATENDIMENTO",
                "DISTRIBUICAO",
                "BACKBONE",
                "DERIVACAO"
            ),
            allowNull: false
        },

        descricao: {
            type: DataTypes.TEXT
        },

        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    }, {
        paranoid: true,
        timestamps: true,
        indexes: [
            {
                fields: ["origemTipo", "origemId"]
            },
            {
                fields: ["destinoTipo", "destinoId"]
            }
        ]
    });

    return ConexaoFisica;
};