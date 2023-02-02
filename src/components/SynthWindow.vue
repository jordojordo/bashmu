<script>
import { computed, onMounted, ref, watch } from 'vue';
import HydraSynth from 'hydra-synth';

import { useToolsStore } from '@/stores/tools';

export default {
  setup() {
    const store = useToolsStore();

    const hydra = ref(null);
    const synth = ref(null);

    const height = computed(() => window.innerHeight);
    const width  = computed(() => window.innerWidth);

    const buffers   = computed(() => store.buffers);
    const renders   = computed(() => store.renders);

    const allFunctions = computed(() => store.allFunctions);

    onMounted(() => {
      synth.value = new HydraSynth({
        'detectAudio': false,
        'canvas':      hydra.value
      }).synth;

      synth.value.osc(4, 0.1, 1.2).out();
      store.initHydra(synth.value);
    });

    watch(allFunctions, (neu, old) => {
      console.log('### new functions: ', neu);
      console.log('# old functions: ', old);
    });

    return {
      store,
      hydra,
      height,
      width,
      buffers,
      allFunctions,
      renders
    };
  }
};
</script>

<template>
  <div>
    <canvas id="hydra" ref="hydra" :height="height" :width="width" />
  </div>
</template>