<template>
    <AppInfoBox v-if="state.success"
                class_type="success"
                message="New user successfully created! You will be redirected via 3 second..."
    ></AppInfoBox>
    <div v-else class="auth-box">
        <div class="auth_form">
            <label>
                <input v-model="firstname" placeholder="Type your firstname">
                Fill first name<br/>
                <small v-if="firstname.length>0&&!isCredentialsValid.firstname" class="small-danger">Only letters and 2
                    or more</small>
                <small v-else-if="isCredentialsValid.firstname" class="small-success">OK</small>
                <small v-else>First name is not correct</small>
            </label>
            <label>
                <input v-model="lastname" placeholder="Type your lastname">
                Fill last name<br/>
                <small v-if="lastname.length>0&&!isCredentialsValid.lastname" class="small-danger">Only letters and 2 or
                    more</small>
                <small v-else-if="isCredentialsValid.lastname" class="small-success">OK</small>
                <small v-else>Last name is not correct</small>
            </label>
            <label>
                <input type="text" placeholder="+380" v-model="phone">
                Type your phone<br/>
                <small v-if="phone.length>4&&!isCredentialsValid.phone" class="small-danger">Phone format
                    +380970001122</small>
                <small v-else-if="isCredentialsValid.phone" class="small-success">OK</small>
                <small v-else>Phone is not correct</small>
            </label>
            <label>
                <input type="email" placeholder="Type email" v-model="email">
                Enter your email<br/>
                <small v-if="email.length>0&&!isCredentialsValid.email" class="small-danger">Email format
                    JohnDoe2mail.com</small>
                <small v-else-if="isCredentialsValid.email" class="small-success">OK</small>
                <small v-else>Email is not correct</small>
            </label>
            <label>
                <input :type="typePasswordField" v-model="password" placeholder="Type password">
                Enter your password<br/>
                <small v-if="password.length>0&&!isCredentialsValid.password" class="small-danger">Minimum one capital,
                    one lover and digit, min length 8</small>
                <small v-else-if="isCredentialsValid.password" class="small-success">OK</small>
                <small v-else>Password is not correct</small>
            </label>
            <label>
                <input type="checkbox" v-model="checkbox">
                Show password
            </label>
            <AppLoadingMini v-if="state.loading"/>
            <AppInfoBox v-if="state.error" class_type="error" :message="state.error.message"/>
            <div class="inline_button">
                <AppButton
                        name="Create new user"
                        @action="createUser"
                        :disabled="enableButton"
                        button-style="btn-success"
                />
                <AppButton
                        name="Back to login"
                        @action="$router.push('/authentication')"
                        button-style="btn-secondary"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import {AppInfoBox} from "../components";
    import {AppButton, AppLoadingMini} from "./components"
    import {engine} from './engine/engine';

    export default {
        name: 'AppCreateUser',
        props: ["props"],
        data() {
            return {
                firstname: '',
                password: '',
                email: '',
                lastname: '',
                checkbox: false,
                phone: '+380',
                //trace variables
                isCredentialsValid: {password: false, email: false, firstname: false, lastname: false},
                //test results
                typePasswordField: "password",
                //results from server
                state: {loading: false, success: false, error: false}
            }
        },
        methods: {
            controller(field, value) {
                switch (field) {
                    case "firstname":
                        this.isCredentialsValid.firstname = (engine.testString(value) && value.length > 2);
                        break;
                    case "lastname":
                        this.isCredentialsValid.lastname = (engine.testString(value) && value.length > 2);
                        break;
                    case "password":
                        this.isCredentialsValid.password = (engine.testPassword(value) && value.length > 2);
                        break;
                    case "email":
                        this.isCredentialsValid.email = (engine.testEmail(value) && value.length > 2);
                        break;
                    case "phone":
                        this.isCredentialsValid.phone = (engine.testPhone(value) && value.length > 2);
                        break;
                }
            },
            createUser() {
                this.state = {loading: true, success: false, error: false}
                engine.request("authorize", "POST", {
                    firstname: this.firstname,
                    password: this.password,
                    email: this.email,
                    lastname: this.lastname,
                    phone: this.phone,
                })
                    .then(
                        (data) => {
                            this.state = {loading: false, success: data, error: false}

                            if (this.props.token) {
                                setTimeout(() => {
                                    this.$router.push("/users")
                                }, 2500);
                            } else {
                                setTimeout(() => {
                                    this.$router.push("/authentication")
                                }, 2500);
                            }
                        },
                        error => {
                            this.state = {loading: false, success: false, error: error}
                        }
                    )
            },
        },
        computed: {
            enableButton() {
                return (this.state.loading) ? "disabled" : (this.isCredentialsValid.email &&
                    this.isCredentialsValid.password &&
                    this.isCredentialsValid.firstname &&
                    this.isCredentialsValid.lastname) ?
                    null : "disabled";
            }
        },
        watch: {
            "checkbox"(value) {
                if (value === true) {
                    this.typePasswordField = "text";
                } else {
                    this.typePasswordField = "password";
                }
            },
            firstname(value) {
                this.controller("firstname", value)
            },
            password(value) {
                this.controller("password", value)
            },
            email(value) {
                this.controller("email", value)
            },
            lastname(value) {
                this.controller("lastname", value)
            },
            phone(value) {
                this.controller("phone", value)
            },
        },

        components: {AppButton, AppInfoBox, AppLoadingMini}
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

</style>