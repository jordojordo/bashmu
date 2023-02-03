<script>
import { computed } from 'vue';
import { useToolsStore } from '@/stores/tools';

import BufferInput from './BufferInput.vue';
import RenderInput from './RenderInput.vue';
import ResourceButton from './ResourceButton.vue';
import ResourceContainer from './ResourceContainer.vue';

export default {
  components: {
    BufferInput,
    RenderInput,
    ResourceButton,
    ResourceContainer
  },

  setup() {
    const store = useToolsStore();

    const resources = computed(() => [...store.resources].sort((a, b) => a.weight + b.weight));

    return { resources };
  }
};
</script>

<template>
  <section id="tools">
    <!-- top nav buttons -->
    <nav class="nav">
      <template v-for="(resource, index) in resources" :key="index">
        <ResourceButton class="resource-button" :resource="resource" />
      </template>
    </nav>

    <!-- moveable center -->
    <div>
      <template v-for="(resource, index) in resources" :key="index">
        <ResourceContainer :resource="resource" />
      </template>
    </div>

    <!-- bottom container -->
    <div class="bottom-container">
      <BufferInput />
      <RenderInput />
    </div>
  </section>
</template>

<style scoped>
#tools {
  height: auto;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 10px 0;
}

.resource-button {
  margin-right: 10px;
}

.bottom-container {
  bottom: 0;
  width: 100%;
  height: auto;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  background: rgb(63, 63, 63);
}
</style>