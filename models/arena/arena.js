const buildMakeArena = function (arenaValidator) {
  return async (arena) => {
    const validatedArena = arenaValidator(arena);
    return Object.freeze(validatedArena);
  };
};

module.exports = buildMakeArena;
