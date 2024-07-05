<template>
  <div class="accordion">
    <div @click="toggle" class="accordion-header" :class="{ 'accordion-header_active': isOpen }">
      <div class="accordion-header__arrow" :class="{ 'accordion-header__arrow_active': isOpen }">
        <svg width="21" height="11" viewBox="0 0 21 11" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M19.4606 0.229403L20.3893 1.07055C20.727 1.37642 20.727 1.83522 20.3893 2.14109L11.3559 10.3231C11.1026 10.5525 10.8494 10.5525 10.5117 10.4761C10.2584 10.5525 9.92069 10.4761 9.75184 10.3231L0.718433 2.14109C0.380737 1.83522 0.380737 1.37642 0.718433 1.07055L1.6471 0.229403C1.9848 -0.0764676 2.49134 -0.0764676 2.82904 0.229403L10.5961 7.26442L18.3631 0.229403C18.7008 -0.0764676 19.2074 -0.0764676 19.5451 0.229403L19.4606 0.229403Z" />
        </svg>
      </div>
      <slot name="accordionHeader"></slot>
    </div>
    <transition name="accordion">
      <div v-show="isOpen" class="accordion__content">
        <slot name="accordionBody"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../types/User';

const isOpen = ref<boolean>(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const props = defineProps<{
  user: User;
}>();
</script>

<style lang="scss">
.accordion {
  margin-bottom: 15px;
}

.accordion__content {
  overflow: hidden;
  width: 100%;
  padding: 15px 40px;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.accordion-header {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid $light-grey;
    border-radius: 5px;
    cursor: pointer;

    &__item {
        width: 24%;
        color: $text-grey;
    }

    &__arrow {
        width: 4%;
        position: relative;

        & svg {
            fill: $text-grey;
            position: absolute;
            top: -4px;
            left: 14px;
        }

        &_active svg {
            fill: $active-yellow;
        }
    }

    &_active {
        border: 1px solid $active-yellow;
    }
}
</style>