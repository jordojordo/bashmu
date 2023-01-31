import { defineStore } from 'pinia'

export const useToolsStore = defineStore('tools', {
  state: () => ({
    hydra: {},
    hydraResources: {
        oscillator: {
          kind: 'oscillator',
          items: []
        },
        filter: {
          kind: 'filter',
          items: []
        },
        source: {
          kind: 'source',
          items: []
        },
        geometry: {
          kind: 'geometry',
          items: []
        },
        color: {
          kind: 'color',
          items: []
        },
        blend: {
          kind: 'blend',
          items: []
        },
        modulator: {
          kind: 'modulator',
          items: []
        }
      }
  }),

  getters: {
    hydraState() {
      return this.$state.hydra;
    },
    resources() {
      return this.$state.hydraResources;
    },
    oscillator() {
      return this.$state.hydraResources.oscillator;
    },
    filter() {
      return this.$state.hydraResources.filter;
    },
    source() {
      return this.$state.hydraResources.source;
    },
    geometry() {
      return this.$state.hydraResources.geometry;
    },
    color() {
      return this.$state.hydraResources.color;
    },
    blend() {
      return this.$state.hydraResources.blend;
    },
    modulator() {
      return this.$state.hydraResources.modulator;
    },
  },

  actions: {
    initHydra(value) {
      Object.assign(this.hydra, value);
    },

    addResource({ kind, value }) {
      this[kind].items.push(value);
    },

    removeResource({ kind, index }) {
      this[kind].items.splice(index, 1);
    }
  },
})
