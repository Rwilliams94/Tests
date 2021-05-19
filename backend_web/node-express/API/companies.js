const express = require("express");

const router = express.Router();

const queries = require('../db/queries')

// middlewares

function isValidCompany(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next (new Error('invalid ID'));
}

// routes

router.get('/', async (req, res, next) => {
    try {
        const companies = await queries.getAll();
        res.json(companies);
    } catch {
        next()
    }
  
});

router.get('/:id', isValidCompany, async (req, res, next) => {

    try {
        const company = await queries.getOne(req.params.id)
        if(company) {
            res.json(company);
        } else {
            res.status(404).json({message: "company not found"})
            next()
        }
        
    } catch {
        next()
    }
  
});

router.get('/matches/:id', isValidCompany, async (req, res, next) => {
     
    const matchId = req.params.id

    try {
        
        const matchRow = await queries.findMatches(matchId)
        if(matchRow) {
            const matchArray = Object.values(matchRow).slice(1).filter(id => id !== Number(matchId))
            const match = await queries.getOne(matchArray[0])
            res.json(match)
        } else {
            res.json({message: "invalid match - no matches found"})
        }

    } catch {
        next()
    }
});

module.exports = router;