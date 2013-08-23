/**
 * tequila
 * mongo-store-model-server
 *
 * MongoDB goodies
 *
 * db.testData.find() // return cursor with all docs in testData collection
 * db.testData.find( { x : 18 } ) // cursor with all docs where x = 18
 * db.testData.find().limit(3) // limit cursor
 * db.testData.findOne() // return document not cursor
 *
 *
 */

// Methods (Server Side Only)
MongoStore.prototype.onConnect = function (location, callBack) {
  if (typeof location != 'string') throw new Error('argument must a url string');
  if (typeof callBack != 'function') throw new Error('argument must a callback');

  // Open mongo database
  var store = this;
  try {
    this.mongoServer = new mongo.Server('127.0.0.1', 27017, {auto_reconnect: true});
    this.mongoDatabase = new mongo.Db('tequilaStore', this.mongoServer, {safe: true});
    this.mongoDatabaseOpened = false;
    this.mongoDatabase.open(function (err, db) {
      if (err) {
        callBack(store, err);
        try {
          store.mongoDatabase.close();  // Error will retry till close with auto_reconnect: true
        }
        catch (err) {
          console.log('error closing when fail open: ' + err);
        }
      } else {
        store.mongoDatabaseOpened = true;
        store.storeInterface.isReady = true;
        store.storeInterface.canGetModel = true;
        store.storeInterface.canPutModel = true;
        store.storeInterface.canDeleteModel = true;
        callBack(store);
      }
    });
  }
  catch (err) {
    callBack(store, err);
  }

};
MongoStore.prototype.putModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getValidationErrors().length) throw new Error('model has validation errors');
  if (typeof callBack != "function") throw new Error('callback required');
  var store = this;
  var a;
  store.mongoDatabase.collection(model.modelType, function (err, collection) {
    if (err) {
      console.log('putModel collection error: ' + err);
      callBack(model, err);
      return;
    }
    // put name value pairs into modelData
    var modelData = {};
    var newModel = false;
    var id = model.attributes[0].value;
    for (a in model.attributes) {
      if (model.attributes[a].name == 'id') {
        if (!model.attributes[a].value)
          newModel = true;
      } else {
        modelData[model.attributes[a].name] = model.attributes[a].value;
      }
    }
    if (newModel) {
      collection.insert(modelData, {safe: true}, function (err, result) {
        if (err) {
          console.log('putModel insert error: ' + err);
          callBack(model, err);
        } else {
          // Get resulting data
          for (a in model.attributes) {
            if (model.attributes[a].name == 'id') {
              model.attributes[a].value = modelData['_id'].toString();
            } else {
              model.attributes[a].value = modelData[model.attributes[a].name];
            }
          }
          callBack(model);
        }
      });
    } else {
      id = mongo.ObjectID.createFromHexString(id);
      collection.update({'_id': id}, modelData, {safe: true}, function (err, result) {
        if (err) {
          console.log('putModel update error: ' + err);
          callBack(model, err);
        } else {
          // Get resulting data
          for (a in model.attributes) {
            if (model.attributes[a].name != 'id') // Keep original ID intact
              model.attributes[a].value = modelData[model.attributes[a].name];
          }
          callBack(model);
        }
      });
    }
  });
};
MongoStore.prototype.getModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getValidationErrors().length) throw new Error('model has validation errors');
  if (!model.attributes[0].value) throw new Error('ID not set');
  if (typeof callBack != "function") throw new Error('callback required');
  var store = this;
  var a;
  var id = model.attributes[0].value;
  id = mongo.ObjectID.createFromHexString(id);
  store.mongoDatabase.collection(model.modelType, function (err, collection) {
    if (err) {
      console.log('getModel collection error: ' + err);
      callBack(model, err);
      return;
    }
    collection.findOne({'_id': id}, function (err, item) {
      if (err) {
        console.log('getModel findOne ERROR: ' + err);
        callBack(model, err);
        return;
      }
      if (item == null) {
        callBack(model, Error('id not found in store'));
      } else {
        for (a in model.attributes) {
          if (model.attributes[a].name == 'id')
            model.attributes[a].value = item['_id'].toString();
          else
            model.attributes[a].value = item[model.attributes[a].name];
        }
        callBack(model);
      }
    });
  });
};
MongoStore.prototype.deleteModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getValidationErrors().length) throw new Error('model has validation errors');
  if (typeof callBack != "function") throw new Error('callback required');
  var store = this;
  var a;
  var id = model.attributes[0].value;
  id = mongo.ObjectID.createFromHexString(id);
  store.mongoDatabase.collection(model.modelType, function (err, collection) {
    if (err) {
      console.log('deleteModel collection error: ' + err);
      callBack(model, err);
      return;
    }
    collection.remove({'_id': id}, function (err, item) {
      if (err || item != 1) {
        if (!err) err = 'error deleting: item is not equal to 1';
        console.log('deleteModel remove ERROR: ' + err);
        callBack(model, err);
        return;
      }
      for (a in model.attributes) {
        if (model.attributes[a].name == 'id')
          model.attributes[a].value = null;
      }
      callBack(model);
    });
  });
};
MongoStore.prototype.getList = function (list, filter, arg3, arg4) {
  var callBack, order;
  if (typeof(arg4) == 'function') {
    callBack = arg4;
    order = arg3;
  } else {
    callBack = arg3;
  }
  if (!(list instanceof List)) throw new Error('argument must be a List');
  if (!(filter instanceof Object)) throw new Error('filter argument must be Object');
  if (typeof callBack != "function") throw new Error('callback required');
  var store = this;
  list.clear();
  store.mongoDatabase.collection(list.model.modelType, function (err, collection) {
    if (err) {
      console.log('getList collection error: ' + err);
      callBack(list, err);
      return;
    }
    if (order) {
      console.log('find WITH order: ' + JSON.stringify(order));
//      collection.find(filter, findCallback)._addSpecial("$orderby", order);
      collection.find({ query: filter, $orderby: order}, findCallback);
    } else {
      console.log('find no order...');
      collection.find(filter, findCallback);
    }
    function findCallback(err, cursor) {
      if (err) {
        console.log('getList find error: ' + err);
        callBack(list, err);
        return;
      }
      cursor.toArray(function (err, documents) {
        if (err) {
          console.log('getList toArray error: ' + err);
          callBack(list, err);
          return;
        }
        for (var i = 0; i < documents.length; i++) {
          documents[i].id = documents[i]._id.toString();
          delete documents[i]._id;
          var dataPart = [];
          dataPart.push(documents[i].id);
          for (var j in documents[i]) {
            if (j != 'id')
              dataPart.push(documents[i][j]);
          }
          list._items.push(dataPart);
        }
        list._itemIndex = list._items.length - 1;
        callBack(list);
      });
    }
  });
};
