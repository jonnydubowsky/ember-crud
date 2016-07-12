import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  routing: inject.service('-routing'),
  store: inject.service(),

  didReceiveAttrs() {
    if (!this.get('pet')) {
      this.set('pet', { type: 'pet', name: '' });
    }
  },

  actions: {
    save() {
      this.get('store').addRecord(this.get('pet')).then((pet) => {
        this.get('routing').transitionTo('pets.edit', [pet.get('id')]);
      });
    },

    destroy() {
      this.get('store').removeRecord({ type: 'pet', id: this.get('pet.id') }).then(() => {
        this.get('routing').transitionTo('pets.index');
      });
    },

    cancel() {
      this.set('pet', { type: 'pet', name: '' });
    }
  }
});
