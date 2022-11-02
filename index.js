import express from "express"
import * as mqtt from "mqtt"
import cors from "cors"
import {Op} from "sequelize"

import mqttConfig from "./config/mqtt.js"
import database from "./database.js"
import Consumo from "./Consumo.js"

const groupBy = function(array, key) {
    return array.reduce(function(accumulator, currentItem) {
        (accumulator[currentItem[key]] = accumulator[currentItem[key]] || []).push([currentItem.created_at, currentItem.value]);
        return accumulator;
    }, {});
};

database.sync()

const mqttURL = `mqtt://${mqttConfig.host}:${mqttConfig.port}`
const client = mqtt.connect(mqttURL)
const mqttTopic = "990015dd0a89e09a372ab2d7438b778eec6ee2ae/tag"

const server = express();

server.use(cors());
server.listen(3333);

server.get("/", async (request, response) => {
    const dados = await Consumo.findAll({
        attributes:["nome_gato", "created_at", "value"],
    })
    const dadosAgrupados = groupBy(dados, "nome_gato");
    const series = Object.entries(dadosAgrupados).map(([name, data]) => ({
        name, 
        data
    }));
    return response.json(series);
})

client.on('connect', function () {
    client.subscribe(mqttTopic)
})

client.on('message', function (topic, message) {
   if(topic === mqttTopic){
        const dados = JSON.parse(message.toString())
        Consumo.create(dados)
   }
})