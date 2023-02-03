<script>
import { ref } from 'vue';
import { useToolsStore } from '@/stores/tools';

export default {
  setup() {
    const store = useToolsStore();

    const buffers = ref(store.buffers);

    function add() {
      if ( buffers.value.length < 4 ) {
        buffers.value.push('');
      }
    }

    function remove(i) {
      buffers.value.splice(i, 1);
    }

    return {
      add,
      remove,
      buffers
    };
  },
};
</script>

<template>
  <div>
    <div class="container">
      <label>Buffers: {{ buffers }}</label>

      <template v-for="(buffer, index) in buffers" :key="index">
        <div class="row">
          <input type="text" name="buffer-input" v-model="buffers[index]">
          <button @click="remove(index)">Remove</button>
        </div>
      </template>

      <button v-if="buffers.length < 4" @click="add">Add Buffer</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  color: rgb(194, 255, 194);
  margin-right: 10px;
}

.container label {
  margin-bottom: 3px;
}

.container button {
  width: 150px;
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