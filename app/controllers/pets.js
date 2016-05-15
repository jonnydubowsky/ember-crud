import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({
  pets: computed('model.@each.isNew', function() {
    return this.get('model').filter(p => !p.get('isNew'));
  })
});
