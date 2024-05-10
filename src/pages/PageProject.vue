<!-- ProjectsPage.vue -->
<template>
    <TemplateProjectPage>
        <template #title>
            <h1> {{ statusForm }} proyectos </h1>
        </template>
        <template #form>
            <MoleculeForm :dataEdit="dataEdit" />
        </template>
        <template #filter>
            <h2>Proyectos creadros</h2>
            <div class="filters">
                <div>
                    <AtomSelect label="Buscar por estado" :options="optionsSelect" v-model="filterStatus"/>
                </div>
                <div>
                    <AtomInput v-model="searchName" label="Buscar por nombre" type="search" placeholder="🔎 Buscar..."/>
                </div>
            </div>
        </template>
        <template #list>
            <OrganismTableProjects @clickedEdit="edit" :items="filteredProjects"/>
        </template>
    </TemplateProjectPage>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';

import TemplateProjectPage from '@/template/TemplateProjectPage.vue';
import OrganismTableProjects from '@/components/organisms/OrganismTableProjects.vue';
import MoleculeForm from '@/components/molecules/MoleculeForm.vue';
import AtomInput from '@/components/atoms/AtomInput.vue';
import AtomSelect from '@/components/atoms/AtomSelect.vue';


const store = useStore();

const filterStatus = ref({label: 'Todos', _id: '0'});
const searchName = ref('');
const optionsSelect = ref([
    {label: 'Todos', _id: '0'},
    {label: 'Activos', _id: '1'},
    {label: 'Inactivos', _id: '2'}
]);

const dataEdit = ref({})

const edit = (product) => {
    dataEdit.value = product;
}

const statusForm = computed(() => {
    const status = _.isEmpty(dataEdit.value) ? 'Crear' : 'Editar';
    return status;
});

const filteredProjects = computed(() => {
    let projects = store.getters['projects/projectsByStatus'](filterStatus.value);
    if (searchName.value) {
        projects = store.getters['projects/projectsByName'](searchName.value);
    }
    return projects;
});

</script>

<style scoped>

.filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
}

.filters > div {
    flex: 1 0 45%;
    margin: 5px;
}

</style>