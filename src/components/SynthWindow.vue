<script>
import { computed, onMounted, ref, watch } from 'vue';
import HydraSynth from 'hydra-synth';
import flatMap from 'lodash/flatMap';

import { useToolsStore } from '@/stores/tools';
import isEmpty from 'lodash/isEmpty';

export default {
  setup() {
    const store = useToolsStore();

    const hydra = ref(null);
    const synth = ref(null);

    const height = computed(() => window.innerHeight);
    const width  = computed(() => window.innerWidth);

    const sources   = computed(() => store.sources);
    const buffers   = computed(() => store.buffers);
    const renders   = computed(() => store.renders);

    onMounted(() => {
      synth.value = new HydraSynth({
        'detectAudio': false,
        'canvas':      hydra.value
      }).synth;

      synth.value
        .src(o0)
        .modulate(noise(3), 0.005)
        .blend(shape(4), 0.01)
        .out(o0);

      store.initHydra(synth.value);
    });

    watch(sources, (neu) => {
      for ( const item of neu.items ) {
        const methodString = Object.keys(item)[0];
        const args = flatMap(Object.values(item)[0]);

        if ( !isEmpty(args) ) {
          synth.value[methodString](...args).out();
        }
      }
    }, { deep: true });

    return {
      store,
      hydra,
      height,
      width,
      buffers,
      sources,
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