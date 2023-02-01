<script>
import { computed, ref, watch } from 'vue';

import { useToolsStore } from '@/stores/tools';
import { HYDRA_FUNCTIONS } from '@/types';
import { resourceSchemas } from '@/config/resourceSchemas';

import FunctionBody from './FunctionBody.vue';

export default {
  name: 'ResourceSelect',

  props: {
    index: {
      type:     Number,
      required: true
    },
    kind: {
      type:     String,
      required: true
    },
    value: {
      type:    Object,
      default: () => {}
    }
  },

  components: { FunctionBody },

  setup(props) {
    const store = useToolsStore();

    const selectedFunction = ref('');

    watch(selectedFunction, () => {
      let schema = null;

      for ( const key in resourceSchemas ) {
        if ( key === props.kind ) {
          schema = resourceSchemas[key][selectedFunction.value];
        }
      }

      if ( schema ) {
        store.addFunction({
          kind:  props.kind,
          index: props.index,
          schema,
        });
      }
    });

    const functionOptions = computed(() => {
      const functionType = HYDRA_FUNCTIONS[props.kind];

      return functionType;
    });

    const updateResource = (event) => {
      console.log('### updateResource event: ', event);

      return event;
    };

    return {
      store,
      functionOptions,
      selectedFunction,
      updateResource
    };
  },
};
</script>

<template>
  <div>
    <div>
      <label for="functionSelect">Function Type:</label>

      <select v-model="selectedFunction">
        <template v-for="(value, key, index) in functionOptions" :key="index">
          <option :value="value">{{ value }}</option>
        </template>
      </select>
    </div>

    <div v-if="functionComponent" @input="updateResource">
      <FunctionBody :value="value" />
    </div>
  </div>
</template>
