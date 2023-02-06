<script>
import { ref, watch } from 'vue';

export default {
  name: 'NumberType',

  props: {
    functionKey: {
      type:     String,
      required: true
    },
    functionValue: {
      type:     Number,
      required: true
    }
  },

  setup(props, context) {
    const inputValue = ref(props.functionValue);

    watch(inputValue, () => {
      context.emit('update', {
        functionKey: props.functionKey,
        event:       inputValue.value
      });
    });

    return { inputValue };
  },
};
</script>

<template>
  <div class="range">
    <label for="number-range">{{ functionKey }}</label>
    <div class="input-row">
      <input type="range" name="number-range" min="0" max="255" v-model.number="inputValue">
      <span>{{ inputValue }}</span>
    </div>
  </div>
</template>

<style scoped>
.range {
  display: flex;
  flex-direction: column;
}

.range input {
  width: 80%;
  margin-right: 6px;
}

.input-row {
  display: flex;
  flex-direction: row;
}
</style>