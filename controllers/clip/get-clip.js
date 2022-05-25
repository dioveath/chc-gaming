module.exports = function makeGetClip(clipAccess) {
  return async function getClip(httpRequest){ // Custom Httprequest (Made from express default requests)
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const clip = await clipAccess.findClipById(httpRequest.params.id);

      if(clip == null) {
        throw new Error("No Clip with id: " + httpRequest.params.id);
      }

      return { // this is response model
        headers,
        statusCode: 200,
        body: {
          status: 'success', 
          clip
        }
      };

    } catch(error){
      // TODO: Error logging
      // console.log(error);

      return {
        headers,
        statusCode: 400,
        body: {
          status: 'fail',
          errorList: error.message.split(',')
        }
      };
    }
  }; 
};
