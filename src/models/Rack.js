import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Rack = sequelize.define("Rack", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        popId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        nome: DataTypes.STRING,

        alturaU: {
            type: DataTypes.INTEGER,
            defaultValue: 44
        },

        localizacao: DataTypes.STRING

    }, {
        paranoid: true,
        timestamps: true
    });

    return Rack;
};