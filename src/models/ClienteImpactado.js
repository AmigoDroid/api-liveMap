import { DataTypes } from "sequelize";

export default (sequelize) => {

    return sequelize.define("ClienteImpactado", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        incidenteId: DataTypes.UUID,

        clienteId: DataTypes.UUID,

        onuId: DataTypes.UUID,

        atendimentoId: DataTypes.UUID

    });

};