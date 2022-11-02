import Sequelize from "sequelize"

import database from "./database.js"


const Consumo = database.define("Consumo", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome_gato:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    value:{
        type: Sequelize.DECIMAL,
        allowNull: false,
    }

});

export default Consumo