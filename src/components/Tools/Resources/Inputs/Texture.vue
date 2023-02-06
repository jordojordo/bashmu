<script>
import { inject, ref } from 'vue';
import { useToolsStore } from '@/stores/tools';

import ArrayType from './Array.vue';
import NumberType from './Number.vue';
import StringType from './String.vue';

export default {
  name: 'TextureType',

  props: {
    functionKey: {
      type:     String,
      required: true
    },
    functionValue: {
      type:     Object,
      required: true
    },
    selectedFunction: {
      type:     String,
      required: true
    }
  },

  components: {
    ArrayType,
    NumberType,
    StringType
  },

  setup(props) {
    const store = useToolsStore();
    const resource     = inject('resource');
    const functionItem = inject('functionItem');

    const inputValue  = ref(props.functionValue);

    const colorValues = ref(inputValue.value.color);
    const srcValue    = ref(inputValue.value.src);
    const shapeValues = ref(inputValue.value.shape);

    const updateTexture = (type, event) => {
      store.$patch(() => {
        const toUpdate = resource.items[functionItem.id][props.selectedFunction].texture;

        toUpdate[type][event.functionKey] = event.event;
      });
    };

    return {
      inputValue,
      colorValues,
      srcValue,
      shapeValues,
      updateTexture,
    };
  },
};
</script>

<template>
  <div class="texture">
    <h4>texture</h4>
    <!-- color -->
    <div class="color">
      <template v-for="(color, name, cIndex) in colorValues" :key="cIndex">
        <ArrayType :functionKey="name" :functionValue="color" @update="e => updateTexture('color', e)" />
      </template>
    </div>

    <!-- src -->
    <div class="src">
      <template v-for="(src, name, srcIndex) in srcValue" :key="srcIndex">
        <StringType :functionKey="name" :functionValue="src" @update="e => updateTexture('src', e)" />
      </template>
    </div>

    <!-- shape -->
    <div class="shape">
      <template v-for="(shape, name, sIndex) in shapeValues" :key="sIndex">
        <NumberType :functionKey="name" :functionValue="shape" @update="e => updateTexture('shape', e)" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.texture {
  padding: 6px;
  border: 1px solid;
}

.color {
  margin-bottom: 6px;
}

.src {
  margin-bottom: 6px;
}
</style>