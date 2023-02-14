// Entity - Clip

var buildMakeClip = function (clipValidator) {
  return async ({
    title,
    author,
    privacy,
    video_url,
    video_meta,
    likes,
    comments,
  } = {}) => {

    clipValidator({
      title,
      author,
      privacy,
      video_url,
      video_meta,
      likes,
      comments,
    });

    return Object.freeze({
      getTitle: () => title,
      getAuthor: () => author,
      getPrivacy: () => privacy,
      getVideoUrl: () => video_url,
      getVideoMeta: () => video_meta,
      getLikes: () => likes,
      getComments: () => comments,
    });
  };
};

module.exports = buildMakeClip;
