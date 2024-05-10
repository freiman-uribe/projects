<template>
    <label for="">{{ props.label }}</label>
    <select class="select" v-model="model">
        <option class="options" v-for="(option, index) in optionsList" :key="index" :value="option">{{ option.label }}</option>
    </select>
</template>
<script setup>
import { defineProps, defineModel, computed, } from "vue";

const model = defineModel()

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    label: {
        type: String,
        default: ''
    }
});

const optionsList = computed(() => props.options);
</script>

<style scoped>

.select::-ms-expand {
 display: none;
}

.select {
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 12px 20px;
    margin: 8px 0;
    border: 2px solid #ccc;
    background: #fff;
    border-radius: 5px;
    font: inherit;
    line-height: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    background-repeat: no-repeat;
    background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
    background-position: right 15px top 1em, right 10px top 1em;
    background-size: 5px 5px, 5px 5px;
}

.select:focus {
 outline: none;
}

.select .options {
 padding: 1em;
}
</style>