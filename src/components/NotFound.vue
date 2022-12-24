<template>
    <div class="not-found-box">
        <h1>Page not found</h1>
        <div>
            <a @click="$router.go(-1)">Go back</a>
            <a @click="$router.push({path: '/users', query: {page: 1, limit: 12}})">Discover user</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>
<style scoped>
    .not-found-box {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 10px;
    }

    .not-found-box a {
        margin: 20px;
        font-weight: bold;
        color: grey;
    }

    .not-found-box a:hover {
        opacity: 0.7;
        cursor: pointer;

    }
</style>