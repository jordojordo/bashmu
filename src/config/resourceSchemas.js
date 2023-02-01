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

const TEXTURE = {
  color: {
    r: [Number, Array],
    g: [Number, Array],
    b: [Number, Array]
  },
  src:   { input: [String, Object] },
  shape: {
    sides:     Number,
    radius:    Number,
    smoothing: Number
  }
};

export const resourceSchemas = {
  [HYDRA_ENUM.BUFFER]: [String, Object],

  [HYDRA_ENUM.RENDER]: [String, Object],

  [HYDRA_ENUM.SOURCE]: {
    noise: {
      scale:  [Number, Time],
      offset: [Number, Time]
    },
    voronoi: {
      scale:    [Number, Time],
      speed:    [Number, Time],
      blending: [Number, Time]
    },
    osc: {
      frequency: [Number, Time],
      sync:      [Number, Array],
      offset:    [Number, Time]
    },
    shape: {
      sides:     Number,
      radius:    Number,
      smoothing: Number
    },
    gradient: { speed: [Number, Array] },
    src:      { input: [String, Object] },
    solid:    {
      r: [Number, Array],
      g: [Number, Array],
      b: [Number, Array],
      a: [Number, Array]
    }
  },

  [HYDRA_ENUM.GEOMETRY]: {
    rotate: {
      angle: [Number, Time],
      speed: [Number, Time]
    },
    scale: {
      size:  [Number, Time],
      xMult: [Number, Array],
      yMult: [Number, Array]
    },
    pixelate: {
      pixelX: [Number, Array],
      pixelY: [Number, Array]
    },
    repeat: {
      repeatX: Number,
      repeatY: Number,
      offsetX: Number,
      offsetY: Number
    },
    repeatX: {
      reps:   [Number, Array],
      offset: [Number, Time]
    },
    repeatY: {
      reps:   [Number, Array],
      offset: [Number, Time]
    },
    kaleid:  { nSides: Number },
    scrollX: {
      scrollX: [Number, Array],
      speed:   [Number, Time]
    },
    scrollY: {
      scrollY: [Number, Array],
      speed:   [Number, Time]
    }
  },

  [HYDRA_ENUM.COLOR]: {
    posterize: {
      bins:  [Number, Array],
      gamma: [Number, Array]
    },
    shift: {
      r: Number,
      g: Number,
      b: Number,
      a: Number
    },
    invert:     { amount: [Number, Array] },
    contrast:   { amount: [Number, Time] },
    brightness: { amount: [Number, Time] },
    luma:       {
      threshold: [Number, Array],
      tolerance: [Number, Array]
    },
    thresh: {
      threshold: [Number, Time],
      tolerance: [Number, Array]
    },
    color: {
      r: [Number, Array],
      g: [Number, Array],
      b: [Number, Array]
    },
    saturate: { amount: [Number, Time] },
    hue:      { hue: [Number, Time] },
    colorama: { amount: [Number, Array] }
  },

  [HYDRA_ENUM.BLEND]: {
    add: {
      texture: TEXTURE,
      amount:  [Number, Array]
    },
    layer: { texture: TEXTURE },
    blend: {
      texture: TEXTURE,
      amount:  [Number, Array]
    },
    mult: {
      texture: TEXTURE,
      amount:  [Number, Array]
    },
    diff: { texture: TEXTURE },
    mask: {
      texture: TEXTURE,
      reps:    [Number, Array],
      offset:  [Number, Time]
    }
  },

  [HYDRA_ENUM.MODULATE]: {
    modulateRepeat: {
      texture: TEXTURE,
      repeatX: Number,
      repeatY: Number,
      offsetX: Number,
      offsetY: Number
    },
    modulateRepeatX: {
      texture: TEXTURE,
      reps:    [Number, Array],
      offset:  [Number, Time]
    },
    modulateRepeatY: {
      texture: TEXTURE,
      reps:    [Number, Array],
      offset:  [Number, Time]
    },
    modulateKaleid: {
      texture: TEXTURE,
      nSides:  Number
    },
    modulateScrollX: {
      texture: TEXTURE,
      speed:   [Number, Time]
    },
    modulateScrollY: {
      texture: TEXTURE,
      speed:   [Number, Time]
    },
    modulate: {
      texture: TEXTURE,
      amount:  [Number, Array]
    },
    modulateScale: {
      texture:  TEXTURE,
      multiple: Number,
      offset:   [Number, Time]
    },
    modulatePixelate: {
      texture:  TEXTURE,
      multiple: Number,
      offset:   [Number, Time]
    },
    modulateRotate: {
      texture:  TEXTURE,
      multiple: Number,
      offset:   [Number, Time]
    },
    modulateHue: {
      texture: TEXTURE,
      amount:  [Number, Array]
    }
  }
};
