import Coordinator from 'orbit-common/coordinator';
import JSONAPISource from 'orbit-common/jsonapi-source';
import LocalStorageSource from 'orbit-common/local-storage-source';
import Orbit from 'orbit/main';
import Ember from 'ember';
import KeyMap from 'orbit-common/key-map';
import RequestStrategy from 'orbit-common/strategies/request-strategy';
import SyncStrategy from 'orbit-common/strategies/sync-strategy';

export default {
  name: 'config-orbit',

  initialize: function(app) {
    Orbit.ajax = Ember.$.ajax;

    let coordinator = new Coordinator();
    let store = app.lookup('service:store').orbitStore;
    let jsonAPISource = new JSONAPISource({ schema: store.schema, keyMap: new KeyMap() });
    let localStorage = new LocalStorageSource({ schema: store.schema, keyMap: new KeyMap() });

    coordinator.addNode('master', {
      sources: [store]
    });

    coordinator.addNode('upstream', {
      sources: [jsonAPISource]
    });

    coordinator.addNode('backup', {
      sources: [localStorage]
    });

    new RequestStrategy({
      coordinator,
      sourceNode: 'master',
      targetNode: 'backup',
      sourceEvent: 'beforeUpdate',
      targetRequest: 'update',
      blocking: false,
      syncResults: true
    });

    new RequestStrategy({
      coordinator,
      sourceNode: 'master',
      targetNode: 'backup',
      sourceEvent: 'beforeQuery',
      targetRequest: 'fetch',
      blocking: true,
      syncResults: true
    });

    new SyncStrategy({
      coordinator,
      sourceNode: 'backup',
      targetNode: 'upstream',
      blocking: false
    });
  }
};
