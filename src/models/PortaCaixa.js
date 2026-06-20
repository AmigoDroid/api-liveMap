import { DataTypes } from "sequelize";

export default (sequelize) => {

    const PortaCaixa = sequelize.define("PortaCaixa", {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        caixaId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        numero: DataTypes.INTEGER,

        tipo: {
            type: DataTypes.ENUM(
                "ENTRADA",
                "SAIDA"
            )
        }

    });

    return PortaCaixa;
};