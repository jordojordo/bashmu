import { HYDRA_ENUM } from '@/types';

export class Time {
  constructor(time) {
    this.time = time;
  }

  get currentTime() {
    return this.calcTime();
  }

  calcTime() {
    return ( ({ time }) => Math.sin(time) );
  }
}

export const TEXTURE = {
  color: {
    r: [],
    g: [],
    b: []
  },
  src:   { input: '' },
  shape: {
    sides:     0,
    radius:    0,
    smoothing: 0
  }
};

export const resourceSchemas = {
  [HYDRA_ENUM.BUFFER]: '',

  [HYDRA_ENUM.RENDER]: '',

  [HYDRA_ENUM.SOURCE]: {
    noise: {
      scale:  0,
      offset: 0
    },
    voronoi: {
      scale:    0,
      speed:    0,
      blending: 0
    },
    osc: {
      frequency: 0,
      sync:      [],
      offset:    0
    },
    shape: {
      sides:     0,
      radius:    0,
      smoothing: 0
    },
    gradient: { speed: [] },
    src:      { input: '' },
    solid:    {
      r: [],
      g: [],
      b: [],
      a: []
    }
  },

  [HYDRA_ENUM.GEOMETRY]: {
    rotate: {
      angle: 0,
      speed: 0
    },
    scale: {
      size:  0,
      xMult: [],
      yMult: []
    },
    pixelate: {
      pixelX: [],
      pixelY: []
    },
    repeat: {
      repeatX: 0,
      repeatY: 0,
      offsetX: 0,
      offsetY: 0
    },
    repeatX: {
      reps:   [],
      offset: 0
    },
    repeatY: {
      reps:   [],
      offset: 0
    },
    kaleid:  { nSides: 0 },
    scrollX: {
      scrollX: [],
      speed:   0
    },
    scrollY: {
      scrollY: [],
      speed:   0
    }
  },

  [HYDRA_ENUM.COLOR]: {
    posterize: {
      bins:  [],
      gamma: []
    },
    shift: {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    },
    invert:     { amount: [] },
    contrast:   { amount: 0 },
    brightness: { amount: 0 },
    luma:       {
      threshold: [],
      tolerance: []
    },
    thresh: {
      threshold: 0,
      tolerance: []
    },
    color: {
      r: [],
      g: [],
      b: []
    },
    saturate: { amount: 0 },
    hue:      { hue: 0 },
    colorama: { amount: [] }
  },

  [HYDRA_ENUM.BLEND]: {
    add: {
      texture: TEXTURE,
      amount:  []
    },
    layer: { texture: TEXTURE },
    blend: {
      texture: TEXTURE,
      amount:  []
    },
    mult: {
      texture: TEXTURE,
      amount:  []
    },
    diff: { texture: TEXTURE },
    mask: {
      texture: TEXTURE,
      reps:    [],
      offset:  0
    }
  },

  [HYDRA_ENUM.MODULATE]: {
    modulateRepeat: {
      texture: TEXTURE,
      repeatX: 0,
      repeatY: 0,
      offsetX: 0,
      offsetY: 0
    },
    modulateRepeatX: {
      texture: TEXTURE,
      reps:    [],
      offset:  0
    },
    modulateRepeatY: {
      texture: TEXTURE,
      reps:    [],
      offset:  0
    },
    modulateKaleid: {
      texture: TEXTURE,
      nSides:  0
    },
    modulateScrollX: {
      texture: TEXTURE,
      speed:   0
    },
    modulateScrollY: {
      texture: TEXTURE,
      speed:   0
    },
    modulate: {
      texture: TEXTURE,
      amount:  []
    },
    modulateScale: {
      texture:  TEXTURE,
      multiple: 0,
      offset:   0
    },
    modulatePixelate: {
      texture:  TEXTURE,
      multiple: 0,
      offset:   0
    },
    modulateRotate: {
      texture:  TEXTURE,
      multiple: 0,
      offset:   0
    },
    modulateHue: {
      texture: TEXTURE,
      amount:  []
    }
  }
};
