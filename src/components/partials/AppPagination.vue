<template>
    <div>
        <button
            class="btn btn-dark"
            @click="load"
        >
            Load More
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        load() {
            this.$emit('loadMore')
        }
    }
}
</script>

<style scoped>
    button {
        margin: 1rem 0;
    }
</style>