const knex = require('./knex');

const getAll = () => {
    return knex('companies').select('*')
};

const getOne = (id) => {
    return knex('companies').where('id', id).first();
};

const findMatches = (id) => {
    return knex('matches').where('left_company_id', id).orWhere('right_company_id', id).first();
}

module.exports = {
    getAll,
    getOne,
    findMatches
}

