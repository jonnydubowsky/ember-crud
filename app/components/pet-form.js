import Ember from 'ember';

export default Ember.Component.extend({
  willDestroy() {
    this.get('pet').rollback();
  },

  actions: {
    save() {
      this.get('pet').save();
    },

    destroy() {
      this.get('pet').destroyRecord().then(() => {
        this.transitionToRoute('pets.index');
      });
    },

    cancel() {
      this.get('pet').rollbackAttributes();
    }
  }
});
