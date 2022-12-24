<template>
    <header class="header">
        <!--links if user exist or not-->
        <div class="user-nav" v-if="!props.token">
            <button class="btn btn-primary" @click="this.$router.push('/authentication')">Login</button>
            <p>or</p>
            <button class="btn btn-primary" @click="this.$router.push('/authorize')">Create account</button>
            <span class="links" @click="$router.push(`/users?page=1&limit=8`)">Discover users</span>
        </div>
        <div v-else class="user-nav">
            <AppButton buttonStyle="btn-secondary" name="Logout" @action="props.logout"/>
            <span class="links" @click="$router.push(`/users?page=1&limit=8`)">Discover users</span>
            <span class="links" @click="$router.push(`/user/${props._id}`)">Your page</span>
        </div>
        <!--links if user exist or not-->
        <form class="search-form">
            <ul v-if="searchValue" name="list_input" id="search_input">
                <li v-if="searchState.loading">{{`Please wait, we are loking for - ${searchValue}`}}</li>
                <li v-else-if="searchState.error">{{`Can\`t fetch with server`}}</li>
                <li v-else-if="searchState.success.length===0">{{`No results for - ${searchValue}`}}</li>
                <li v-for="(value,index)  in searchState.success"
                    @mouseover="selectSuggest(value._id)"
                    @mouseout="selectSuggest(null)"
                    @click="selectUser"
                    :key="index">
                    {{`${value.firstname} ${value.lastname}`}}
                </li>
            </ul>
            <input @blur="blur" list="search_input" class="search_input" name="search_input" type="search"
                   v-model="searchValue" placeholder="Find user"/>
        </form>
    </header>
</template>

<script>
    import {engine} from "./engine/engine";
    import AppButton from "./components/AppButton";

    export default {
        name: "AppHeader",
        props: ["props"],
        data() {
            return {
                searchState: {success: false, error: false, loading: false},
                searchValue: '',
                memorized: null
            }
        },
        methods: {
            resetForm() {
                this.searchState = {success: false, error: false, loading: false}
                this.searchValue = '';
            },
            blur() {
                if (!this.memorized) {
                    this.resetForm()
                }
            },
            selectUser() {
                this.$router.push(`/user/${this.memorized}`);
                this.resetForm()
                this.memorized = null;
            },
            selectSuggest(_id) {
                this.memorized = _id
            },
            searchControl(value) {
                this.searchState = {success: false, error: false, loading: true}
                engine.request(`users/find?query=${engine.toBase64(value)}&limit=5`)
                    .then(
                        (data) => {
                            if (data.users_list.length) {
                                this.searchState = {success: [...data.users_list], error: false, loading: false}
                            } else {
                                this.searchState = {success: [], error: false, loading: false}
                            }
                        },
                        (error) => {
                            this.searchState = {success: false, error: error, loading: false}
                        }
                    );
            }
        },
        watch: {
            searchValue(value) {
                if (value.length > 1) {
                    this.searchControl(value);
                } else {
                    this.searchState = {success: false, error: false, loading: false}
                }
            }
        },
        components: {
            AppButton
        }
    }
</script>
<style scoped>
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #b6b6b6;
        position: sticky;
        z-index: 1001;
        top: 0px;
        height: 3rem;
        width: 100%;
    }

    .header .search_input {
        width: 200px;
        transition: 0.5s;
    }

    .header .search_input:focus {
        width: 350px;
    }

    .header .user-nav {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    .header .search-form {
        display: flex;
        flex-direction: row;
    }

    ul {
        position: absolute;
        top: 3rem;
    }

    li {
        padding: 5px;
        width: 35rem;
        cursor: pointer;
        list-style: none;
        background: #e8e8e8;
    }

    li:hover {
        border: 1px dotted #6f6f6f;
        background: #d7d7d7;
        font-weight: bold;
    }

    .header .links {
        margin-right: 1rem;
        color: #555555;
        cursor: pointer;
        transition: 0.5s;
    }

    .header .links:hover {
        color: black;
        text-decoration: underline;
    }
</style>