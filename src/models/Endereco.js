import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Endereco = sequelize.define("Endereco", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        clienteId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        cep: DataTypes.STRING(10),

        logradouro: DataTypes.STRING,

        numero: DataTypes.STRING,

        complemento: DataTypes.STRING,

        bairro: DataTypes.STRING,

        cidade: DataTypes.STRING,

        estado: DataTypes.STRING(2),

        latitude: DataTypes.DOUBLE,

        longitude: DataTypes.DOUBLE

    }, {
        paranoid: true,
        timestamps: true
    });

    return Endereco;
};