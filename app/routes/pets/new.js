import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    let forkedStore = this.get('store').fork();
    this.set('forkedStore', forkedStore);
  },
  model() {
    return this.get('forkedStore').addRecord({ type: 'pet', name: ''});
  },

  actions: {
    save(model) {
      let forkedStore = this.get('forkedStore');
      this.get('store').merge(forkedStore);

      this.transitionTo('pets.edit', model.get('id'));
    },

    cancel() {
      this.controller.get('model').set('name', '');
    }
  }
});
