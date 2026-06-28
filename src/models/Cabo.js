import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Cabo = sequelize.define("Cabo", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        provedorId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        projetoId: {
            type: DataTypes.UUID,
            allowNull: true
        },

        codigo: {
            type: DataTypes.STRING,
            unique: true
        },

        tipo: {
            type: DataTypes.ENUM(
                "AS",
                "ADSS",
                "DROP",
                "BACKBONE"
            )
        },

        fabricante: DataTypes.STRING,

        quantidadeTubos: DataTypes.INTEGER,

        quantidadeFibras: DataTypes.INTEGER,

        status: {
            type: DataTypes.ENUM(
                "PROJETADO",
                "INSTALADO",
                "ROMPIDO",
                "DESATIVADO"
            ),
            defaultValue: "PROJETADO"
        },

        // GeoJSON LineString: { type: "LineString", coordinates: [[lng, lat], ...] }
        geometria: {
            type: DataTypes.JSONB
        }

    }, {
        paranoid: true,
        timestamps: true
    });

    return Cabo;
};
