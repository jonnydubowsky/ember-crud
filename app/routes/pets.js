import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('pet').then((pets) => {
      return pets.filter((p) => !p.get('isNew'));
    });
  }
});
