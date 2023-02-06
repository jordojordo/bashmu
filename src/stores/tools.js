import { defineStore } from 'pinia';
import isEmpty from 'lodash/isEmpty';

import { HYDRA_ENUM } from '@/types';

export const useToolsStore = defineStore('tools', {
  state: () => ({
    hydra:          {},
    hydraResources: [
      {
        kind:          HYDRA_ENUM.BLEND,
        items:         {},
        sourceTargets: {},
        bufferTargets: {},
        weight:        95
      },
      {
        kind:          HYDRA_ENUM.COLOR,
        items:         {},
        sourceTargets: {},
        bufferTargets: {},
        weight:        96
      },
      {
        kind:          HYDRA_ENUM.GEOMETRY,
        items:         {},
        sourceTargets: {},
        bufferTargets: {},
        weight:        98
      },
      {
        kind:          HYDRA_ENUM.MODULATE,
        items:         {},
        sourceTargets: {},
        bufferTargets: {},
        weight:        97
      },      {
        kind:          HYDRA_ENUM.SOURCE,
        items:         {},
        sourceNames:   {},
        sourceTargets: {},
        bufferTargets: {},
        weight:        99
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

    sources() {
      return this.$state.hydraResources.find((resource) => resource.kind === HYDRA_ENUM.SOURCE);
    },

    currentResource: (state) => {
      return ({ kind }) => {
        return state.resources.find((resource) => resource.kind === kind);
      };
    }
  },

  actions: {
    initHydra(value) {
      Object.assign(this.hydra, value);
    },

    addResource({ kind, value }) {
      const resource = this.currentResource({ kind });

      Object.assign(resource.items, value);
    },

    removeResource({ kind, id }) {
      const resource = this.currentResource({ kind });

      delete resource.items[id];
    },

    addFunction({
      resource, id, item, multiple, schema
    }) {
      if ( !multiple && !isEmpty(item) ) {
        resource.items[id] = {};
      }

      Object.assign(item, schema);
    },

    cleanFunction({ resource, id, selectedFunction }) {
      delete resource.items[id][selectedFunction];
    },

    addSourceName({ id, value }) {
      const names = this.sources.sourceNames;

      if ( names[id] && !value ) {
        delete names[id];

        return;
      }

      names[id] = value;
    },

    addSourceTarget({ resource, id, source }) {
      resource.sourceTargets[id] = source;
    },

    removeSourceTarget({ resource, id }) {
      delete resource.sourceNames[id];
    },


    /*
      Buffers and renders are structured incorrectly,
      they need source names to relate to.
    */

    addBufferTargets({ resource, id, buffer }) {
      resource.bufferTargets.push({ [id]: buffer });
    },

    removeBufferTarget({ resource, id }) {
      delete resource.bufferTargets[id];
    },

    addBuffer({ id, value }) {
      this.buffers[id] = value;
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
