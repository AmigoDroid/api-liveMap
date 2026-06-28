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

        // { lat: -5.123, lng: -44.456 }
        localizacao: {
            type: DataTypes.JSONB
        }

    }, { timestamps: false });

    return PontoCabo;
};
