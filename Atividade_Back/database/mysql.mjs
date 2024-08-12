import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgresql://user_db:TSI5ro00BBTBLNsrJ6r89zEmVRbzCVSo@dpg-cqsvp0t6l47c73a878pg-a/pizzaria_btsr");
//const sequelize = new Sequelize("mysql://root@localhost:3306/dewii2024node");
sequelize.sync();

export default sequelize;

