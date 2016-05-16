import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  store: inject.service(),

  init() {
    this._super(...arguments);
    this.changeSet = {};
  },

  actions: {
    save() {
      this.get('store').createRecord('pet', this.changeSet).save();
    },

    destroy() {
      this.get('pet').destroyRecord().then(() => {
        this.transitionToRoute('pets.index');
      });
    },

    cancel() {
      this.set('changeSet', {});
    }
  }
});
