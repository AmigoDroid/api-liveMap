import { DataTypes } from "sequelize";

export default (sequelize) => {

    const NetworkLink = sequelize.define("NetworkLink", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        origemNodeId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        destinoNodeId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        tipo: {
            type: DataTypes.ENUM(
                "FIBRA",
                "PATCHCORD",
                "FUSAO",
                "CLIENTE"
            )
        }

    }, {
        timestamps: true
    });

    return NetworkLink;
};