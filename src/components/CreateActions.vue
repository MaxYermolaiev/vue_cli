<template>
    <AppInfoBox class_type="success"
                v-if="pageStatus.success"
                :message="pageStatus.success"
                :page_action="true"/>
    <AppInfoBox v-else-if="pageStatus.error"
                class_type="error"
                :message="pageStatus.error"
                :page_action="true"/>

    <div v-else class="create-action">
        <h3>Assign new actions:</h3>
        <div>
            <div class="col_component">
                <label>
                    <input type="text" placeholder="Task title" @keyup="change('title',$event)"><br/>
                    <small v-if="action_data.title===false">Type action description, 3 symbol and more</small>
                    <small v-else class="small-success">Action title is OK</small>
                </label>
                <label>
                    <textarea placeholder="Task description" @change="change('description',$event)"/><br/>
                    <small v-if="action_data.description===false">Task description description, 20 symbol and
                        more</small>
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
                <AppCalendar @calendar="calendar"/>
            </div>
            <AppLoadingMini v-if="pageStatus.loading"/>
            <hr/>
            <div class="inline_button">
                <AppButton name="Create action" buttonStyle="btn-success" @action="create_action" :disabled="disabled"/>
                <AppButton name="Back" buttonStyle="btn-secondary" @action="$router.go(-1)"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {AppButton, AppLoadingMini} from "./components";
    import AppCalendar from "./components/AppCalendar";
    import AppInfoBox from "@/components/InfoBox";
    import {engine} from "./engine/engine";

    export default {
        name: "AppCreateActions",
        props: ["props"],
        data() {
            return {
                action_data: {start_date: false, end_date: false, title: false, description: false, priority: "low"},
                pageStatus: {success: false, error: false, loading: false},
            }
        },
        methods: {
            create_action() {
                this.pageStatus = {success: false, error: false, loading: true};
                engine.request(`user/${this.$route.params.id}/create-action`, "POST", {...this.action_data}, {}, true)
                    .then((data) => {
                        this.pageStatus = {success: data.message, error: false, loading: false};
                    }, (error) => {
                        this.pageStatus = {success: false, error: error.message, loading: false};
                    });
            },
            calendar(data) {
                this.action_data = {...this.action_data, ...data}
            },
            change(type, event) {
                switch (type) {
                    case("title"): {
                        this.action_data = event.target.value.length > 2 ? {
                            ...this.action_data,
                            title: event.target.value
                        } : {...this.action_data, title: false};
                        break;
                    }
                    case("description"): {
                        this.action_data = event.target.value.length > 20 ? {
                            ...this.action_data,
                            description: event.target.value
                        } : {...this.action_data, description: false};
                        break;
                    }
                    case("priority"): {
                        this.action_data.priority = event.target.value;
                        break;
                    }
                }
            }
        },
        computed: {
            disabled() {
                return (this.action_data.start_date && this.action_data.end_date && this.action_data.title && this.action_data.description && this.action_data.priority) ? null : 'disabled';
            }
        },
        components: {
            AppLoadingMini,
            AppInfoBox,
            AppButton,
            AppCalendar
        },
        emits: ["calendar"]
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