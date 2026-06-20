import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Splitter = sequelize.define("Splitter", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        codigo: {
            type: DataTypes.STRING,
            unique: true
        },

        caixaId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        tipo: {
            type: DataTypes.ENUM(
                "1X2",
                "1X4",
                "1X8",
                "1X16",
                "1X32",
                "1X64"
            ),
            allowNull: false
        },

        perdaDb: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        fabricante: DataTypes.STRING,

        status: {
            type: DataTypes.ENUM(
                "ATIVO",
                "RESERVA",
                "DEFEITO"
            ),
            defaultValue: "ATIVO"
        }

    });

    return Splitter;
};