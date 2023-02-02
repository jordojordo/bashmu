<script>
import { ref, watch } from 'vue';

export default {
  name: 'ArrayType',

  props: {
    functionKey: {
      type:     String,
      required: true
    },
    functionValue: {
      type:     Array,
      required: true
    }
  },

  setup(props, context) {
    const inputValue = ref(props.functionValue);

    watch(inputValue, () => {
      const out = { [props.functionKey]: inputValue.value };

      context.emit('update', out);
    }, { deep: true });

    function add() {
      inputValue.value.push(0);
    }

    function remove(i) {
      inputValue.value.splice(i, 1);
    }

    return {
      add,
      remove,
      inputValue
    };
  },
};
</script>

<template>
  <div class="container">
    <label>{{ functionKey }}</label>

    <template v-for="(item, index) in inputValue" :key="index">
      <div class="row">
        <input type="number" name="number-input" v-model.number="inputValue[index]">
        <button @click="remove(index)">Remove</button>
      </div>
    </template>

    <button @click="add">Add</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container label {
  margin-bottom: 3px;
}

.container button {
  width: 50px;
}

.row {
  display: flex;
  align-items: center;
}

.row input {
  width: 50%;
  margin: 2px 3px 2px 0;
}

.row button {
  width: 75px
}
</style>