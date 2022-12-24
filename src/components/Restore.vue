<template>
    <div class="box-full-size">
        <label>
            <input type="email" v-model="email" placeholder="Type email">
            <small v-if="email.length>0&&!isEmailValid" class="small-danger">NOK,email format JohnDoe2mail.com</small>
            <small v-else-if="isEmailValid" class="small-success">OK</small>
            <small v-else>Type your email, and check you mailbox</small>
        </label>
        <AppLoadingMini v-if="pageState.loading"/>
        <AppInfoBox v-if="pageState.error" class_type="error" :message="pageState.error"/>
        <AppInfoBox v-if="pageState.success" class_type="success" :message="pageState.success"/>
        <div class="button-group">
            <AppButton
                    :disabled="enableRestore"
                    class="btn-success"
                    name="Restore"
                    @action="restore"
            />
            <AppButton
                    class="btn-primary"
                    name="Back to login"
                    @action="$router.push('/authentication')"
            />
            <AppButton
                    class="btn-primary"
                    name="Create page"
                    @action="$router.push('/authorize')"
            />
        </div>
    </div>
</template>

<script>
    import {AppButton, AppLoadingMini} from "./components";
    import {AppInfoBox} from "./index";
    import {engine} from "./engine/engine"

    export default {
        name: "AppRestore",
        props: ["props"],
        data() {
            return {
                pageState: {success: null, error: null, loading: false},
                isEmailValid: false,
                email: ''
            }
        },
        methods: {
            restore() {
                this.pageState.loading = true;
                engine.request("restore", "POST", {email: this.email})
                    .then(data => {
                        this.pageState = {success: data.message, error: false, loading: false};
                        setTimeout(() => {
                            this.$router.push('/authentication')
                        }, 3000)
                    }, error => {
                        this.pageState = {...this.pageState, error: error.message, loading: false};

                    });
            },
            controller(value) {
                if (value.length >= 1) {
                    engine.testEmail(value) ? this.isEmailValid = true : this.isEmailValid = false;
                } else {
                    this.isEmailValid = false;
                }
            }
        },
        watch: {
            email(value) {
                this.controller(value);
            }
        },
        computed: {
            enableRestore() {
                return (this.pageState.loading) ? 'disabled' : (this.isEmailValid) ? null : 'disabled';
            }
        },
        components: {AppButton, AppInfoBox, AppLoadingMini},
        mounted() {
            if (this.props.token) {
                this.$router.push('/users');
            }
        }
    }
</script>
<style>
    .box-full-size {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 10px 0 10px;
        min-width: 50%;
        border: 1px solid grey;
        box-sizing: border-box;
        box-shadow: black 0 0 5px;
        min-height: 50%;
        border-radius: 5px;
    }

    .button-group {
        display: flex;
        flex-direction: row;

    }

    .btn {
        margin: 10px;
    }

</style>