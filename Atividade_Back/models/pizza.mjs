import sequelize from "../database/mysql.mjs";
import { DataTypes } from "sequelize";

const Pizza = sequelize.define('Pizza', {
    nome: DataTypes.STRING,
    tamanho: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    nota: DataTypes.FLOAT,
    vegetariana: DataTypes.STRING
});

export default Pizza;