<script>
import { ref } from 'vue';
import { useToolsStore } from '@/stores/tools';

export default {
  setup() {
    const store = useToolsStore();

    const renders = ref(store.renders);

    function add() {
      if ( renders.value.length < 4 ) {
        renders.value.push('');
      }
    }

    function remove(i) {
      renders.value.splice(i, 1);
    }

    return {
      add,
      remove,
      renders
    };
  },
};
</script>

<template>
  <div>
    <div class="container">
      <label>Renderers: {{ renders }}</label>

      <template v-for="(render, index) in renders" :key="index">
        <div class="row">
          <input type="text" name="render-input" v-model="renders[index]">
          <button @click="remove(index)">Remove</button>
        </div>
      </template>

      <button v-if="renders.length < 4" @click="add">Add Renderer</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  color: honeydew;
  min-width: 280px;
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