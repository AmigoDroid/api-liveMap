import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Cliente = sequelize.define("Cliente", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        provedorId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },

        cpfCnpj: {
            type: DataTypes.STRING(20),
            unique: true
        },

        telefone: {
            type: DataTypes.STRING(20)
        },

        whatsapp: {
            type: DataTypes.STRING(20)
        },

        email: {
            type: DataTypes.STRING
        },

        passwordHash: {
            type: DataTypes.TEXT
        },

        observacoes: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM(
            "PRE_CADASTRO",
            "VIAVEL",
            "AGUARDANDO_INSTALACAO",
            "ATIVO",
            "SUSPENSO",
            "INADIMPLENTE",
            "CANCELADO"
             ),
            defaultValue: "PRE_CADASTRO"
    },

    tipoPessoa: {
        type: DataTypes.ENUM(
            "FISICA",
            "JURIDICA"
        ),
        allowNull: false
    },

    dataNascimento: DataTypes.DATE,

    observacoes: DataTypes.TEXT,

    codigoExterno: DataTypes.STRING

    }, {
        paranoid: true,
        timestamps: true
    });

    return Cliente;
};