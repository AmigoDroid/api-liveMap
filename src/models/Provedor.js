import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Provedor = sequelize.define("Provedor", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        nome: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        razaoSocial: {
            type: DataTypes.STRING(255)
        },

        cnpj: {
            type: DataTypes.STRING(20),
            unique: true
        },

        telefone: {
            type: DataTypes.STRING(20)
        },

        email: {
            type: DataTypes.STRING(255),
            unique: true
        },

        endereco: {
            type: DataTypes.TEXT
        },

        licenca: {
            type: DataTypes.STRING
        },

        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    }, {
        paranoid: true,
        timestamps: true
    });

    return Provedor;
};