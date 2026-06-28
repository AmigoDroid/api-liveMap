import { DataTypes } from "sequelize";

export default (sequelize) => {

    const CTO = sequelize.define("CTO", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        provedorId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        codigo: {
            type: DataTypes.STRING,
            unique: true
        },

        nome: DataTypes.STRING,

        capacidade: {
            type: DataTypes.INTEGER,
            defaultValue: 16
        },

        status: {
            type: DataTypes.ENUM("ATIVA", "LOTADA", "MANUTENCAO"),
            defaultValue: "ATIVA"
        },

        // { lat: -5.123, lng: -44.456 }
        localizacao: {
            type: DataTypes.JSONB
        }

    }, { paranoid: true, timestamps: true });

    return CTO;
};
