import { DataTypes } from "sequelize";

export default (sequelize) => {

    const PortaSplitter = sequelize.define("PortaSplitter", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        splitterId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        numero: DataTypes.INTEGER,

        tipo: {
            type: DataTypes.ENUM(
                "ENTRADA",
                "SAIDA"
            )
        },

        status: {
            type: DataTypes.ENUM(
                "LIVRE",
                "OCUPADA"
            ),
            defaultValue: "LIVRE"
        }

    });

    return PortaSplitter;
};