import { DataTypes } from "sequelize";

export default (sequelize) => {

    const ReservaTecnica = sequelize.define("ReservaTecnica", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        caboId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        tamanhoMetros: {
            type: DataTypes.FLOAT
        },

        localizacao: {
            type: DataTypes.JSONB
        }

    });

    return ReservaTecnica;
};