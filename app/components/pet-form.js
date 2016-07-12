import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  routing: inject.service('-routing'),
  didReceiveAttrs() {
  }
});
