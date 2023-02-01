export const HYDRA = 'hydra';

export const HYDRA_ENUM = {
  BUFFER:           'buffer',
  RENDER:           'render',
  SOURCE:           'source',
  GEOMETRY:         'geometry',
  COLOR:            'color',
  BLEND:            'blend',
  MODULATE:         'modulate',
  EXTERNAL_SOURCES: 'externalSources',
  SYNTH_SETTINGS:   'synthSettings',
  ARRAY:            'array',
  AUDIO:            'audio'
};

export const HYDRA_FUNCTIONS = {
  [HYDRA_ENUM.SOURCE]: {
    NOISE:    'noise',
    VORONOI:  'voronoi',
    OSC:      'osc',
    SHAPE:    'shape',
    GRADIENT: 'gradient',
    SRC:      'src',
    SOLID:    'solid'
  },
  [HYDRA_ENUM.GEOMETRY]: {
    ROTATE:   'rotate',
    SCALE:    'scale',
    PIXELATE: 'pixelate',
    REPEAT:   'repeat',
    REPEAT_X: 'repeatX',
    REPEAT_Y: 'repeatY',
    KALEID:   'kaleid',
    SCROLL_X: 'scrollX',
    SCROLL_Y: 'scrollY'
  },
  [HYDRA_ENUM.COLOR]: {
    POSTERIZE:  'posterize',
    SHIFT:      'shift',
    INVERT:     'invert',
    CONTRAST:   'contrast',
    BRIGHTNESS: 'brightness',
    LUMA:       'luma',
    THRESH:     'thresh',
    COLOR:      'color',
    SATURATE:   'saturate',
    HUE:        'hue',
    COLORAMA:   'colorama'
  },
  [HYDRA_ENUM.BLEND]: {
    ADD:   'add',
    LAYER: 'layer',
    BLEND: 'blend',
    MULT:  'mult',
    DIFF:  'diff',
    MASK:  'mask',
  },
  [HYDRA_ENUM.MODULATE]: {
    MODULATE_REPEAT:   'modulateRepeat',
    MODULATE_REPEAT_X: 'modulateRepeatX',
    MODULATE_REPEAT_Y: 'modulateRepeatY',
    MODULATE_KALEID:   'modulateKaleid',
    MODULATE_SCROLL_X: 'modulateScrollX',
    MODULATE_SCROLL_Y: 'modulateScrollY',
    MODULATE:          'modulate',
    MODULATE_SCALE:    'modulateScale',
    MODULATE_PIXELATE: 'modulatePixelate',
    MODULATE_ROTATE:   'modulateRotate',
    MODULATE_HUE:      'modulateHue'
  },
  [HYDRA_ENUM.SYNTH_SETTINGS]: {
    RENDER:         'render',
    UPDATE:         'update',
    SET_RESOLUTION: 'setResolution',
    HUSH:           'hush',
    SET_FUNCTION:   'setFunction',
    SPEED:          'speed',
    BPM:            'bpm',
    WIDTH:          'width',
    HEIGHT:         'height',
    TIME:           'time',
    MOUSE:          'mouse'
  }
};

/*
Saving for later if needed
  [HYDRA_ENUM.ARRAY]: {
    FAST:   'fast',
    SMOOTH: 'smooth',
    EASE:   'ease',
    OFFSET: 'offset',
    FIT:    'fit'
  },
  [HYDRA_ENUM.AUDIO]: {
    FFT:        'fft',
    SET_SMOOTH: 'setSmooth',
    SET_CUTOFF: 'setCutoff',
    SET_BINS:   'setBins',
    SET_SCALE:  'setScale',
    HIDE:       'hide',
    SHOW:       'show',
  },
  [HYDRA_ENUM.EXTERNAL_SOURCES]: {
    INIT:        'init',
    INIT_CAM:    'initCam',
    INIT_IMAGE:  'initImage',
    INIT_VIDEO:  'initVideo',
    INIT_STREAM: 'initStream',
    INIT_SCREEN: 'initScreen'
  }
*/
