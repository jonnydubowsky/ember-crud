import Coordinator from 'orbit-common/coordinator';
import JSONAPISource from 'orbit-common/jsonapi-source';
import Orbit from 'orbit/main';
import Ember from 'ember';

export default {
  name: 'config-orbit',

  initialize: function(app) {
    Orbit.ajax = Ember.$.ajax;

    let coordinator = new Coordinator();
    let store = app.lookup('service:store').orbitStore;
    let jsonAPISource = new JSONAPISource({ schema: store.schema });

    coordinator.addNode('master', {
      sources: [store]
    });

    coordinator.addNode('upstream', {
      sources: [jsonAPISource]
    });

    coordinator.defineStrategy({
      type: 'request',
      sourceNode: 'master',
      targetNode: 'upstream',
      sourceEvent: 'beforeUpdate',
      targetRequest: 'transform',
      blocking: true,
      mergeTransforms: true
    });

    coordinator.defineStrategy({
      type: 'request',
      sourceNode: 'master',
      targetNode: 'upstream',
      sourceEvent: 'beforeQuery',
      targetRequest: 'fetch',
      blocking: true,
      mergeTransforms: true
    });
  }
};
