<template>
    <AppLoading v-if="pageStatus.loading"/>
    <AppInfoBox v-else-if="pageStatus.success" :message="pageStatus.success" class_type="success" :page_action="true"/>
    <AppInfoBox v-else-if="pageStatus.error" :message="pageStatus.error" class_type="error" :page_action="true"/>
    <div v-else-if="action_data" class="create-action">
        <h3>Update actions:</h3>
        <div class="col_component">
            <label>
                <input :value="computed_value" type="text" placeholder="Task title"
                       @keyup="change('title',$event)"><br/>
                <small v-if="action_data.title.length<3" class="small-danger">Type action description, 3 symbol and
                    more</small>
                <small v-else class="small-success">Action title is OK</small>
            </label>
            <label>
                <textarea :value="computed_description" placeholder="Task description"
                          @change="change('description',$event)"/><br/>
                <small v-if="action_data.description.length<20" class="small-danger">Task description description, 20
                    symbol and more</small>
                <small v-else class="small-success">Action description is OK</small>
            </label>
            <label>
                <select @change="change('priority',$event)" name="priority">
                    <option value="Low" selected>Low</option>
                    <option value="Middle">Middle</option>
                    <option value="High">High</option>
                </select>
                <br/>
                Select action priority
            </label>
            <AppCalendar @calendar="calendar" :props="{
             update_end_date:old_dates.end,
             update_start_date:old_dates.start}"/>
            <div class="inline_button">
                <AppButton name="Update action" buttonStyle="btn-success" @action="update_action" :disabled="disabled"/>
                <AppButton name="Back" buttonStyle="btn-secondary" @action="$router.go(-1)"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {AppCalendar, AppButton} from "./components";
    import {AppInfoBox, AppLoading} from "./index";
    import {engine} from "./engine/engine";

    export default {
        name: "AppUpdateAction",
        props: ["props"],
        components: {
            AppLoading, AppInfoBox, AppCalendar, AppButton
        },
        methods: {
            change(type, event) {
                switch (type) {
                    case("title"): {
                        this.action_data = {...this.action_data, title: event.target.value};
                        break;
                    }
                    case("description"): {
                        this.action_data = {...this.action_data, description: event.target.value};
                        break;
                    }
                    case("priority"): {
                        this.action_data.priority = event.target.value;
                        break;
                    }
                }
            },
            calendar(data) {
                this.action_data = {...this.action_data, ...data}
            },
            update_action() {
                this.pageStatus = {success: false, error: false, loading: true}
                engine.request(`/user/${this.user}/update-action/${this.action}`, "PATCH", this.action_data, {}, true)
                    .then(
                        (data) => {
                            this.pageStatus = {success: data.message, error: false, loading: false}
                        },
                        (error) => {
                            this.pageStatus = {success: false, error: error.message, loading: false}
                        });
            },
            getAction() {
                engine.request(`/user/get-action/${this.action}`, "GET")
                    .then(
                        (data) => {
                            this.old_dates = {
                                start: new Date(data.action.start_date).toLocaleDateString(),
                                end: new Date(data.action.end_date).toLocaleDateString()
                            };
                            this.action_data = data.action;
                            this.pageStatus = {success: false, error: false, loading: false}
                        },
                        (error) => {
                            this.pageStatus = {success: false, error: error.message, loading: false}
                        });
            }
        },
        data() {
            return {
                old_dates: null,
                user: this.$route.params.id,
                action: this.$route.params.action,
                action_data: null,
                pageStatus: {success: false, error: false, loading: true},
            }
        },
        computed: {
            computed_value() {
                return this.action_data.title || ''
            },
            computed_description() {
                return this.action_data.description || ''
            },
            disabled() {
                return (this.action_data.start_date && this.action_data.end_date && this.action_data.title.length > 2 && this.action_data.description.length > 20 && this.action_data.priority) ? null : 'disabled';
            }
        },
        emits: ["calendar"],
        mounted() {
            if (!this.props.token || !this.props._id) {
                this.$router.push('/');
            } else {
                this.getAction()
            }

        }

    }
</script>
<style>
    .create-action {
        max-width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }

    textarea {
        width: 30rem;
        height: 12rem;
    }

</style>