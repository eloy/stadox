import {Map} from 'immutable';

export default {
  init: function(initial_state) {
    current_state = new Map(initial_state);
  },

  get: function(key) {
    let state = current_state.toJS();
    return state[key];
  },

  on: function(callback_id, callback) {
    callbacks[callback_id] = callback;
  },

  dispatch: function(callback_id, params) {
    let new_state = callbacks[callback_id](params, current_state);
    if (new_state === current_state) return;
    current_state = new_state;

    let plain_state = current_state.toJS();
    let keys = current_state.keySeq();
    for (let s of subscribers) {
      if (s.keys === false || s.keys.some(k => keys.indexOf(k) !== -1)) {
        s.callback(plain_state);
      }
    }
  },

  subscribe: function() {
    let keys, callback;
    if (arguments.length === 1) {
      callback = arguments[0];
      keys = false;
    }
    else if (arguments.length === 2) {
      keys = arguments[0];
      callback = arguments[1];
    }

    let id = randomID();
    subscribers.push({id, keys, callback});
    return id;
  },

  unsubscribe: function(subscriptor_id) {
    let index = subscribers.findIndex(s => s.id === subscriptor_id);
    if (index === -1) return;
    subscribers.splice(index, -1);
  }
}




var current_state;
const callbacks = {};
const subscribers = [];



function randomID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
