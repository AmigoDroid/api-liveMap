import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Tubo = sequelize.define("Tubo", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        caboId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        numero: DataTypes.INTEGER,

        cor: DataTypes.STRING

    });

    return Tubo;
};