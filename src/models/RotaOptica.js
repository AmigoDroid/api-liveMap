import { DataTypes } from "sequelize";

export default (sequelize) => {

    const RotaOptica = sequelize.define("RotaOptica", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        atendimentoId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        ordem: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        tipoElemento: {
            type: DataTypes.STRING
        },

        elementoId: {
            type: DataTypes.UUID
        }

    });

    return RotaOptica;
};