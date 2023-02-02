<script>
import { ref, watch } from 'vue';

import ArrayType from './Array.vue';
import NumberType from './Number.vue';
import StringType from './String.vue';


const TEXTURE = {
  color: {
    r: [],
    g: [],
    b: []
  },
  src:   { input: '' },
  shape: {
    sides:     0,
    radius:    0,
    smoothing: 0
  }
};

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
    }
  },

  components: {
    ArrayType,
    NumberType,
    StringType
  },

  setup(props, context) {
    const inputValue  = ref(props.functionValue);

    const colorValues = ref(inputValue.value.color);
    const srcValue    = ref(inputValue.value.src);
    const shapeValues = ref(inputValue.value.shape);

    watch(inputValue, () => {
      const out = { [props.functionKey]: inputValue.value };

      context.emit('update', out);
    }, { deep: true });


    return {
      inputValue,
      colorValues,
      srcValue,
      shapeValues
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
        <ArrayType :functionKey="name" :functionValue="color" />
      </template>
    </div>

    <!-- src -->
    <div class="src">
      <template v-for="(src, name, srcIndex) in srcValue" :key="srcIndex">
        <StringType :functionKey="name" :functionValue="src" />
      </template>
    </div>

    <!-- shape -->
    <div class="shape">
      <template v-for="(shape, name, sIndex) in shapeValues" :key="sIndex">
        <NumberType :functionKey="name" :functionValue="shape" />
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