export default Ember.Controller.extend({
  actions: {
    save(pet) {
      pet.save();
    },

    destroy(pet) {
      pet.destroyRecord().then(() => {
        this.transitionToRoute('pets.index');
      });
    },

    cancel(pet) {
      pet.rollback();
    }
  }
});
