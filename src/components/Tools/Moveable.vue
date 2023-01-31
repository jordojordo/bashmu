<script>
import Moveable, { EVENTS, PROPERTIES, METHODS } from 'moveable';

const watchReactiveProp = (key, deep) => ({
  handler(newValue) {
    const existingValue = this.moveable[key];
    if (existingValue === newValue) return;
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
    target: [HTMLElement, SVGElement],
    transformOrigin: [Array, String],
    dragTarget: [HTMLElement, SVGElement],
    container: {
      type: [HTMLElement, SVGElement],
      default: () => document.body,
    },

    draggable: Boolean,
    originDraggable: Boolean,
    resizable: Boolean,
    useResizeObserver: Boolean,
    individualGroupable: Boolean,
    rootContainer: HTMLElement,
    throttleDrag: Number,
    edgeDraggable: Boolean,
    snappable: Boolean,
    bounds: Object,
    edge: Array,
    dragArea: Boolean,
    origin: Boolean,
  },

  mounted() {
    this.moveable = new Moveable(this.$props.container, {
      ...this.$props,
      target: this.target || this.$el,
    });

    EVENTS.forEach((event) => {
      const kebabCaseEvent = event.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
      this.moveable.on(event, this.$emit.bind(this, kebabCaseEvent));
      this.moveable.on(event, this.$emit.bind(this, event));
    });
    
    window.addEventListener('resize', this.updateRect, { passive: true });
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateRect);
    this.moveable.destroy();
  },

  watch: {
    ...watchMoveableProps(),
  },

  methods: {
    methodMap() {
      const out = {};

      METHODS.forEach((name) => {
        out[name] = (...args) => this.moveable[name](...args);
      });
    },

    removeCard() {
      this.moveable.destroy();
    }
  },
};
</script>

<template>
  <div class="moveable-card" @remove="removeCard">
    <slot name="resourceItem" />
  </div>
</template>

<style scoped>
.moveable-card {
  min-width: 100px;
  min-height: 100px;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
</style>