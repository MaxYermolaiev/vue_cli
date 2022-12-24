<template>
    <button class="btn"
            :class="buttonStyle"
            @click='this.$emit("action")'
            :disabled="disabled"
    >{{name}}
    </button>
</template>

<script>
    export default {
        props: {
            "name": String,
            "buttonStyle": {
                type: String,
                default: ""
            },
            "disabled": String
        },
        emits: ["action"]
    }
</script>
<style>


</style>