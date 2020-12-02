<template>
    <div class="container">
        <div class="">
            <h1 class="text-muted m-5">{{ subtitle }}</h1>
            <div class="col-md-10">
                <div class="" v-if="error">
                    <div v-for="err in error" :key="err.id" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{{ err }}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                </div>
               
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="submit">
                        <div class="form-group">
                            <label for="">Title</label>
                            <input type="text" v-model="form.title" class="form-control">
                        </div>
                        <div class="">
                            <label for="">Body</label>
                            <input type="text" v-model="form.body"  class="form-control">
                        </div>
                        <input type="submit" value="Submit" class="btn btn-success btn-block mt-3">
                        </form>

                        <div class="table-responsive mt-5">
                            <table class="table">
                            <thead v-if="posts">
                                <tr>
                                    <th>Title</th>
                                    <th>Body</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="post in posts" :key="post.id">
                                    <td>{{post.title}}</td>
                                    <td>{{post.body}}</td>
                                    <td>
                                        <button class="btn btn-info" @click="edit(post.id)">Edit</button>
                                        <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import store from '../store'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'AddTodos',
    data:()=> ({}),
    methods: {
        submit: function(e) {
            if(this.form.update) {
                console.log(true)
                return store.dispatch('post/updatepost', this.form)
                .then(this.getPost())
            }else {
                return store.dispatch('post/addpost', this.form).then(() => {
                    if(this.status) {
                       this.$swal({
                            icon: 'error',
                            title: 'Oops..',
                            text: 'Something went wrong!',
                        })
                    }else {
                        this.$swal({
                            icon: 'success',
                            title: 'Data stored!',
                            text: 'Successfully Save!',
                        })
                        this.getPost()
                    }
                })
            }
        },
        edit(id){
            return store.dispatch('post/editpost', id)
        },
        deletePost(id) {
            return store.dispatch('post/deletepost', id).then(() => {
                this.$swal({
                    icon: 'success',
                    title: 'Deleted',
                    text: 'Item remove from the database!',
                })
                this.getPost()
            })
        },   
        getPost() {
            return store.dispatch('post/fetchpost')
        }
    },
    created() {
        this.getPost()
    },
    computed: {
        todos() { return store.getters['todos/getTodos'] },
        subtitle() { return store.getters['todos/getTitle'] },
        posts() { return store.getters['post/getPost'] },
        error() { return store.getters['post/getError'] },
        form() { return store.getters['post/getForm'] },
        status() { return store.getters['post/getStatus'] },
    },
    mounted() {
        console.log('Component Mounted')
    },
}
</script>

<style scoped>

</style>
