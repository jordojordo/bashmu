import { defineStore } from 'pinia';
import isEmpty from 'lodash/isEmpty';
import flatMap from 'lodash/flatMap';

import { HYDRA_ENUM } from '@/types';

export const useToolsStore = defineStore('tools', {
  state: () => ({
    hydra:          {},
    hydraResources: [
      {
        kind:          HYDRA_ENUM.BLEND,
        items:         [],
        bufferTargets: []
      },
      {
        kind:          HYDRA_ENUM.COLOR,
        items:         [],
        bufferTargets: []
      },
      {
        kind:          HYDRA_ENUM.GEOMETRY,
        items:         [],
        bufferTargets: []
      },
      {
        kind:          HYDRA_ENUM.MODULATE,
        items:         [],
        bufferTargets: []
      },
      {
        kind:          HYDRA_ENUM.SOURCE,
        items:         [],
        bufferTargets: []
      }
    ],
    [HYDRA_ENUM.BUFFER]: [],
    [HYDRA_ENUM.RENDER]: []
  }),

  getters: {
    hydraState() {
      return this.$state.hydra;
    },

    buffers() {
      return this.$state[HYDRA_ENUM.BUFFER];
    },

    renders() {
      return this.$state[HYDRA_ENUM.RENDER];
    },

    resources() {
      return this.$state.hydraResources;
    },

    currentResource: (state) => {
      return ({ kind }) => {
        return state.resources.find((resource) => resource.kind === kind);
      };
    },

    allFunctions() {
      return flatMap(this.resources, (r) => r.items);
    },

    functionSchema: (state) => {
      return ({ kind, index }) => {
        return state.currentResource({ kind }).items[index];
      };
    },

    functionValue: (state) => {
      return ({ kind, index }) => {
        const resource = state.currentResource({ kind });

        return resource.items[index];
      };
    }
  },

  actions: {
    initHydra(value) {
      Object.assign(this.hydra, value);
    },

    addResource({ kind, value }) {
      this.currentResource({ kind }).items.push(value);
    },

    removeResource({ kind, index }) {
      this.currentResource({ kind }).items.splice(index, 1);
    },

    addFunction({
      kind, index, multiple, schema
    }) {
      const resource = this.currentResource({ kind });
      const item = resource.items[index];

      if ( !multiple && !isEmpty(item) ) {
        resource.items[index] = {};
      }

      Object.assign(item, schema);
    },

    addBufferTargets({ kind, index, buffer }) {
      const resource = this.currentResource({ kind });

      resource.bufferTargets.push({ [index]: buffer });
    },

    removeBufferTarget({ kind, index }) {
      const resource = this.currentResource({ kind });

      delete resource.bufferTargets[index];
    },

    addBuffer(value) {
      this.buffers.push(value);
    },

    removeBuffer({ buffer }) {
      if ( this.buffers.length ) {
        const toRemove = this.buffers.find((b) => b === buffer);
        const index = this.buffers.indexOf(toRemove);

        this.buffers.splice(index, 1);
      }
    },

    addRender(value) {
      this.renders.push(value);
    },

    removeRender({ render }) {
      if ( this.renders.length ) {
        const toRemove = this.renders.find((r) => r === render);
        const index = this.renders.indexOf(toRemove);

        this.renders.splice(index, 1);
      }
    }
  },
});
