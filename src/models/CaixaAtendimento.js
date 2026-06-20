import { DataTypes } from "sequelize";

export default (sequelize) => {

    const CaixaAtendimento = sequelize.define("CaixaAtendimento", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        codigo: DataTypes.STRING,

        localizacao: {
            type: DataTypes.GEOMETRY(
                "POINT",
                4326
            )
        }

    });

    return CaixaAtendimento;
};