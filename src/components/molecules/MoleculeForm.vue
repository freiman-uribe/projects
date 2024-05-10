<template>
  <div class="conten-form">
    <form @submit.prevent="addProject" class="form">
      <div class="form-group">
        <AtomInput
          label="Nombre (*)"
          v-model="newProject.name"
          type="text"
        />
        <div class="message-error" v-if="$v.name.$error"> {{ $v.name.required.$message }} </div>
        <AtomTexarea
          label="Descripcion (*)"
          v-model="newProject.description"
        />
        <div class="message-error" v-if="$v.description.$error">{{ $v.description.required.$message }}</div>
        <AtomInput
          :label="`Estado del proyecto ${statusProject}`"
          v-model="newProject.status"
          type="checkbox"
        />
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
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import AtomInput from '../atoms/AtomInput.vue';
import AtomButton from '../atoms/AtomButton.vue';
import AtomTexarea from '../atoms/AtomTexarea.vue';

const store = useStore();

const props = defineProps({
    dataEdit: Object,
});

const newProject = ref({
  name: '',
  description: '',
  status: false
});

const rules = {
 name: { required: helpers.withMessage('Este campo es requerido', required) },
 description: { required: helpers.withMessage('La descripción es requerida', required) }
};

const $v = useVuelidate(rules, newProject);

const validationForm = computed(() => {
  $v.value.$touch();
  return !$v.value.$invalid;
})

const statusProject = computed(() => {
  const status = newProject.value.status ? 'activo' : 'inactivo'
  return status
})

const addProject = () => { 
  if (validationForm.value) {
    const project = { ...newProject.value };
    submitProject(project);
    resetForm()
  }
};

const resetForm = () => {
  newProject.value = { name: '', description: '', status: false };
  $v.value.$reset();
}

const submitProject = (project) => {
  try {
    project.status = project.status ? {label: 'Activo', _id: '1'} : {label: 'Inactivo', _id: '2'}
    if (!project._id) return store.dispatch('projects/addProject', project);
    store.dispatch('projects/editProject', project);
  } catch (error) {
    console.error(error);
  }
};

watch(() => props.dataEdit, (propEdit) => {
  propEdit.status = propEdit.status._id === '1' ? true : false
  newProject.value = propEdit
});
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