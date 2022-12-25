<template>
    <AppLoading v-if="pageState.loading"/>
    <AppInfoBox v-else-if="pageState.error" message="pageState.errorMessage"/>
    <!--general page state track-->
    <!--general user information-->
    <div v-else class="row justify-content-evenly user_box">
        <div class="col col-md-5 col-sm-11 align-self-start justify-content-center left_box">
            <img :src="user_data.img" alt="user picture">
            <div class="card-body">
                <h5 class="card-title">{{(id===props._id)?`Your
                    page:${user_data.firstname} ${user_data.lastname}`:`${user_data.firstname}
                    ${user_data.lastname}`}}</h5>
                <p class="card-text">{{`User phone: ${user_data.phone}`}}</p>
            </div>
        </div>
        <!--user actions block-->
        <div class="col col-md-5 col-sm-11 right_box">
            <div class="create_button_group">
                <h4>Create actions</h4>
                <AppButton @action="$router.push(`/user/${id}/create-action`)" button-style="btn-success"
                           name="Create action" :disabled="(props._id&&props.token)?null:'disabled'"/>
                <small class="small-warning" v-if="!props._id&&!props.token">Only authorized users can assign action</small>
            </div>

            <hr/>

            <div v-if="!user_actions.length" class="create_button_group">
                <h5>List of actions:</h5>
                No one action have been not created yet
            </div>
            <div v-else class="col">
                <AppActionCard v-for="action in user_actions" :key="action._id" :action="action"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {engine} from "./engine/engine";
    import {AppLoading, AppInfoBox} from "./index";
    import {AppButton, AppActionCard} from "./components";

    export default {
        name: 'UserCard',
        props: ["props"],
        data() {
            return {
                id: this.$route.params.id,
                pageState: {loading: true, error: null, errorMessage: null},
                user_data: null,
                user_actions: null,
            }
        },
        methods: {
            getUser() {
                engine.request(`/user/${this.id}`)
                    .then((data) => {
                            this.user_data = data.user;
                            this.user_actions = data.actions;
                            this.pageState = {loading: false, error: null, errorMessage: null};
                        },
                        (error) => {
                            this.pageState = {loading: false, error: true, errorMessage: error};
                        }
                    );
            }
        },
        components: {AppActionCard, AppLoading, AppButton, AppInfoBox},
        watch: {
            $route() {
                this.id = this.$route.params.id,
                    this.getUser();
            }
        },
        mounted() {
            this.getUser();
        }
    }
</script>
<style>
    h2 {
        text-align: center;
    }

    .user_box {
        margin-top: 20px;
    }

    .user_box .left_box {
        margin-top: 10px;
        box-sizing: border-box;
        border: 1px solid black;
        padding: 0px;
        border-radius: 10px;
        text-transform: capitalize;
        text-align: center;
        box-shadow: 5px 5px 5px #6f6f6f;
        background: #e8e8e8;
    }

    .card-body {
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .user_box .right_box {
        box-shadow: 5px 5px 5px #6f6f6f;
        margin-top: 10px;
        box-sizing: border-box;
        border: 1px solid black;
        padding: 10px;
        border-radius: 10px;
    }

    .user_box .right_box .create_button_group {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    img {
        width: 100%;
        border-radius: 10px;
        max-height: 400px;
        object-fit: cover;
    }



    /*
    .not-found-box  {
        display: flex;
        flex-direction: column;
        margin: 10px;
    }
    .info{

        max-width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;

*/
</style>