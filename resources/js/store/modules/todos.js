const state = {
    todos : [
        {
            id:1,
            title: 'Todo 1',
        },
        {
            id:2,
            title: 'Todo 2',
        },
    ],
    title: 'Sample'
}
const getters = {
    getTodos: state => state.todos,
    getTitle: state => state.title
}
const actions = {}
const mutations = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}