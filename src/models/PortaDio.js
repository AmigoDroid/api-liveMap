import { DataTypes } from "sequelize";

export default (sequelize) => {

    const PortaDio = sequelize.define("PortaDio", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        dioId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        numero: DataTypes.INTEGER,

        status: {
            type: DataTypes.ENUM(
                "LIVRE",
                "OCUPADA"
            ),
            defaultValue: "LIVRE"
        }

    });

    return PortaDio;
};