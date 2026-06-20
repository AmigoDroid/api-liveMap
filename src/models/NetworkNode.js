import { DataTypes } from "sequelize";

export default (sequelize) => {

    const NetworkNode = sequelize.define("NetworkNode", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        referenciaId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        nome: {
            type: DataTypes.STRING
        },

        latitude: {
            type: DataTypes.DOUBLE
        },

        longitude: {
            type: DataTypes.DOUBLE
        }

    }, {
        timestamps: true
    });

    return NetworkNode;
};