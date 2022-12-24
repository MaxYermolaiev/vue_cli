<template>
    <AppLoading v-if="pageState.isLoading"/>
    <AppInfoBox v-else-if="pageState.error" class_type="error" :message="pageState.error"/>

    <div v-else class="row ">
        <div v-if="!pageState.userList.length">Sorry no one user have been created yet...Create new one</div>
        <div v-else>
            <AppPagination :pagination="{state:pagination,back:go_back,forward:go_forward,select:select_page}"/>
            <div class="user-list">
                <AppCardSmall v-for="(value,index) in pageState.userList" :key="index" :user_data="value"/>
            </div>
            <AppPagination :pagination="{state:pagination,back:go_back,forward:go_forward,select:select_page}"/>
        </div>
    </div>
</template>

<script>
    import {AppCardSmall, AppPagination} from "./components"
    import {AppInfoBox, AppLoading} from "./index"
    import {engine} from "./engine/engine"

    export default {
        name: 'AppUsersList',
        components: {AppPagination, AppLoading, AppInfoBox, AppCardSmall},
        data() {
            return {
                pageState: {isLoading: true, userList: [], error: false},
                pagination: {page: this.$route.query.page, limit: this.$route.query.limit, total: false},
                timer: null,
            }
        },
        methods: {
            select_page(selected) {
                this.pagination = {...this.pagination, page: selected}

            },
            go_back() {
                this.pagination = {...this.pagination, page: --this.pagination.page}
            },
            go_forward() {
                this.pagination = {...this.pagination, page: ++this.pagination.page}
            },
            getUsers(url) {
                this.pageState = {userList: [], error: false, isLoading: true};
                engine.request(url).then(
                    data => {
                        this.pageState = {userList: [...data.result], error: null, isLoading: false};
                        if (!this.pagination.total) {
                            this.pagination.total = data.total
                        }
                    },
                    (error) => {
                        this.pageState = {userList: [], error: error.message, isLoading: false};
                        this.timer = setTimeout(() => this.getUsers(`users?page=${this.pagination.page}&limit=${this.pagination.limit}&total=${this.pagination.total}`), 3000)
                    });
            }
        },
        mounted() {
            this.getUsers(`users?page=${this.pagination.page}&limit=${this.pagination.limit}&total=${this.pagination.total}`);
        },
        watch: {
            pagination() {
                this.getUsers(`users?page=${this.pagination.page}&limit=${this.pagination.limit}&total=${this.pagination.total}`);
            }
        },
    }
</script>
<style>
    .user-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: baseline;
        align-content: center;
    }
</style>