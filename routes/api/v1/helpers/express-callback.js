

module.exports = function makeExpressCallback(controller){
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      },
      user: req.user
    };
    
    controller(httpRequest).then(httpResponse => {
      if(httpResponse.headers) {
        res.set(httpResponse.headers); 
      }
      res.type('json');
      res.status(httpResponse.statusCode).send(httpResponse.body); 
    }).catch(error => res.status(500).send({
      status: 'fail', 
      errors: [
        error.message
      ]
    }));

  };
};
