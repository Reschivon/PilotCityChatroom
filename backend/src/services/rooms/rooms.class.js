const { Service } = require('feathers-mongodb');

exports.Rooms = class Rooms extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('rooms');
    });
  }
  
};
