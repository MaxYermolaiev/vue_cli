<template>
    <div class="info" :class="class_type">
        <div class="icon">
            <div v-if="class_type==='success'">
                <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor"
                     class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <div v-if="class_type==='warning'">
                <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="currentColor"
                     class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
            </div>
            <div v-if="class_type==='error'">
                <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="currentColor"
                     class="bi bi-bug-fill" viewBox="0 0 16 16">
                    <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"/>
                    <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"/>
                </svg>
            </div>
        </div>
        <strong style="text-align: center;">{{message}}</strong><br/>
        <span v-if="page_action===true" @click="$router.go(-1)">Step back</span>
    </div>
</template>

<script>
    export default {
        name: 'AppInfoBox',
        props: {
            "class_type": String,
            "message": String,
            "page_action": Boolean
        },
        mounted() {

        }
    }
</script>
<style>
    .info {
        width: 70%;
        max-height: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 15% 10px 15%;
    }

    .info .icon {
        margin: 35px;
    }

    .error {
        border-radius: 1rem;
        font-weight: bold;
        opacity: 0.7;
        background-color: #ff5252;
        color: #000000;
        box-sizing: border-box;
        box-shadow: #232323 0 0 5px;
    }

    .success {
        font-weight: bold;
        opacity: 0.7;
        background-color: green;
        color: white;
        box-sizing: border-box;
        box-shadow: #232323 0 0 5px;
        border-radius: 1rem;
    }

    .warning {
        border-radius: 1rem;
        font-weight: bold;
        background-color: #ffc052;
        color: #000000;
        box-sizing: border-box;
        box-shadow: #232323 0 0 5px;
    }

    span {
        margin-right: 1rem;
        color: #404040;
        cursor: pointer;
        transition: 0.5s;
        margin-bottom: 25px;
        opacity: 1;
    }

    span:hover {
        color: #070707;
        text-decoration: underline;
    }
</style>