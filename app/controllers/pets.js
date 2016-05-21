import Ember from 'ember';
const { computed, assign } = Ember;

export default Ember.Controller.extend({
  pets: computed('model.@each.{id,data}', function() {
    return this.get('model').filterBy('id').map(pet => {
      return assign({}, pet.get('data'), { id: pet.id });
    })
  })
});
