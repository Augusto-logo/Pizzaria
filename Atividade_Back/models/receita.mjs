import sequelize from "../database/mysql.mjs";
import { DataTypes } from "sequelize";
import Pizza from "./pizza.mjs";

const Receita = sequelize.define('Receita', {
    ingrediente: DataTypes.STRING,
    modoPreparo: DataTypes.STRING,
    tempoPreparo: DataTypes.STRING,
    temperaturaForno: DataTypes.STRING
});

Receita.belongsTo(Pizza);

export default Receita;
