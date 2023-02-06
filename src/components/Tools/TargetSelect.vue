<script>
import { computed, inject, ref, watch } from 'vue';
import isEmpty from 'lodash/isEmpty';

import { useToolsStore } from '@/stores/tools';

export default {
  setup() {
    const store = useToolsStore();
    const resource = inject('resource');
    const functionItem = inject('functionItem');

    const sourceName     = ref('');
    const selectedSource = ref('');
    const selectedBuffer = ref('');

    const sourceNameOptions = ['o0', 'o1', 'o2', 'o3'];

    const isSourceCard = computed(() => {
      return !!store.sources.items[functionItem.id];
    });

    const sources = computed(() => store.sources.sourceNames);
    const buffers = computed(() => store.buffers);
    // const renders = computed(() => store.renders);

    watch(sourceName, () => {
      store.addSourceName({
        id:    functionItem.id,
        value: sourceName.value
      });
    });

    function addTargetSource(e) {
      store.addSourceTarget({
        resource,
        id:     functionItem.id,
        source: e.target.value // not the best option
      });
    }

    /*
      TODO: change this to mimic the function above
    */
    watch(selectedBuffer, () => {
      store.addBufferTargets({
        resource,
        id:     functionItem.id,
        buffer: selectedBuffer.value
      });
    });

    return {
      isSourceCard,
      isEmpty,
      sources,
      buffers,
      // renders,
      sourceName,
      sourceNameOptions,
      selectedSource,
      selectedBuffer,
      addTargetSource
    };
  }
};
</script>

<template>
  <div class="target">
    <div class="source">
      <template v-if="isSourceCard">
        <div>
          <label for="source-name">Source Name:</label>
          <select name="source-name" id="source-name" v-model="sourceName">
            <option v-for="source in sourceNameOptions" :key="source" :value="source">
              {{ source }}
            </option>
          </select>
        </div>
      </template>

      <template v-if="!isEmpty(sources)">
        <div>
          <label for="source-target">Target Source:</label>
          <select name="source-target" :value="selectedSource" @input="e => addTargetSource(e)">
            <option v-for="[key, value] in Object.entries(sources)" :value="key" :key="key">
              {{ value }}
            </option>
          </select>
        </div>
      </template>
    </div>

    <template v-if="buffers.length">
      <div class="buffer">
        <label for="buffer-target">Target Buffer:</label>
        <select name="buffer-target" v-model="selectedBuffer">
          <template v-for="(value, key, index) in buffers" :key="index">
            <option :value="value">{{ value }}</option>
          </template>
        </select>
      </div>
    </template>

  </div>
</template>

<style scoped>
.target {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.target select, .target input {
  width: 70%;
  margin-bottom: 10px;
}
</style>