import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Dio = sequelize.define("Dio", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        popId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        rackId: {
            type: DataTypes.UUID
        },

        nome: DataTypes.STRING,

        quantidadePortas: {
            type: DataTypes.INTEGER,
            defaultValue: 24
        }

    });

    return Dio;
};