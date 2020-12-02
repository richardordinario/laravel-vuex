<template>
    <div class="">
        <div class="">
            <h1>Filter Todos</h1>
        </div>
    </div>
</template>
<script>
import AddTodo from './components/AddTodo'
import FilterTodo from './components/FilterTodo'
import Todos from './components/Todos'

export default {
    name: 'App',
    components: {
        AddTodo,
        FilterTodo,
        Todos
    }
}
</script>

<style scoped>

</style>
