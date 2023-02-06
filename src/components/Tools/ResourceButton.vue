<script>
import { useToolsStore } from '@/stores/tools';

export default {
  props: {
    resource: {
      type:     Object,
      required: true
    }
  },

  setup(props) {
    const store = useToolsStore();

    function add() {
      const id = randomString();
      const out = { [id]: {} };

      store.addResource({
        kind:  props.resource.kind,
        value: out
      });
    }

    function capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function randomString() {
      return Math.random().toString(32).slice(2);
    }

    return {
      add,
      capitalize
    };
  }
};
</script>

<template>
  <div>
    <button @click="add">
      Add {{ capitalize(resource.kind) }}
    </button>
  </div>
</template>