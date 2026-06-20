import { DataTypes } from "sequelize";

export default (sequelize) => {

    const PortaPon = sequelize.define("PortaPon", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        cartaoId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        vlan: DataTypes.INTEGER,

        potenciaTx: DataTypes.FLOAT,

        potenciaRx: DataTypes.FLOAT,

        capacidadeClientes: {
            type: DataTypes.INTEGER,
            defaultValue: 128
        },

        clientesAtivos: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        status: {
            type: DataTypes.ENUM(
                "LIVRE",
                "OCUPADA",
                "MANUTENCAO"
            ),
            defaultValue: "LIVRE"
        }

    });

    return PortaPon;
};