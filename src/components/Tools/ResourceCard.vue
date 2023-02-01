<script>
import { ref } from 'vue';

import { useToolsStore } from '@/stores/tools';

import ResourceSelect from './Resources/ResourceSelect.vue';

export default {
  props: {
    item: {
      type:     Object,
      required: true
    },
    itemIndex: {
      type:     Number,
      required: true
    },
    resourceKind: {
      type:     String,
      required: true
    }
  },

  components: { ResourceSelect },

  setup(props, context) {
    const store = useToolsStore();
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
      <span>{{ resourceKind + itemIndex }}</span>

      <img
        src="../../assets/icons/icon-close.png"
        alt="close"
        class="icon-close"
        @click="remove(itemIndex)"
      />
    </div>

    <div class="body">
      <ResourceSelect :value="item" :kind="resourceKind" :index="itemIndex" />
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

/* .icon-close {
  position: absolute;
  right: 0;
  margin: 2px;
} */
</style>