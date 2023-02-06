<script>
import { onUnmounted, provide } from 'vue';

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

  setup(props) {
    provide('resource', props.resource);

    const moveable = {
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
    };
    const moveableStates = {
      scalable:  'Scalable',
      resizable: 'Resizable',
      warpable:  'Warpable',
    };

    function handleDrag({ target, transform }) {
      target.style.transform = transform;
    }

    function handleResize({
      target, width, height, transform
    }) {
      target.style.width = `${ width }px`;
      target.style.height = `${ height }px`;
      target.style.transform = transform;
    }

    function clearAllStates() {
      Object.keys(moveableStates).forEach((key) => {
        moveable[key] = false;
      });
    }

    onUnmounted(() => clearAllStates());

    return {
      moveable,
      handleDrag,
      handleResize
    };
  }
};
</script>

<template>
  <template v-if="resource.items" >
    <Moveable
      v-for="(item, id, index) in resource.items"
      :key="id + index"
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
        <ResourceCard :item="item" :id="id" />
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