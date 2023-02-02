<script>
import { computed, inject, ref, watch } from 'vue';
import { useToolsStore } from '@/stores/tools';

export default {
  setup(props) {
    const store = useToolsStore();
    const functionItem = inject('functionItem');

    const selectedBuffer = ref('');

    const buffers = computed(() => store.buffers);
    const renders = computed(() => store.renders);

    const functionValue = computed(() => {
      return store.functionValue({
        kind:  functionItem.kind,
        index: functionItem.index
      });
    });

    watch(selectedBuffer, () => {
      store.addBufferTargets({
        kind:   functionItem.kind,
        index:  functionItem.index,
        buffer: selectedBuffer
      });
    });

    return {
      buffers,
      renders,
      selectedBuffer
    };
  }
};
</script>

<template>
  <div class="target">
    <label for="functionSelect">Target Buffer:</label>

      <select v-model="selectedBuffer">
        <template v-for="(value, key, index) in buffers" :key="index">
          <option :value="value">{{ value }}</option>
        </template>
      </select>
  </div>
</template>

<style scoped>
.target {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.target select {
  width: 70%;
}
</style>