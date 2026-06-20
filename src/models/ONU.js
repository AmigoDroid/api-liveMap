import { DataTypes } from "sequelize";

export default (sequelize) => {

    const ONU = sequelize.define("ONU", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        clienteId: {
            type: DataTypes.UUID
        },

        serial: {
            type: DataTypes.STRING,
            unique: true
        },

        fabricante: DataTypes.STRING,

        modelo: DataTypes.STRING,

        mac: DataTypes.STRING,

        firmware: DataTypes.STRING,

        status: {
            type: DataTypes.ENUM(
                "ONLINE",
                "OFFLINE",
                "BLOQUEADA"
            ),
            defaultValue: "OFFLINE"
        }

    });

    return ONU;
};