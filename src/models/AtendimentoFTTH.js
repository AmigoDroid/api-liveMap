import { DataTypes } from "sequelize";

export default (sequelize) => {

    const AtendimentoFTTH = sequelize.define("AtendimentoFTTH", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        clienteId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        onuId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        portaCtoId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        portaPonId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        fibraAtendimentoId: {
            type: DataTypes.UUID
        },

        status: {
            type: DataTypes.ENUM(
                "ATIVO",
                "SUSPENSO",
                "CANCELADO"
            ),
            defaultValue: "ATIVO"
        }

    });

    return AtendimentoFTTH;
};