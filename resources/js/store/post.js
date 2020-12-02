import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        form: {
            'title':null,
            'body':null,
        },
        currentTitle: 'Sample title',
        post: [
            {
                id:1,
                title: 'Todo one',
            },
            {
                id:2,
                title: 'Todo two',
            },
        ]
    },
    mutations:{
        setCurrentTitle(state, payload) {
            state.currentTitle = payload
            state.post.push(payload)
        }
    },
    actions:{},
    modules:{},
    getters: {
        getPost: state => state.post
    }
})