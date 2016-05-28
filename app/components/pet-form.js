import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  routing: inject.service('-routing'),
  store: inject.service(),

  didReceiveAttrs() {
    this.transaction = this.get('store').createTransaction();

    if (this.get('pet')) {
      this.set('pet', this.transaction.cache.retrieveRecord('pet', this.get('pet.id')));
    } else {
      this.transaction.addRecord({ type: 'pet' }).then((pet) => {
        this.set('pet', pet);
      });
    }
  },

  actions: {
    save() {
      this.transaction.commit().then(() => {
        this.get('routing').transitionTo('pets.edit', [this.get('pet.id')]);
      });
    },

    destroy() {
      this.get('store').removeRecord({ type: 'pet', id: this.get('pet.id') }).then(() => {
        this.get('routing').transitionTo('pets.index');
      });
    },

    cancel() {
      this.transaction = this.get('store').createTransaction();
      this.set('pet', this.transaction.cache.retrieveRecord('pet', this.get('pet.id')));
    }
  }
});
