export default Ember.Controller.extend({
  actions: {
    save(pet) {
      pet.save();
    }
  }
});
