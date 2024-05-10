<template>
  <div>
    <h2>Tareas del proyecto "{{ taksList.name }}"</h2>
    <div>
      <table class="tasks-table">
        <thead class="title">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody v-if="taksList.tasks.length">
          <tr v-for="item in taksList.tasks" :key="item._id">
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
              <AtomButton class="button-list" text="Editar" @clicked="editTask(item)" />
              <AtomButton class="button-list button-error" text="Eliminar" @clicked="deleteTasks(item._id)" aria-label="Eliminar tarea" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4">
              <span>No cuentan tareas</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="taksList.tasks.length" class="graph">
        <h2>Estadisticas</h2>
        <div class="content-chart">
          <AtomChart class="chart" :labels="statusTask" :series="[{data:series}]" type="bar"/>
          <AtomChart class="chart" :labels="statusTask" :series="series"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import AtomButton from '@/components/atoms/AtomButton.vue';
import AtomChart from '@/components/atoms/AtomChart.vue';

const store = useStore();
const route = useRoute();

const idProject = route.params.id;
const taksList = computed(() => {
  let projects = store.getters['projects/tasksList'](idProject);
  return projects;
});

const deleteTasks = (idTask) => {
  store.dispatch('projects/deleteTask', {idProject, idTask});
}

const emit = defineEmits(['clickedEdit']);

const editTask = (product) => {
  emit('clickedEdit', product);
}

const statusCounts = computed(() => {
    const counts = { '0': 0, '1': 0, '2': 0 };
    taksList.value.tasks.forEach(item => {
        counts[item.status._id]++;
    });
    return counts;
});

const series = computed(() => Object.values(statusCounts.value))
const statusTask = {
    labels: ['Pendiente', 'En progreso', 'Completada']
};
</script>

<style scoped>
.tasks-table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
}

.tasks-table th,
.tasks-table td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: left;
  word-break: break-word;
}

.tasks-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
}

.tasks-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tasks-table tr:hover {
  background-color: #ddd;
}

.button-list {
  margin-left: 5px;
}

.tasks-table td .title-resoponsive {
  display: none;
}

.tasks-table .title {
  display: contents;
}

.tasks-table .row-actions {
    text-align: center;
}

.graph {
  padding-top: 20px;
}

@media (max-width: 768px) {
 .tasks-table th,
 .tasks-table td {
    display: block;
  }

 .tasks-table th::before,
 .tasks-table td::before {
    content: attr(data-label);
    font-weight: bold;
    display: block;
  }
  .tasks-table  td .title-resoponsive {
    display: inline;
    font-weight: 600;
  }

  .tasks-table .title {
    display: none;
  }
}

.content-chart {
  width: 100%;
  margin-top: 5%;
  display: flex;
}

.content-chart .chart {
  width: 40%;
  margin: auto;
}

@media (max-width: 1024px) {
  .content-chart {
    display: inline-block;
  }

  .content-chart .chart {
    width: 80%;
  }
  
}
@media (max-width: 425px) {
  .content-chart {
    display: inline-block;
  }

  .content-chart .chart {
    width: 100%;
  }
}

</style>