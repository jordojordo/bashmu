<script>
import { mapActions } from 'pinia';

import { useToolsStore } from '../../stores/tools';

export default {
  props: {
    resource: {
      type: Object,
      required: true
    }
  },

  methods: {
    ...mapActions(useToolsStore, ['addResource']),

    add() {
      this.addResource({ kind: this.resource.kind, value: {} })
    },

    capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }
}
</script>

<template>
  <div>
    <button @click="add">Add {{ capitalize(resource.kind) }}</button>
  </div>
</template>