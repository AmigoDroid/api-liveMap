import { DataTypes } from "sequelize";

export default (sequelize) => {

    const PontoCabo = sequelize.define("PontoCabo", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        caboId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        ordem: DataTypes.INTEGER,

        localizacao: {
            type: DataTypes.JSONB
        }

    });

    return PontoCabo;
};