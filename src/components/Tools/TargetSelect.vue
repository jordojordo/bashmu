<script>
import { computed, inject, ref, watch } from 'vue';

import { useToolsStore } from '@/stores/tools';
import { HYDRA_ENUM } from '@/types';

export default {
  setup() {
    const store = useToolsStore();
    const functionItem = inject('functionItem');

    const sourceName     = ref('');
    const selectedSource = ref('');
    const selectedBuffer = ref('');

    const isSourceCard = computed(() => functionItem.kind === HYDRA_ENUM.SOURCE);

    const sources = computed(() => store.sources.sourceNames);
    const buffers = computed(() => store.buffers);
    // const renders = computed(() => store.renders);

    watch(sourceName, () => {
      store.addSourceName({
        index: functionItem.index,
        name:  sourceName.value
      });
    });

    watch(selectedSource, () => {
      store.addSourceTarget({
        kind:   functionItem.kind,
        index:  functionItem.index,
        source: selectedSource.value
      });
    });

    watch(selectedBuffer, () => {
      store.addBufferTargets({
        kind:   functionItem.kind,
        index:  functionItem.index,
        buffer: selectedBuffer.value
      });
    });

    return {
      isSourceCard,
      sources,
      buffers,
      // renders,
      sourceName,
      selectedSource,
      selectedBuffer
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
          <input type="text" name="source-name" v-model="sourceName" />
        </div>
      </template>

      <template v-if="sources.length">
        <div>
          <label for="source-target">Target Source:</label>
          <select name="source-target" v-model="selectedSource">
            <option v-for="source in sources" :value="source" :key="source">
              {{ source }}
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