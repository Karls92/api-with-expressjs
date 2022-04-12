const { Router } = require('express');
const router = Router();

const data = require('../data/series.json');
const counter = require('../data/counters.json');

router.get("/api/series", (req, res) => {
    try {
        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/api/series/:id", (req, res) => {
    const { id } = req.params;
    try {
        const getSerie = data.find(serie => serie.id == id);
        if (getSerie) {
            res.json(getSerie);
        } else {
            res.json({"error": "data not found"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/api/series", (req, res) => {
    const { title, sinopsis, genres, created_by, cast, episodes, first_emision, rating } = req.body;
    
    try {
        if(title && sinopsis && genres && created_by && cast && episodes && first_emision && rating)
        {
            const id = counter.series_primary_key;
            const newSerie = {"id": id, ...req.body}
            data.push(newSerie);
            counter.series_primary_key += 1;
            res.json(newSerie);
        }
        else{
            res.json({"error": "you didn't add all params in the request"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/api/series/:id", (req, res) => {
    const { id } = req.params;
    const { title, sinopsis, genres, created_by, cast, episodes, first_emision, rating } = req.body;
    try {
        if(title && sinopsis && genres && created_by && cast && episodes && first_emision && rating) {
            data.forEach(serie => {
                if(serie.id == id){
                    serie.title = title;
                    serie.sinopsis = sinopsis;
                    serie.genres = genres;
                    serie.created_by = created_by;
                    serie.cast = cast;
                    serie.episodes = episodes;
                    serie.first_emision = first_emision;
                    serie.rating = rating;
                }
            });
            res.json({"id": id, ...req.body});
        }
        else{
            res.json({"error": "you didn't add all params in the request"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/api/series/:id", (req, res) => {
    const { id } = req.params
    try {
        const index = data.findIndex(serie => serie.id == id);
        if (index){
            const serieDeleted = data.splice(index, 1);
            res.json(serieDeleted);
        }
        else{
            res.json({"error": "data not found"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;