import { v4 as uuidv4 } from 'uuid';

export default {
    namespaced: true,
    state: {
        projects: []
    },
    mutations: {
        addProject(state, project) {
            project._id = uuidv4();
            project.tasks = [];
            state.projects.push(project);
        },
        editProject(state, project) {
            const index = state.projects.findIndex(p => p._id === project._id);
            if (index!== -1) state.projects[index] = project;
        },
        deleteProject(state, _id) {
            const index = state.projects.findIndex(p => p._id === _id);
            if (index!== -1) state.projects.splice(index, 1);
        },
        addTask(state, task) {
            task.newTask._id = uuidv4();
            const projectIndex = state.projects.findIndex(p => p._id === task.idProject);
            if (projectIndex!== -1) {
                state.projects[projectIndex].tasks.push(task.newTask);
            }
        },
        editTask(state, task) {
            const projectIndex = state.projects.findIndex(p => p._id === task.idProject);
            const taskIndex = projectIndex!== -1? state.projects[projectIndex].tasks.findIndex(t => t._id === task.newTask._id) : -1;
            if (projectIndex!== -1 && taskIndex!== -1) {
                state.projects[projectIndex].tasks[taskIndex] = task.newTask;
            }
        },
        deleteTask(state, projectTask) {
            const { idProject, idTask } = projectTask;
            const projectIndex = state.projects.findIndex(p => p._id === idProject);
            const taskIndex = projectIndex!== -1? state.projects[projectIndex].tasks.findIndex(t => t._id === idTask) : -1;
            if (projectIndex!== -1 && taskIndex!== -1) {
                state.projects[projectIndex].tasks.splice(taskIndex, 1);
            }
        },
    },
    actions: {
        addProject({ commit }, project) {
            commit('addProject', project);
        },
        addTask({ commit }, task) {
            commit('addTask', task);
        },
        editProject({ commit }, project) {
            commit('editProject', project);
        },
        editTask({ commit }, task) {
            commit('editTask', task);
        },
        deleteProject({ commit }, _id) {
            commit('deleteProject', _id);
        },
        deleteTask({ commit }, projectTask) {
            commit('deleteTask', projectTask);
        },
    },
    getters: {
        projects: state => state.projects,
        tasksList: (state) => (idProject) => {
            return state.projects.find(p => p._id === idProject);
        },
        projectsById: (state) => (_id) => {
            return state.projects.filter(p => p._id === _id);
        },
        projectsByName: (state) => (name) => {
            return state.projects.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        },
        projectsByStatus: (state) => (status) => {
            if (status._id === '0') return state.projects;
            return state.projects.filter(p => p.status._id === status._id);
        }
    }
};
