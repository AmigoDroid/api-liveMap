import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Olt = sequelize.define("Olt", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        popId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        rackId: {
            type: DataTypes.UUID
        },

        nome: DataTypes.STRING,

        fabricante: DataTypes.STRING,

        modelo: DataTypes.STRING,

        serial: {
            type: DataTypes.STRING,
            unique: true
        },

        ipGerencia: DataTypes.STRING,

        firmware: DataTypes.STRING,

        status: {
            type: DataTypes.ENUM(
                "ONLINE",
                "OFFLINE",
                "MANUTENCAO"
            ),
            defaultValue: "ONLINE"
        }

    });

    return Olt;
};