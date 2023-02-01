<script>
import { mapActions } from 'pinia';
import { useToolsStore } from '@/stores/tools';

import Moveable from './Moveable.vue';
import ResourceCard from './ResourceCard.vue';

export default {
  props: {
    resource: {
      type:     Object,
      required: true
    }
  },

  components: {
    Moveable,
    ResourceCard
  },

  data: () => ({
    moveable: {
      draggable:      true,
      throttleDrag:   1,
      resizable:      false,
      throttleResize: 1,
      keepRatio:      false,
      scalable:       true,
      throttleScale:  0.01,
      rotatable:      true,
      throttleRotate: 0.2,
      pinchable:      true,
      origin:         false,
    },
    states: {
      scalable:  'Scalable',
      resizable: 'Resizable',
      warpable:  'Warpable',
    },
    currentState: 'scalable',
  }),

  watch: {
    currentState(newState) {
      this.clearAllStates();
      this.moveable[newState] = true;
    },
  },

  methods: {
    ...mapActions(useToolsStore, ['addResource']),

    handleDrag({ target, transform }) {
      target.style.transform = transform;
    },

    handleResize({
      target, width, height, transform
    }) {
      target.style.width = `${ width }px`;
      target.style.height = `${ height }px`;
      target.style.transform = transform;
    },

    clearAllStates() {
      Object.keys(this.states).forEach((key) => {
        this.moveable[key] = false;
      });
    }
  }
};
</script>

<template>
  <template v-for="(item, index) in resource.items" :key="index">
    <Moveable
      v-if="resource.items.length"
      class="moveable"
      v-bind="moveable"
      :draggable="true"
      :resizable="true"
      :useResizeObserver="true"
      :individualGroupable="true"
      :snappable="true"
      :edge="[]"
      @drag="handleDrag"
      @resize="handleResize"
    >
      <template #resourceItem>
        <ResourceCard
          :item="item"
          :itemIndex="index"
          :resourceKind="resource.kind"
        />
      </template>
    </Moveable>
  </template>
</template>

<style scoped>
.moveable {
  position: relative;
  text-align: center;
  font-size: 40px;
  margin: 0 auto;
  font-weight: 100;
  letter-spacing: 1px;
}
</style>