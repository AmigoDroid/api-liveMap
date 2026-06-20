import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Servico = sequelize.define("Servico", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        contratoId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        nome: {
            type: DataTypes.STRING
        },

        downloadMbps: {
            type: DataTypes.INTEGER
        },

        uploadMbps: {
            type: DataTypes.INTEGER
        },

        valorMensal: {
            type: DataTypes.DECIMAL(10,2)
        },

        dataAtivacao: {
            type: DataTypes.DATE
        },

        status: {
            type: DataTypes.ENUM(
                "ATIVO",
                "SUSPENSO",
                "CANCELADO"
            ),
            defaultValue: "ATIVO"
        }

    }, {
        paranoid: true,
        timestamps: true
    });

    return Servico;
};