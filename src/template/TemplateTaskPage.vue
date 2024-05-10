<!-- ProjectsTemplate.vue -->
<template>
<div class="container">
    <slot name="title"></slot>
    <slot name="form"></slot>
    <slot name="list"></slot>
    <slot name="chart"></slot>
</div>
</template>
<style scoped>
.container {
    margin: auto;
    width: 75%;
}
</style>