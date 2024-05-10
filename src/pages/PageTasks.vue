<!-- ProjectsPage.vue -->
<template>
    <TemplateTaskPage>
        <template #title>
            <AtomButton class="button-list button-back" text="◀ Regresar" @click="this.$router.push('/')"/>
            <h1>Gestion de tareas</h1>
        </template>
        <template #form>
            <MoleculeFormTasks :dataEdit="dataEdit"/>
        </template>
        <template #list>
            <OrganismTableTasks @clickedEdit="edit"/>
        </template>
    </TemplateTaskPage>
</template>

<script setup>
import { ref } from 'vue';

import TemplateTaskPage from '@/template/TemplateTaskPage.vue';
import OrganismTableTasks from '@/components/organisms/OrganismTableTasks.vue';
import MoleculeFormTasks from '@/components/molecules/MoleculeFormTasks.vue';
import AtomButton from '@/components/atoms/AtomButton.vue'


const dataEdit = ref({})

const edit = (product) => {
    dataEdit.value = product;
}
</script>
