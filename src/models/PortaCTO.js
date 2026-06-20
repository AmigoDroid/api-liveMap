import { DataTypes } from "sequelize";

export default (sequelize) => {

    const PortaCTO = sequelize.define("PortaCTO", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        ctoId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                "LIVRE",
                "OCUPADA",
                "RESERVA",
                "DEFEITO"
            ),
            defaultValue: "LIVRE"
        }

    });

    return PortaCTO;
};