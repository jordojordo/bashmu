<script>
import {
  computed, inject, ref, provide, onUnmounted
} from 'vue';
import isEmpty from 'lodash/isEmpty';

import { useToolsStore } from '@/stores/tools';

import ResourceSelect from './Resources/ResourceSelect.vue';
import TargetSelect from './TargetSelect.vue';

export default {
  props: {
    id: {
      type:     String,
      required: true
    },
    item: {
      type:    Object,
      default: () => {}
    }
  },

  components: {
    ResourceSelect,
    TargetSelect
  },

  setup(props, context) {
    const store = useToolsStore();
    const resource = inject('resource');

    provide('functionItem', {
      id:   props.id,
      item: props.item,
    });

    const resourceHeader = ref(null);

    context.emit('header', resourceHeader);

    function remove() {
      // @remove is handled in ./Moveable.vue
      context.emit('remove');

      store.removeResource({
        kind: resource.kind,
        id:   props.id
      });
    }

    onUnmounted(() => resourceHeader.value = null);

    const hasSourceTargets = computed(() => !isEmpty(resource.sourceTargets));

    return {
      store,
      remove,
      resource,
      hasSourceTargets
    };
  }
};
</script>

<template>
  <div class="card">
    <div class="header moveable-dimension" ref="resourceHeader">
      <span>{{ resource.kind }}</span>

      <img
        src="../../assets/icons/icon-close.png"
        alt="close"
        class="icon-close"
        @click="remove"
      />
    </div>

    <div class="body">
      <TargetSelect />
      <ResourceSelect v-if="hasSourceTargets" />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: gray;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3px;
}

.header {
  top: 0;
  margin-bottom: 10px;
  background-color: #666;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.body {
  padding: 10px;
}
</style>