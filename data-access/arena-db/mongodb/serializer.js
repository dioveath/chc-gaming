// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (arena) => {
  return {
    id: arena._id,
    name: arena.name,
    handle: arena.handle,
    category: arena.category,
    owner: arena.owner,
    appearance: arena.appearance,
    about: arena.about,
    subscriptions: arena.subscriptions,
    billing_details: arena.billing_details,
    tournaments: arena.tournaments,
    leaderboards: arena.leaderboards,
    posts: arena.posts,
    members: arena.members,
    roles: arena.roles,
    bans: arena.bans,
    followers: arena.followers,
    following: arena.following,
    verified: Boolean,
  };
};

function serializer(data) {
  if (!data) return null;
  if (Array.isArray(data)) return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
