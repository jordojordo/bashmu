<script>
import { ref, watch } from 'vue';

/*
  TODO:
  Change string type to be option select with source/buffer options
*/

export default {
  name: 'StringType',

  props: {
    functionKey: {
      type:     String,
      required: true
    },
    functionValue: {
      type:     String,
      required: true
    }
  },

  setup(props, context) {
    const inputValue = ref(props.functionValue);

    watch(inputValue, () => {
      const out = { [props.functionKey]: inputValue.value };

      context.emit('update', out);
    });

    return { inputValue };
  },
};
</script>

<template>
  <div class="string">
    <label for="string-input">{{ functionKey }}</label>
    <input type="text" name="string-input" v-model="inputValue">
  </div>
</template>

<style scoped>
.string {
  display: flex;
  flex-direction: column;
}

.string input {
  width: 80%;
}
</style>