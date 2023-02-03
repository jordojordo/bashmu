<script>
import { defineAsyncComponent, inject, reactive } from 'vue';
import capitalize from 'lodash/capitalize';

import { useToolsStore } from '@/stores/tools';

export default {
  props: {
    schema: {
      type:    Object,
      default: () => {}
    },
    selectedFunction: {
      type:     String,
      required: true
    },
    value: {
      type:     Object,
      required: true
    }
  },

  setup(props) {
    const store = useToolsStore();
    const functionItem = inject('functionItem');

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

        if ( Object.hasOwn(props.schema, 'texture') ) {
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

    const updateFunction = (event) => {
      store.$patch((state) => {
        const resources = state.hydraResources;
        const out = resources.find((r) => r.kind === functionItem.kind);

        for ( const key of Object.keys(event) ) {
          out.items[functionItem.index][props.selectedFunction][key] = event[key];
        }
      });
    };

    return {
      state,
      store,
      componentForType,
      getComponentValue,
      updateFunction
    };
  },
};
</script>

<template>
  <div class="component-input" v-for="(val, name, index) in schema[selectedFunction]" :key="index">
    <component
      :is="componentForType(val)"
      :functionKey="name"
      :functionValue="getComponentValue(schema[selectedFunction], name)"
      @update="updateFunction"
    />
  </div>
</template>

<style scoped>
.component-input {
  margin: 12px 0 12px 0;
}
</style>