


const buildMakeMatch = require('./match');
const matchSchema = require('./match-schema').matchSchema;
const matchUpdateSchema = require('./match-schema').matchUpdateSchema;
const matchValidator = require('../validator')(matchSchema);
const matchUpdateValidator = require('../validator')(matchUpdateSchema);


const makeMatch = buildMakeMatch(matchValidator);
const makeUpdateMatch = buildMakeMatch(matchUpdateValidator);

module.exports = {
  makeMatch,
  makeUpdateMatch
};
