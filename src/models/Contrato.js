import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Contrato = sequelize.define("Contrato", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        clienteId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        codigoContrato: {
            type: DataTypes.STRING(50),
            unique: true
        },

        dataAssinatura: {
            type: DataTypes.DATE
        },

        dataAtivacao: {
            type: DataTypes.DATE
        },

        dataCancelamento: {
            type: DataTypes.DATE
        },

        status: {
            type: DataTypes.ENUM(
                "PENDENTE",
                "ATIVO",
                "SUSPENSO",
                "CANCELADO"
            ),
            defaultValue: "PENDENTE"
        }

    }, {
        paranoid: true,
        timestamps: true
    });

    return Contrato;
};