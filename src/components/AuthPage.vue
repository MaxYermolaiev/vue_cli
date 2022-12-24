<template>
    <div class="auth-box">
        <div class="auth_form">
            <label>
                <input type="email" placeholder="Type email" v-model="email">
                <small v-if="email.length>0&&!isCredentialsValid.email" class="small-danger">NOK,email format
                    JohnDoe2mail.com</small>
                <small v-else-if="isCredentialsValid.email" class="small-success">Email - OK</small>
                <small v-else>Type your email</small>
            </label>
            <label>
                <input :type="typePasswordField" v-model="password" placeholder="Type password">
                <small v-if="password.length>0&&!isCredentialsValid.password" class="small-danger">NOK, minimum one
                    capital, one lover and digit, min length 8</small>
                <small v-else-if="isCredentialsValid.password" class="small-success">Password - OK</small>
                <small v-else>Type your password</small>
            </label>
            <label>
                <input type="checkbox" v-model="checkbox">
                Show password
            </label>
            <small style="color:grey">Email example - Example@mail.com, password should contain minimum one lower,one
                capital letter and digit, min length 8</small>
            <AppLoadingMini v-if="pageState.loading"/>
            <AppInfoBox v-if="pageState.error" class_type="error" :message="pageState.error"/>
            <div class="inline_button">
                <AppButton
                        buttonStyle="btn-success"
                        name="Login"
                        @action="login_user"
                        :disabled='enableLogin'
                />
                <AppButton
                        buttonStyle="btn-primary"
                        name="Restore"
                        @action="$router.push('/restore')"
                />
                <AppButton
                        buttonStyle="btn-primary"
                        name="Create page"
                        @action="$router.push('/authorize')"
                />
            </div>
        </div>
    </div>

</template>
<script>
    import {AppLoadingMini, AppButton} from "./components"
    import {AppInfoBox} from "./index"
    import {engine} from "./engine/engine"

    export default {
        props: ["props"],
        data() {
            return {
                isCredentialsValid: {password: false, email: false},//credentials status
                pageState: {error: false, loading: false, success: false},//page state

                email: '',//trace field
                password: '',//trace field
                typePasswordField: "password",
                checkbox: false,

            }
        },
        methods: {
            login_user() {
                this.pageState = {error: false, loading: true, success: false}
                engine.request("authenticate", "POST", null, {authorization: `${engine.toBase64("type")} ${engine.toBase64(`${this.email}:${this.password}`)}`})
                    .then(
                        data => {
                            this.props.login({...data});
                            this.$router.push(`/user/${data._id}`);
                        },
                        error => {
                            this.pageState = {error: error.message, loading: false, success: false}
                        }
                    )
            }
        },
        computed: {
            enableLogin() {
                return (this.pageState.loading) ? "disabled" : (this.isCredentialsValid.email && this.isCredentialsValid.password) ? null : "disabled";
            }
        },
        watch: {
            email(value) {
                if (value.length > 5) {
                    engine.testEmail(value) ?
                        this.isCredentialsValid = {...this.isCredentialsValid, email: true} :
                        this.isCredentialsValid = {...this.isCredentialsValid, email: false};
                } else {
                    this.isCredentialsValid = {...this.isCredentialsValid, email: false};
                }
            },
            password(value) {
                if (value.length > 6) {
                    engine.testPassword(value) ?
                        this.isCredentialsValid = {...this.isCredentialsValid, password: true} :
                        this.isCredentialsValid = {...this.isCredentialsValid, password: false};
                } else {
                    this.isCredentialsValid = {...this.isCredentialsValid, password: false};
                }
            },
            checkbox(value) {
                if (value === true) {
                    this.typePasswordField = "text";
                } else {
                    this.typePasswordField = "password";
                }
            }
        },
        components: {
            "AppButton": AppButton,
            "AppInfoBox": AppInfoBox,
            "AppLoadingMini": AppLoadingMini
        },
        mounted() {
            if (this.props.token) {
                this.$router.push({path: '/users', query: {page: 1, limit: 10}});
            }
        }
    }
</script>
<style>
    .auth-box {
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

    .auth-box .auth_form {
        display: flex;
        flex-direction: column;
        margin: 10px;
    }

    .auth-box .auth_form input {
        margin: 10px;
        border: 3px solid #ccc;
        transition: 1s;
    }

    .auth-box .auth_form input:focus {
        border: 3px solid #555555;
    }

    .auth-box .auth_form > .button-control {
        display: flex;
        flex-direction: row;
    }
</style>