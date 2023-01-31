<script>
import { mapActions, mapState } from 'pinia';
import HydraSynth from 'hydra-synth';

import { useToolsStore } from '../stores/tools';

export default {
  mounted() {
    const synth = new HydraSynth({
      detectAudio: true,
      canvas: this.$refs.hydra
    }).synth;

    synth.osc(4, 0.1, 1.2).out();
    this.initHydra(synth);
  },

  computed: {
    ...mapState(useToolsStore, ['hydraState']),

    height() {
      return window.innerHeight;
    },

    width() {
      return window.innerWidth;
    }
  },

  methods: {
    ...mapActions(useToolsStore, ['initHydra'])
  }
}
</script>

<template>
  <div>
    <canvas id="hydra" ref="hydra" :height="height" :width="width" />
  </div>
</template>