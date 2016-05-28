import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let store = this.get('store');
    let cache = store.cache;
    let query = (q) => q.recordsOfType('pet');

    return store.query(query).then(() => cache.liveQuery(query));
  }
});
