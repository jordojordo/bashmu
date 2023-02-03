<script>
import { ref, provide } from 'vue';

import { useToolsStore } from '@/stores/tools';

import ResourceSelect from './Resources/ResourceSelect.vue';
import TargetSelect from './TargetSelect.vue';

export default {
  props: {
    item: {
      type:    Object,
      default: () => {}
    },
    itemIndex: {
      type:    Number,
      default: 0
    },
    resourceKind: {
      type:    String,
      defaunt: ''
    }
  },

  components: {
    ResourceSelect,
    TargetSelect
  },

  setup(props, context) {
    const store = useToolsStore();

    provide('functionItem', {
      kind:  props.resourceKind,
      index: props.itemIndex
    });

    const resourceHeader = ref(null);

    context.emit('header', resourceHeader);

    function remove(index) {
      context.emit('remove');
      store.removeResource({
        kind: props.resourceKind,
        index
      });
    }

    return {
      store,
      remove
    };
  }
};
</script>

<template>
  <div class="card">
    <div class="header moveable-dimension" ref="resourceHeader">
      <span>{{ resourceKind }} ({{ itemIndex + 1}})</span>

      <img
        src="../../assets/icons/icon-close.png"
        alt="close"
        class="icon-close"
        @click="remove(itemIndex)"
      />
    </div>

    <div class="body">
      <TargetSelect />
      <ResourceSelect :value="item" />
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