import { DataTypes } from "sequelize";

export default (sequelize) => {

    const CartaoOlt = sequelize.define("CartaoOlt", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        oltId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        slot: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        modelo: DataTypes.STRING,

        quantidadePortas: {
            type: DataTypes.INTEGER,
            defaultValue: 16
        }

    });

    return CartaoOlt;
};