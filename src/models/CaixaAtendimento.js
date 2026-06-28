import { DataTypes } from "sequelize";

export default (sequelize) => {

    const CaixaAtendimento = sequelize.define("CaixaAtendimento", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        provedorId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        codigo: DataTypes.STRING,

        // { lat: -5.123, lng: -44.456 }
        localizacao: {
            type: DataTypes.JSONB
        }

    }, { paranoid: true, timestamps: true });

    return CaixaAtendimento;
};
