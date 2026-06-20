import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Cabo = sequelize.define("Cabo", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        projetoId: {
            type: DataTypes.UUID,
            allowNull: false
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

        geometria: {
            type: DataTypes.GEOMETRY(
                "LINESTRING",
                4326
            )
        }

    });

    return Cabo;
};