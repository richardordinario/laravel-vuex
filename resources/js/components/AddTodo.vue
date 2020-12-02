<template>
    <div class="container">
        <div class="">
            <h1 class="text-muted m-5">Add Todos</h1>
            <div class="col-md-6">
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

export default {
    name: 'AddTodos',
    data:()=> ({
        form:{
            title:null,
            body:null,
        },
        posts: null,
        isUpdate: false,
        updateId: null,
    }),
    methods: {
        submit: function(e) {
            if(this.isUpdate) {
                this.update(this.updateId)
            }else {
                axios.post('http://localhost:8000/api/post', this.form)
                .then(res => {
                    this.get()
                    console.log(res.data)
                    })
                .catch(err=> {
                    console.log(err.response)
                })
            }
             e.target.reset()
        },
        get() {
            axios.get('http://localhost:8000/api/post')
            .then(res=> {
                console.log(res.data)
                this.posts = res.data
            })
            .catch(err=> {
                console.log(err.response)
            })
        },
         edit(id){
            axios.get('http://localhost:8000/api/post/'+id)
            .then(res=> {
                console.log(res.data)
                this.form.title =res.data.title
                this.form.body =res.data.body
                this.isUpdate = true
                this.updateId = id
            })
            .catch(err => {
                console.log(res.response)
            })
        },
        update(id){
            axios.put('http://localhost:8000/api/post/'+id, this.form)
            .then(res=> {
                console.log(res.data)
                this.get()
                this.isUpdate = false
                this.updateId = null
            })
            .catch(err => {
                console.log(res.response)
            })
        },
        deletePost(id) {
            axios.delete('http://localhost:8000/api/post/'+id)
            .then(res=> {
                console.log(res.data)
                this.get()
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    },
    created() {
        this.get();
    },
    mounted() {
        console.log('Component Mounted')
    }
}
</script>

<style scoped>

</style>
