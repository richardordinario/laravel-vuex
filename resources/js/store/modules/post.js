import axios from 'axios'

const state = {
    form: {
        id: '',
        title: '',
        body:  '',
        update: false,
    },
    status: false,
    error: [],
    posts: []
}
const getters = {
    getPost: state => state.posts,
    getForm: state => state.form,
    getError: state => state.error,
    getStatus: state => state.status
}
const actions = {
    async fetchpost({ commit }) {
        const response = await axios.get(
            'http://localhost:8000/api/post'
        )
        commit('setpost', response.data)
    },
    async addpost({ commit },form) {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/post',form
            )
            commit('clearFields')
        } catch (error) {
            if(error.response && error.response.status == 422){
                let obj =JSON.stringify(error.response.data.errors)
                let err = JSON.parse(obj)
                commit('seterror', err)
            }
        }
    },
    async editpost({ commit }, id) {
        const response = await axios.get(
            'http://localhost:8000/api/post/'+ id
        )
        commit('setFields', response.data)
    },
    async updatepost({ commit },form) {
        const response = await axios.put(
            'http://localhost:8000/api/post/'+form.id, form
        )
        commit('clearFields')
    },
    async deletepost({ commit },id) {
        const response = await axios.delete(
            'http://localhost:8000/api/post/'+ id
        )
        console.log(response.data)
    }
}
const mutations = {
    
    setpost: (state, data) => (state.posts = data),
    seterror: (state, data) => (state.error = data, state.status = true),

    clearFields: (state) => ( 
        (state.form.id = ''),
        (state.form.title = ''),
        (state.form.body = ''),
        (state.form.update = false),
        (state.status = false),
        (state.error = [])
    ),

    setFields: (state, data) => (
        (state.form.id = data.id),
        (state.form.title = data.title),
        (state.form.body = data.body),
        (state.form.update = true)
    ),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}