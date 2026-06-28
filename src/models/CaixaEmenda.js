import { DataTypes } from "sequelize";

export default (sequelize) => {

    const CaixaEmenda = sequelize.define("CaixaEmenda", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        provedorId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        codigo: {
            type: DataTypes.STRING,
            unique: true
        },

        tipo: {
            type: DataTypes.ENUM("CEO", "CTO", "CAIXA_PASSAGEM")
        },

        // { lat: -5.123, lng: -44.456 }
        localizacao: {
            type: DataTypes.JSONB
        }

    }, { paranoid: true, timestamps: true });

    return CaixaEmenda;
};
