import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Fibra = sequelize.define("Fibra", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        tuboId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        numero: DataTypes.INTEGER,

        cor: DataTypes.STRING,

        status: {
            type: DataTypes.ENUM(
                "LIVRE",
                "OCUPADA",
                "RESERVA",
                "ROMPIDA"
            ),
            defaultValue: "LIVRE"
        }

    });

    return Fibra;
};