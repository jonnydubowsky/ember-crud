import Ember from 'ember';
const { get } = Ember;

class Changeset {
  constructor(model) {
    this._model = model;
    this.changes = {};
  }

  unknownProperty(key) {
    return get(this._model, key);
  }

  setUnknownProperty(key, value) {
    this.changes[key] = value;
  }
}

export default Changeset
