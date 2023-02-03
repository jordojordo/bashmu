import { defineStore } from 'pinia';
import isEmpty from 'lodash/isEmpty';

import { HYDRA_ENUM } from '@/types';

export const useToolsStore = defineStore('tools', {
  state: () => ({
    hydra:          {},
    hydraResources: [
      {
        kind:          HYDRA_ENUM.BLEND,
        items:         [],
        sourceTargets: [],
        bufferTargets: [],
        weight:        95
      },
      {
        kind:          HYDRA_ENUM.COLOR,
        items:         [],
        sourceTargets: [],
        bufferTargets: [],
        weight:        96
      },
      {
        kind:          HYDRA_ENUM.GEOMETRY,
        items:         [],
        sourceTargets: [],
        bufferTargets: [],
        weight:        98
      },
      {
        kind:          HYDRA_ENUM.MODULATE,
        items:         [],
        sourceTargets: [],
        bufferTargets: [],
        weight:        97
      },      {
        kind:          HYDRA_ENUM.SOURCE,
        items:         [],
        sourceNames:   [],
        sourceTargets: [],
        bufferTargets: [],
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

    addSourceName({ index, name }) {
      const names = this.sources.sourceNames;
      const existing = names.map((i) => Object.keys(i)[index]);

      if ( existing ) {
        this.$patch((state) => {
          const resource = state.hydraResources.find((resource) => resource.kind === HYDRA_ENUM.SOURCE);

          resource.sourceNames[index] = name;
        });

        return;
      }

      names.push({ [index]: name });
    },

    addSourceTarget({ kind, index, source }) {
      const resource = this.currentResource({ kind });

      resource.sourceTargets.push({ [index]: source });
    },

    removeSourceTarget({ kind, index }) {
      const resource = this.currentResource({ kind });

      delete resource.sourceNames[index];
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
