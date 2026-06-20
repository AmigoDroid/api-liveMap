import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Equipamento = sequelize.define("Equipamento", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        popId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        rackId: DataTypes.UUID,

        tipo: {
            type: DataTypes.ENUM(
                "SWITCH",
                "MIKROTIK",
                "UPS",
                "SERVIDOR",
                "OLT",
                "OUTRO"
            )
        },

        fabricante: DataTypes.STRING,

        modelo: DataTypes.STRING,

        ipGerencia: DataTypes.STRING,

        serial: DataTypes.STRING

    });

    return Equipamento;
};