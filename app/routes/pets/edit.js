import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    let forkedStore = this.get('store').fork();
    this.set('forkedStore', forkedStore);
  },

  model(params) {
    return this.get('forkedStore').findRecord('pet', params.id);
  },

  actions: {
    save() {
      let forkedStore = this.get('forkedStore');
      this.get('store').merge(forkedStore);
    },

    destroy(model) {
      let forkedStore = this.get('forkedStore');

      forkedStore.removeRecord(model).then(() => {
        this.get('store').merge(forkedStore);
      });

      this.transitionTo('pets.new');
    },

    cancel() {
      this.transitionTo('pets.new');
    }
  }
});
