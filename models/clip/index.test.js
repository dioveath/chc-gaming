// tests makeClip

const chai = require('chai');
const expect = chai.expect;
const { makeClip } = require('./index');


describe('makeClip', ()=> {
  
  it('tests makeClip makes a valid clip', async () => {
    
    var validClipInfoPayload = {
      title: "Day in Life of Charichians",
      author: '628bd274336f432540144e55',
      privacy: 'public',
      video_url: 'https://vod-progressive.akamaized.net/exp=1653505077~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3901%2F21%2F544507823%2F2582075434.mp4~hmac=41a16211a4231c2e6dc2f67c9b2078795b55a0b4542366e773c1c2412110a4e2/vimeo-prod-skyfire-std-us/01/3901/21/544507823/2582075434.mp4?download=1&filename=pexels-cottonbro-7760272.mp4',
      video_meta: {
        type: 'video/mp4',
        length: 9000,
        size: 1031318,
        width: 720,
        height: 1080
      },
      likes: [],
      comments: ["Great, Keep up the good work!"]
    };

    var input = await makeClip(validClipInfoPayload);

    expect(input).to.have.keys([
      "getTitle",
      "getAuthor",
      "getPrivacy",
      "getVideoUrl",
      "getVideoMeta",
      "getLikes",
      "getComments"
    ]);

  });

  it('tests makeClip throws error for exceeding video length', async () => {
    
    var invalidClipInfoPayload = {
      title: "Day in Life of Charichians",
      author: '628bd274336f432540144e55',
      privacy: 'public',
      video_url: 'https://vod-progressive.akamaized.net/exp=1653505077~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3901%2F21%2F544507823%2F2582075434.mp4~hmac=41a16211a4231c2e6dc2f67c9b2078795b55a0b4542366e773c1c2412110a4e2/vimeo-prod-skyfire-std-us/01/3901/21/544507823/2582075434.mp4?download=1&filename=pexels-cottonbro-7760272.mp4',
      video_meta: {
        type: 'video/mp4',
        length: 10000000000,
        size: 203432,
        width: 720,
        height: 1080
      },
      likes: [],
      comments: ["Great, Keep up the good work!"]
    };

    var expectedValue = {
      message: '"video_meta.length" must be less than or equal to 120000',
    };

    try {
      await makeClip(invalidClipInfoPayload);
    } catch (error){
      expect(error).to.have.property('message');
      expect(error.message).to.equal(expectedValue.message);
    }
    

  });

});
