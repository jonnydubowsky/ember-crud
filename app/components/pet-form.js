import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  routing: inject.service('-routing'),

  actions: {
    save() {
      this.get('pet').save().then((pet) => {
        this.get('routing').transitionTo('pets.edit', [pet.get('id')]);
      });
    },

    destroy() {
      this.get('pet').destroyRecord().then(() => {
        this.get('routing').transitionTo('pets.index');
      });
    },

    cancel() {
      this.get('pet').rollbackAttributes();
    }
  }
});
