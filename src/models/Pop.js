import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Pop = sequelize.define("Pop", {

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
            type: DataTypes.STRING(50),
            unique: true
        },

        nome: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        endereco: {
            type: DataTypes.TEXT
        },

        latitude: {
            type: DataTypes.DOUBLE
        },

        longitude: {
            type: DataTypes.DOUBLE
        },

        status: {
            type: DataTypes.ENUM(
                "ATIVO",
                "MANUTENCAO",
                "DESATIVADO"
            ),
            defaultValue: "ATIVO"
        }

    }, {
        paranoid: true,
        timestamps: true
    });

    return Pop;
};