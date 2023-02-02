<script>
import { mapState } from 'pinia';
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

  computed: { ...mapState(useToolsStore, ['resources']) }
};
</script>

<template>
  <section id="tools">
    <!-- top nav buttons -->
    <nav class="nav">
      <template v-for="(resource, index) in resources" :key="index">
        <ResourceButton :resource="resource" />
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
  height: 300px;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.bottom-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: rgb(63, 63, 63);
}
</style>