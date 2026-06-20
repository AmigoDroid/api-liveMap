import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Fusao = sequelize.define("Fusao", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        fibraOrigemId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        fibraDestinoId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        caixaId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        perdaDb: {
            type: DataTypes.FLOAT,
            defaultValue: 0.05
        }

    });

    return Fusao;
};