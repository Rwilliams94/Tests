const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

// middlewares

// make sure input is a valid ID

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error("invalid ID"));
}

// routes

router.get("/", async (req, res, next) => {
  try {
    const companies = await queries.getAll();
    res.json(companies);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

router.get("/:id", isValidId, async (req, res, next) => {
  try {
    // get company using ID

    const company = await queries.getOne(req.params.id);

    // if company exists, return the details

    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: "company not found" });
      next();
    }
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

router.get("/matches/:id", isValidId, async (req, res, next) => {
  const companyId = req.params.id;

  try {
    // search match db

    const matchRow = await queries.findMatches(companyId);

    // if match exists, select the matching company and get details

    if (matchRow) {
      const matchArray = Object.values(matchRow)
        .slice(1)
        .filter((id) => id !== Number(companyId));
      const match = await queries.getOne(matchArray[0]);
      res.json(match);
    } else {
      res.json({ message: "invalid match - no matches found" });
    }
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

module.exports = router;
