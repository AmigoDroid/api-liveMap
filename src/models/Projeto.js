import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Projeto = sequelize.define("Projeto", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        provedorId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },

        descricao: {
            type: DataTypes.TEXT
        },

        status: {
            type: DataTypes.ENUM(
                "PLANEJAMENTO",
                "EM_ANDAMENTO",
                "CONCLUIDO",
                "CANCELADO"
            ),
            defaultValue: "PLANEJAMENTO"
        },

        dataInicio: {
            type: DataTypes.DATEONLY
        },

        dataPrevistaConclusao: {
            type: DataTypes.DATEONLY
        },

        dataConclusao: {
            type: DataTypes.DATEONLY
        }

    }, {
        paranoid: true,
        timestamps: true
    });

    return Projeto;
};
