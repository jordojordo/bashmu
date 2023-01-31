<script>
import { mapState } from 'pinia';
import { useToolsStore } from '../../stores/tools';

import ResourceButton from './ResourceButton.vue';
import ResourceContainer from './ResourceContainer.vue';

export default {
  components: { ResourceButton, ResourceContainer },

  computed: {
    ...mapState(useToolsStore, ['resources']),
  }
}
</script>

<template>
  <section id="tools">
    <nav class="nav">
      <template v-for="(resource, index) in resources" :key="index">
        <ResourceButton :resource="resource" />
      </template>
    </nav>

    <div>
      <template v-for="(resource, index) in resources" :key="index">
        <ResourceContainer :resource="resource" />
      </template>
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
</style>