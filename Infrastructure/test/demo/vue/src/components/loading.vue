<template>
  <div class="loading">
    <span class="loading__indicator" :style="style" />
    <span class="loading__text" v-show="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    size: {
      type: Number,
      default: 26
    },
    indicatorColor: {
      type: String,
      default: "#1989FA"
    }
  },
  computed: {
    style() {
      return {
        width: this.size + "px",
        height: this.size + "px",
        borderColor: this.indicatorColor,
        borderBottomColor: "transparent"
      };
    }
  }
};
</script>

<style lang="scss">
.loading {
  display: inline-flex;
  align-items: center;

  &__indicator {
    border-radius: 100%;
    margin: 2px;
    border: 2px solid;
    background: transparent !important;
    display: inline-block;
    animation: rotate 0.75s 0s linear infinite;
  }

  &__text {
    margin-left: 10px;
    font-size: 17px;

    &--vertical {
      margin-left: 0;
      margin-top: 5px;
    }
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>