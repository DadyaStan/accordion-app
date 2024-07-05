<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

const props = defineProps<{
    label: string;
}>();

const modelValue = defineModel<string>('modelValue', {
    type: String,
    required: true,
});
</script>

<template>
    <div class="regular-input">
        <label class="regular-input__label">
            {{ props.label }}
        </label>
        <input type="text" class="regular-input__input" v-model="modelValue" />
    </div>
</template>

<style lang="scss">
.regular-input {
    display: flex;
    flex-direction: column;

    &__label {
        color: $light-grey;
        font-size: 12px;
        margin-bottom: 3px;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__input {
        color: #696969;
        font-family: 'Roboto', 'sans-serif';
        height: 32px;
        border: 1px solid $light-grey;
        border-radius: 5px;
        padding-left: 10px;
    }
}
</style>
