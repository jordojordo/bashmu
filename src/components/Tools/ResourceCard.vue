<script>
import { mapActions } from 'pinia';
import { useToolsStore } from '../../stores/tools';

import Oscillator from './Resources/Oscillator.vue';

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    itemIndex: {
      type: Number,
      required: true
    },
    resourceKind: {
      type: String,
      required: true
    }
  },

  components: { Oscillator },

  created() {
    this.loadComponent();
  },

  data() {
    return {
      itemComponent: null
    }
  },

  methods: {
    ...mapActions(useToolsStore, ['removeResource']),

    capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },

    loadComponent() {
      this.itemComponent = this.capitalize(this.resourceKind);
    },

    remove(index) {
      this.$parent.$emit('remove')
      this.removeResource({ kind: this.resourceKind, index });
    },

    updateItem(e) {
      console.log('updateItem: ', e);
    }
  }
}

</script>

<template>
  <div class="card">
    <div class="header">
      <span>{{ capitalize(resourceKind) + itemIndex }}</span>

      <img
        src="../../assets/icons/icon-close.png"
        alt="close"
        class="icon-close"
        @click="remove(itemIndex)"
      />
    </div>

    <div class="body">
      <component :is="itemComponent" :value="item" @input="updateItem" />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: gray;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3px;
}

.header {
  top: 0;
  margin-bottom: 10px;
  background-color: #666;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* .icon-close {
  position: absolute;
  right: 0;
  margin: 2px;
} */
</style>