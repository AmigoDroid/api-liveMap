import { DataTypes } from "sequelize";

export default (sequelize) => {

    return sequelize.define("CapacidadePON", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        portaPonId: {
            type: DataTypes.UUID,
            unique: true
        },

        clientes: DataTypes.INTEGER,

        limite: DataTypes.INTEGER,

        ocupacao: DataTypes.FLOAT

    });

};