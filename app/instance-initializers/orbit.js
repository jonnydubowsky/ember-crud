import Coordinator from 'orbit-common/coordinator';
import JSONAPISource from 'orbit-common/jsonapi-source';
import Orbit from 'orbit/main';
import Ember from 'ember';
import KeyMap from 'orbit-common/key-map';
import RequestStrategy from 'orbit-common/strategies/request-strategy';

export default {
  name: 'config-orbit',

  initialize: function(app) {
    Orbit.ajax = Ember.$.ajax;

    let coordinator = new Coordinator();
    let store = app.lookup('service:store').orbitStore;
    let jsonAPISource = new JSONAPISource({ schema: store.schema, keyMap: new KeyMap() });

    coordinator.addNode('master', {
      sources: [store]
    });

    coordinator.addNode('upstream', {
      sources: [jsonAPISource]
    });

    new RequestStrategy({
      coordinator,
      sourceNode: 'master',
      targetNode: 'upstream',
      sourceEvent: 'beforeUpdate',
      targetRequest: 'update',
      blocking: true,
      syncResults: true
    });

    new RequestStrategy({
      coordinator,
      sourceNode: 'master',
      targetNode: 'upstream',
      sourceEvent: 'beforeQuery',
      targetRequest: 'fetch',
      blocking: true,
      syncResults: true
    });
  }
};
