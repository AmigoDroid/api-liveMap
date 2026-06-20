import { DataTypes } from "sequelize";

export default (sequelize) => {

    return sequelize.define("TopologiaCache", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        clienteId: DataTypes.UUID,

        rota: {
            type: DataTypes.JSONB
        },

        perdaTotalDb: DataTypes.FLOAT

    });

};