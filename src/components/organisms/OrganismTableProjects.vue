<template>
<table class="project-table">
  <thead class="title">
    <tr>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Estatus</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody v-if="props.items.length">
    <tr v-for="item in props.items" :key="item._id">
      <td>
        <span class="title-resoponsive">Nombre: </span>
        <span> {{ item.name }} </span>
      </td>
      <td>
        <span class="title-resoponsive">Descripción: </span>
        <span> {{ item.description }} </span>
      </td>
      <td>
        <span class="title-resoponsive">Estatus: </span>
        <span> {{ item.status.label }} </span>
      </td>
      <td class="row-actions">
        <AtomButton class="button-list" text="Editar" @clicked="editProject(item)" />
        <AtomButton class="button-list button-error" text="Eliminar" @clicked="deleteProject(item._id)" />
        <AtomButton class="button-list button-warning" text="Agregar tareas" @clicked="a(item._id)" />
      </td>
    </tr>
  </tbody>
  <tbody v-else>
    <tr>
      <td colspan="4">
        <span>No se encuentran proyectos </span>
      </td>
    </tr>
  </tbody>
</table>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import AtomButton from '@/components/atoms/AtomButton.vue';

const store = useStore();
const router = useRouter();

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['clickedEdit']);

const editProject = (product) => {
  emit('clickedEdit', product);
}

const deleteProject = (_id) => {
  store.dispatch('projects/deleteProject', _id);
}

const a = (_id) => {
  router.push(`PageTasks/${_id}`);
}

</script>

<style scoped>
.project-table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
}

.project-table th,
.project-table td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: left;
  word-break: break-word;
}

.project-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
}

.project-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.project-table tr:hover {
  background-color: #ddd;
}

.button-list {
  margin-left: 5px;
}

.project-table td .title-resoponsive {
  display: none;
}

.project-table .title {
  display: contents;
}

.project-table .row-actions {
    text-align: center;
}

@media (max-width: 768px) {
 .project-table th,
 .project-table td {
    display: block;
  }

 .project-table th::before,
 .project-table td::before {
    content: attr(data-label);
    font-weight: bold;
    display: block;
  }
  .project-table  td .title-resoponsive {
    display: inline;
    font-weight: 600;
  }

  .project-table .title {
    display: none;
  }
}
</style>