<script>
import { computed, onMounted, ref, watch } from 'vue';
import HydraSynth from 'hydra-synth';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';

import { useToolsStore } from '@/stores/tools';
import { HYDRA_ENUM } from '@/types';

export default {
  setup() {
    const store = useToolsStore();

    const hydra = ref(null);
    const synth = ref(null);

    const height = computed(() => window.innerHeight);
    const width  = computed(() => window.innerWidth);

    const resources = ref(store.resources);
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
        // Source
        const args = flatMap(Object.values(item)[0]);
        const methodString = Object.keys(item)[0];
        const itemIndex = neu.items.indexOf(item);
        const sourceName = neu.sourceNames[itemIndex];

        // Function items
        let modulations = {};
        const filteredResources = resources.value.filter((r) => r.kind !== HYDRA_ENUM.SOURCE);
        const targetSources = filteredResources.filter((r) => {
          if ( !isEmpty(r.sourceTargets) ) {
            return r.sourceTargets[itemIndex];
          }
        });

        if ( !isEmpty(targetSources) ) {
          targetSources.map((r) => {
            Object.assign(modulations, r.items[itemIndex]);
          });

          // console.log('## convertToMethod: ', convertToMethod(modulations));
        }
        if ( !isEmpty(args) ) {
          synth.value[methodString](...args).out(window[sourceName]);
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