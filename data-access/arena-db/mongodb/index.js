const Arena = require('../../../db/mongodb/models/arena');
const serialize = require('./serializer');
const makeArena = require('../../../models/arena').makeArena;
const makeUpdateArena = require('../../../models/arena').makeUpdateArena;
const errorFormatter = require('./errorFormatter');

function listArenas(httpQuery){
  const { pageQuery, query } = httpQuery;
  const queryObj = JSON.parse(query ?? "{}");

  let paginationParams = [
    queryObj,
    typeof pageQuery === "string" ? JSON.parse(pageQuery ?? "{}") : pageQuery,
  ];

  return Arena.paginate(...paginationParams)
    .then((result) => {
      const { docs, ...pagination } = result;
      return {
        pagination,
        arenas: serialize(docs),
      };
    })
    .catch(errorFormatter);
}

function findArenaBy(prop, val){
  if(prop === 'id') prop = '_id';
  return Arena.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findArenaById(id){
  return Arena.findById(id).then(serialize).catch(errorFormatter);
}

async function addArena(arenaInfo){
  const newArena = await makeArena(arenaInfo);
  return Arena.create(newArena).then(serialize).catch(errorFormatter);
}


async function updateArena(id, updateArenaInfo){
  if(!id) throw new Error("You must supply id!");

  var arenaData = await Arena.findById(id);
  if(arenaData === null) throw new Error("No Arena with id: " + id);

  // validate the update info 
  await makeUpdateArena(updateArenaInfo);

  // if error is not thrown, then we can update with updateArenaInfo in database
  return Arena.findByIdAndUpdate(id, updateArenaInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteArena(id){
  return Arena.findByIdAndDelete(id)
    .then(res => {
      if(!res)
        throw {
          name: 'Error',
          code: 11011, // custom error code
          _id: id, 
        };
      return {
        id: res._id.toString(),
      };
    }).catch(errorFormatter);
}


function dropArenas(){
  return Arena.deleteMany().catch(errorFormatter);
}


module.exports = {
  listArenas,
  findArenaBy,
  findArenaById, 
  addArena,
  updateArena, 
  deleteArena, 
  dropArenas
};
