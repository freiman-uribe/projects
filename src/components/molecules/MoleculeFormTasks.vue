<template>
  <div class="conten-form">
    <form @submit.prevent="addTask" class="form">
      <div class="form-group">
        <AtomInput
          label="Nombre (*)"
          v-model="newTask.name"
          type="text"
        />
        <div class="message-error" v-if="$v.name.$error"> {{ $v.name.required.$message }} </div>
        <AtomTexarea
          label="Descripcion (*)"
          v-model="newTask.description"
        />
        <div class="message-error" v-if="$v.name.$error"> {{ $v.description.required.$message }} </div>
  
        <AtomSelect label="Seleccione estado" :options="optionsSelect" v-model="newTask.status" />
      </div>
      <div class="form-actions">
        <AtomButton class="button" text="Enviar" type="submit" />
        <AtomButton class="button button-error" text="Cancelar" @clicked="resetForm()" />
      </div>
    </form>
  </div>
</template>
<script setup>
import { computed, ref, watch, defineProps } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import AtomInput from '../atoms/AtomInput.vue';
import AtomTexarea from '../atoms/AtomTexarea.vue';
import AtomSelect from '../atoms/AtomSelect.vue';
import AtomButton from '../atoms/AtomButton.vue';

const store = useStore();
const route = useRoute();

const props = defineProps({
    dataEdit: Object,
});

const newTask = ref({
  name: '',
  description: '',
  status: {label: 'Pendiente', _id: '0'}
});

const optionsSelect = ref([
    {label: 'Pendiente', _id: '0'},
    {label: 'En progreso', _id: '1'},
    {label: 'Completado', _id: '2'}
]);

const rules = {
  name: { required: helpers.withMessage('El nombre es requerido', required) },
  description: { required: helpers.withMessage('La descripción es requerida', required) }
};

watch(() => props.dataEdit, (propEdit) => {
  newTask.value = propEdit
});

const $v = useVuelidate(rules, newTask);

const validationForm = computed(() => {
  $v.value.$touch();
  return !$v.value.$invalid;
})

const addTask = () => { 
  if (validationForm.value) {
    const project = { ...newTask.value };
    submitProject(project);
    resetForm()
  }
};

const resetForm = () => {
  newTask.value = { name: '', description: '', status: {label: 'Pendiente', _id: '0'} };
  $v.value.$reset();
}

const submitProject = (project) => {
  try {
    const idProject = route.params.id;
    if (!project._id) return store.dispatch('projects/addTask', {idProject, newTask: project});
    store.dispatch('projects/editTask', {idProject, newTask: project});

  } catch (error) {
    console.error(error);
  }
};

</script>

<style scoped>
.conten-form {
  background: #f7f7f7;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 10px ;
}

.message-error {
  color: red;
}

.form-actions {
  text-align: end;
  border-top: 1px solid #888;
  margin-top: 20px;
  padding-top: 10px;
}
</style>