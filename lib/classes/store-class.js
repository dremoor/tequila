/**
 * tequila
 * store-class
 */

// Constructor
var Store = function (args) {
  if (false === (this instanceof Store)) throw new Error('new operator required');
  args = args || {};
  this.storeType = args.storeType || "Store";
  this.name = args.name || 'a ' + this.storeType;
  this.storeProperty = {
    isReady: true,
    canGetModel: false,
    canPutModel: false,
    canDeleteModel: false,
    canGetList: false
  };
  var unusedProperties = T.getInvalidProperties(args, ['name', 'storeType']);
  var errorList = [];
  for (var i = 0; i < unusedProperties.length; i++) errorList.push('invalid property: ' + unusedProperties[i]);
  if (errorList.length > 1) throw new Error('error creating Store: multiple errors');
  if (errorList.length) throw new Error('error creating Store: ' + errorList[0]);
};
// Methods
Store.prototype.toString = function () {
  if (this.name == 'a ' + this.storeType) {
    return this.name;
  } else {
    return this.storeType + ': ' +this.name;
  }
};
Store.prototype.getServices = function () {
  return this.storeProperty;
};
Store.prototype.onConnect = function (location, callBack) {
  if (typeof location != 'string') throw new Error('argument must a url string');
  if (typeof callBack != 'function') throw new Error('argument must a callback');
  callBack(this, undefined);
};
Store.prototype.getModel = function () {
  throw new Error(this.storeType + ' does not provide getModel');
};
Store.prototype.putModel = function () {
  throw new Error('Store does not provide putModel');
};
Store.prototype.deleteModel = function () {
  throw new Error('Store does not provide deleteModel');
};
Store.prototype.getList = function () {
  throw new Error('Store does not provide getList');
};
