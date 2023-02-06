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
    const resource = inject('resource');

    const selectedFunction = ref('');

    watch(selectedFunction, (neu, old) => {
      let schema = null;

      for ( const key in resourceSchemas ) {
        if ( key === resource.kind ) {
          schema = structuredClone(resourceSchemas[key][selectedFunction.value]);
        }
      }

      if ( old ) {
        store.cleanFunction({
          resource,
          id:               functionItem.id,
          selectedFunction: old
        });
      }

      if ( schema ) {
        store.addFunction({
          resource,
          id:       functionItem.id,
          item:     functionItem.item,
          multiple: false, // TODO: need ability to add multiple functions to item
          schema:   { [selectedFunction.value]: schema }
        });
      }
    });

    const functionOptions = computed(() => {
      const functionType = HYDRA_FUNCTIONS[resource.kind];

      return functionType;
    });

    return {
      store,
      functionOptions,
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