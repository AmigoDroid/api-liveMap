import { DataTypes } from "sequelize";

export default (sequelize) => {

    return sequelize.define("ImpactoRede", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        incidenteId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        elementoTipo: DataTypes.STRING,

        elementoId: DataTypes.UUID,

        impacto: {
            type: DataTypes.ENUM(
                "CRITICO",
                "ALTO",
                "MEDIO",
                "BAIXO"
            )
        }

    });

};