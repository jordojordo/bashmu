import { defineStore } from 'pinia';
import { HYDRA_ENUM } from '@/types';

export const useToolsStore = defineStore('tools', {
  state: () => ({
    hydra:          {},
    hydraResources: [
      {
        kind:  HYDRA_ENUM.BUFFER,
        items: []
      },
      {
        kind:  HYDRA_ENUM.RENDER,
        items: []
      },
      {
        kind:  HYDRA_ENUM.BLEND,
        items: []
      },
      {
        kind:  HYDRA_ENUM.COLOR,
        items: []
      },
      {
        kind:  HYDRA_ENUM.GEOMETRY,
        items: []
      },
      {
        kind:  HYDRA_ENUM.MODULATE,
        items: []
      },
      {
        kind:  HYDRA_ENUM.SOURCE,
        items: []
      },
      {
        kind:  HYDRA_ENUM.SYNTH_SETTINGS,
        items: []
      },
    ]
  }),

  getters: {
    hydraState() {
      return this.$state.hydra;
    },
    resources() {
      return this.$state.hydraResources;
    }
  },

  actions: {
    initHydra(value) {
      Object.assign(this.hydra, value);
    },

    addResource({ kind, value }) {
      const out =  this.resources.find((resource) => resource.kind === kind);

      out.items.push(value);
    },

    removeResource({ kind, index }) {
      const out =  this.resources.find((resource) => resource.kind === kind);

      out.items.splice(index, 1);
    },

    addFunction({ kind, index, schema }) {
      const resource =  this.resources.find((resource) => resource.kind === kind);
      const item = resource.items[index];

      Object.assign(item, schema);
    }
  },
});
