import { DataTypes } from "sequelize";

export default (sequelize) => {

    const EventoRede = sequelize.define("EventoRede", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        entidadeTipo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        entidadeId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        evento: {
            type: DataTypes.STRING,
            allowNull: false
        },

        descricao: {
            type: DataTypes.TEXT
        },

        usuarioId: {
            type: DataTypes.UUID
        },

        dadosAntes: {
            type: DataTypes.JSONB
        },

        dadosDepois: {
            type: DataTypes.JSONB
        }

    }, {
        timestamps: true
    });

    return EventoRede;
};