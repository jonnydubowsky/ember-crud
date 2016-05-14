import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save(pet) {
      pet.save().then(() => {
        this.set('model', this.get('store').createRecord('pet'));
      });
    }
  }
});
