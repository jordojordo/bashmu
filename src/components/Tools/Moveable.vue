<script>
import Moveable, { EVENTS, PROPERTIES, METHODS } from 'moveable';
import kebabCase from 'lodash/kebabCase';

const watchReactiveProp = (key, deep) => ({
  handler(newValue) {
    const existingValue = this.moveable[key];

    if ( existingValue === newValue ) {
      return;
    }

    this.moveable[key] = newValue;
  },
  deep,
});

const watchMoveableProps = () => PROPERTIES.reduce((acc, prop) => {
  acc[prop] = watchReactiveProp(prop, true);

  return acc;
}, {});

export default {
  inheritAttrs: false,

  props: {
    // target:          [HTMLElement, SVGElement],
    transformOrigin: [Array, String],
    // dragTarget:      [HTMLElement, SVGElement],
    container:       {
      type:    [HTMLElement, SVGElement],
      default: () => document.body,
    },

    draggable:           Boolean,
    originDraggable:     Boolean,
    resizable:           Boolean,
    useResizeObserver:   Boolean,
    individualGroupable: Boolean,
    rootContainer:       HTMLElement,
    throttleDrag:        Number,
    edgeDraggable:       Boolean,
    snappable:           Boolean,
    bounds:              Object,
    edge:                Array,
    dragArea:            Boolean,
    origin:              Boolean,
  },

  data() {
    return { dragTarget: null };
  },

  mounted() {
    // Only drag the target from the header, which allows input use in body of card
    this.dragTarget = this.$el.firstElementChild.childNodes[0];

    this.moveable = new Moveable(this.$props.container, {
      ...this.$props,
      dragTarget: this.dragTarget,
      target:     this.target || this.$el
    });

    EVENTS.forEach((event) => {
      const kebabCaseEvent = kebabCase(event);

      this.moveable.on(event, this.$emit.bind(this, kebabCaseEvent));
      this.moveable.on(event, this.$emit.bind(this, event));
    });

    window.addEventListener('resize', this.updateRect, { passive: true });
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateRect);
    this.moveable.destroy();
  },

  watch: { ...watchMoveableProps() },

  methods: {
    methodMap() {
      const out = {};

      METHODS.forEach((name) => {
        out[name] = (...args) => this.moveable[name](...args);
      });
    },

    removeCard() {
      this.moveable.destroy();
    },

    updateTarget(event) {
      console.log('## updateTarget: ', event);
      this.dragTarget = event;
    }
  },
};
</script>

<template>
  <div class="moveable-card" @header="updateTarget" @remove="removeCard">
    <slot name="resourceItem" />
  </div>
</template>

<style scoped>
.moveable-card {
  min-width: 100px;
  min-height: 100px;
  width: 233px;
  height: auto;
  overflow: hidden;
  z-index: 99;
  position: absolute;
}
</style>