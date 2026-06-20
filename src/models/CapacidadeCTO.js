import { DataTypes } from "sequelize";

export default (sequelize) => {

    return sequelize.define("CapacidadeCTO", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        ctoId: {
            type: DataTypes.UUID,
            unique: true
        },

        portasTotal: DataTypes.INTEGER,

        portasOcupadas: DataTypes.INTEGER,

        portasLivres: DataTypes.INTEGER,

        ocupacao: DataTypes.FLOAT

    });

};