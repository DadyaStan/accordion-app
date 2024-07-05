<script setup lang="ts">
import buttonIcon from "@/assets/icons/button-icon.svg";

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <button @click="handleClick" class="ui-button">
    <img :src="buttonIcon" alt="buttonSvg">
  </button>
</template>

<style lang="scss">
.ui-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: $active-yellow;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
