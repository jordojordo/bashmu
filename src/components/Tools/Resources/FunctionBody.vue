<script>
import { defineAsyncComponent, inject, reactive } from 'vue';
import capitalize from 'lodash/capitalize';

import { useToolsStore } from '@/stores/tools';

export default {
  props: {
    selectedFunction: {
      type:     String,
      required: true
    }
  },

  setup(props) {
    const store = useToolsStore();
    const functionItem = inject('functionItem');
    const resource = inject('resource');

    const state = reactive({ componentsToLoad: [] });

    function loadComponent(type) {
      const t = capitalize(type);

      return defineAsyncComponent(() => import(`./Inputs/${ t }.vue`));
    }

    function componentForType(val) {
      let type = typeof val;

      if ( type === 'object' ) {
        if ( Array.isArray(val) ) {
          return loadComponent('array');
        }

        if ( Object.hasOwn(functionItem.item[props.selectedFunction], 'texture') ) {
          return loadComponent('texture');
        }
      }

      return loadComponent(type);
    }

    function getComponentValue(obj, path) {
      if ( !path ) {
        throw new Error('Cannot translate an empty input. The t function requires a string.');
      }

      if ( !path.includes('.') ) {
        return obj?.[path];
      }

      const parts = splitObjectPath(path);

      for ( let i = 0; i < parts.length; i++ ) {
        if ( !obj ) {
          return;
        }

        obj = obj[parts[i]];
      }

      return obj;
    }

    function splitObjectPath(path) {
      const quotedMatch = /[^."']+|"([^"]*)"|'([^']*)'/g;

      if ( path.includes('"') || path.includes("'") ) {
        // Path with quoted section
        return path.match(quotedMatch).map((x) => x.replace(/['"]/g, ''));
      }

      // Regular path
      return path.split('.');
    }

    const updateFunction = ({ functionKey, event }) => {
      store.$patch(() => {
        const out = resource.items[functionItem.id][props.selectedFunction];

        out[functionKey] = event;
      });
    };

    return {
      state,
      store,
      functionItem,
      resource,
      componentForType,
      getComponentValue,
      updateFunction
    };
  },
};
</script>

<template>
  <div class="component-input" v-for="(val, name, index) in functionItem.item[selectedFunction]" :key="index">
    <component
      :is="componentForType(val)"
      :functionKey="name"
      :functionValue="getComponentValue(functionItem.item[selectedFunction], name)"
      :selectedFunction="selectedFunction"
      @update="updateFunction"
    />
  </div>
</template>

<style scoped>
.component-input {
  margin: 12px 0 12px 0;
}
</style>