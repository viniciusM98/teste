const express = require('express');
const Covid = require('../models/covid')
const router = express.Router();

router.post('/post', async (req, res) => {
    const {country, confirmed, recovered, deaths} = req.body;

    const countryLower = country.toLowerCase();
    console.log(req.body)
    try{
        if(await Covid.findOne({countryLower}))
           return res.status(400).send({error: 'Pais já existente'});

        const data = await Covid.create(req.body);
        return res.send({data});
    }catch(err){
        console.log(err)
        return res.status(400).send({error: 'Publicação inválida!!!'})
    }
})

router.post('/busca', async (req, res) => {
    const {country} = req.body;
    console.log("entrei1")
    try{
        console.log(req.body)
        console.log("entrei2")

        if(await Covid.findOne({country})){
            const resposta = await Covid.findOne({country})
            return res.send({country: resposta.country, confirmed: resposta.confirmed, recovered: resposta.recovered, deaths: resposta.deaths});
        }
        else{
            return res.status(400).send({error: 'Pais nao encontrado'});
        }

    }catch(err){
        console.log(err)
        return res.status(400).send({error: 'Publicação inválida!!!'})
    }
})

module.exports = app =>  app.use('/user', router);