<script>
import { computed, onMounted, ref, watch } from 'vue';
import HydraSynth from 'hydra-synth';
import { plainToClassFromExist, plainToInstance } from 'class-transformer';
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

    // const resources = ref(store.resources);
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
      for ( const [id, resourceItem] of Object.entries(neu.items) ) {
        if ( !isEmpty(resourceItem) ) {
          // Source
          const args = flatMap(Object.values(resourceItem)[0]);
          const methodString = Object.keys(resourceItem)[0];
          const sourceName = neu.sourceNames[id];

          // Function items
          let modulations = {};
          const filteredResources = store.resources.filter((r) => {
            if ( r.kind !== HYDRA_ENUM.SOURCE ) {
              return Object.values(r.sourceTargets).includes(id);
            }
          });

          if ( filteredResources.length ) {
            // Find the corresponding functionItem that matches the source id
            filteredResources.map((resource) => {
              let resourceID = '';

              for ( const [key, value] of Object.entries(resource.sourceTargets)) {
                if ( value === id ) {
                  resourceID = key;
                }
              }

              Object.assign(modulations, resource.items[resourceID]);
            });

            if ( !isEmpty(modulations) ) {
              plainToClassFromExist(synth.value, modulations);
            }
          }

          if ( !isEmpty(args) && methodString !== 'src' ) {
            synth.value[methodString](...args).out(window[sourceName]);
          }
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