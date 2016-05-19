import Ember from 'ember';
import Changeset from 'ember-crud/utils/changeset';
const { inject, computed } = Ember;

export default Ember.Component.extend({
  store: inject.service(),
  routing: inject.service('-routing'),

  changeset: computed('pet', function() {
    let changeset = new Changeset(this.get('pet'));
    return this.set('changeset', changeset);
  }),

  actions: {
    save() {
      if (this.get('pet.id')) {
        this.get('pet').setProperties(this.changeset.changes).save();
      } {
        this.get('store').createRecord('pet', this.changeset.changes).save();
      }
    },

    destroy() {
      this.get('pet').destroyRecord().then(() => {
        this.get('routing').transitionTo('pets.index');
      });
    },

    cancel() {
      let changeset = new Changeset(this.get('pet'));
      return this.set('changeset', changeset);
    }
  }
});
