<script>
import { computed, inject, ref, watch } from 'vue';

import { useToolsStore } from '@/stores/tools';
import { HYDRA_FUNCTIONS } from '@/types';
import { resourceSchemas } from '@/config/resourceSchemas';

import FunctionBody from './FunctionBody.vue';

export default {
  name: 'ResourceSelect',

  components: { FunctionBody },

  setup() {
    const store = useToolsStore();
    const functionItem = inject('functionItem');

    const selectedFunction = ref('');

    const functionValue = computed(() => {
      return store.functionValue({
        kind:  functionItem.kind,
        index: functionItem.index
      });
    });
    const functionSchema = computed(() => {
      return store.functionSchema({
        kind:  functionItem.kind,
        index: functionItem.index
      });
    });

    watch(selectedFunction, () => {
      let schema = null;

      for ( const key in resourceSchemas ) {
        if ( key === functionItem.kind ) {
          schema = resourceSchemas[key][selectedFunction.value];
        }
      }

      if ( schema ) {
        store.addFunction({
          kind:     functionItem.kind,
          index:    functionItem.index,
          multiple: false, // TODO: need ability to add multiple functions to item
          schema:   { [selectedFunction.value]: schema }
        });
      }
    });

    const functionOptions = computed(() => {
      const functionType = HYDRA_FUNCTIONS[functionItem.kind];

      return functionType;
    });

    return {
      store,
      functionOptions,
      functionValue,
      functionSchema,
      selectedFunction
    };
  },
};
</script>

<template>
  <div>
    <div class="header">
      <label for="functionSelect">Function Type:</label>

      <select v-model="selectedFunction">
        <template v-for="(value, key, index) in functionOptions" :key="index">
          <option :value="value">{{ value }}</option>
        </template>
      </select>
    </div>

    <div v-if="selectedFunction">
      <FunctionBody
        :value="functionValue"
        :schema="functionSchema"
        :selectedFunction="selectedFunction"
      />
    </div>
  </div>
</template>

<style scoped>
.header label {
  margin-right: 10px;
}
</style>