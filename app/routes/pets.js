import Ember from 'ember';
import qb from 'orbit-common/query/builder';

export default Ember.Route.extend({
  model() {
    let store = this.get('store');
    let cache = store.cache;
    let query = qb.records('pet');

    return store.query(query).then(() => cache.liveQuery(query));
  }
});
