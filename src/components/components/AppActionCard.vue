<template>
    <div v-if="user_actions.removed" class="action">
        <AppInfoBox class_type="success" message="Action successfully removed" action="false"/>
    </div>
    <div v-else>
        <div class="button_card">
            <span style="font-weight: 700;font-size: 1.5rem">Action name:</span><span style="color: #787676">{{` ${user_actions.title}`}}</span><br>
            <span class="span-bold">Status -</span><span :class="user_actions.completed?'small-success':'small-danger'">{{`${user_actions.completed?'closed':'active'}`}}</span><br>
            <span class="span-bold">Description -</span><small>{{` ${user_actions.description}`}}</small><br>
            <span class="span-bold">Created by -</span><small>{{` ${user_actions.creator_name}`}}</small><br>
            <span class="span-bold">Priority -</span>
            <span :class="user_actions.priority.toUpperCase()==='LOW'?'small-success':user_actions.priority.toUpperCase()==='MIDDLE'?'small-warning':'small-danger'">{{` ${user_actions.priority}`}}</span><br>
            <span class="span-bold">Start date -</span>{{` ${new Date(user_actions.start_date).toLocaleDateString()}`}}<br>
            <span class="span-bold">End date -</span>{{` ${new Date(user_actions.end_date).toLocaleDateString()}`}}<br>
            <div class="inline_button">
                <AppButton @action="removeAction()"
                           button-style="btn-danger"
                           name="Remove action"
                           :disabled="allowRemove"
                />
                <AppButton
                        @action="$router.push(`/user/${this.user_actions.executor}/update-action/${this.user_actions._id}`)"
                        button-style="btn-success"
                        name="Update action"
                        :disabled="allowUpdate"/>
                <br/>
                <AppButton @action="completeActions"
                           button-style="btn-success"
                           :name="!user_actions.completed?'Complete action':'Action is complete'"
                           :disabled="allowComplete"
                />
            </div>
        </div>
        <small v-if="warn_message" class="small-danger">Notice, create,delete,update can user or assign person, complete only executor</small>
        <AppLoadingMini v-if="state.loading"/>
        <AppInfoBox v-if="state.error" class_type="error" :message="state.error" action="false"/>
        <hr/>
    </div>
</template>
<script>
    import {AppButton} from "./index";
    import {engine} from "@/components/engine/engine";
    import AppLoadingMini from "@/components/components/AppLoadingMini";
    import AppInfoBox from "@/components/InfoBox";
    //if creator === executor allow all action
    //else creator only asign modify and remove
    //executor only complete and remove completed

    export default {
        components: {AppInfoBox, AppLoadingMini, AppButton},
        name: 'AppActionCard',
        props: ["action"],
        inject: ["credentials"],
        data() {
            return {
                user_credentials: this.credentials(),
                user_actions: this.action,
                state: {error: false, success: false, loading: false}
            }
        },
        methods: {
            removeAction() {
                this.state = {error: false, success: false, loading: true}
                engine.request(`user/${this.user_actions.executor}/remove-action/${this.user_actions._id}`, 'DELETE', null, {}, true)
                    .then(
                        () => {
                            this.user_actions = {...this.user_actions, removed: true}
                            this.state = {error: false, success: false, loading: false}
                        }, (error) => {
                            this.state = {error: error.message, success: false, loading: false}

                        });
            },
            completeActions() {
                this.state = {error: false, success: false, loading: true}
                engine.request(`user/${this.user_actions.executor}/complete-action/${this.user_actions._id}`, 'PATCH', null, {}, true)
                    .then(
                        (data) => {
                            this.state = {error: false, success: data.message, loading: false}
                            this.user_actions = {...this.user_actions, completed: true}
                        }, (error) => {
                            this.state = {error: false, success: error.message, loading: false}
                        });
            }
        },
        computed:{
          allowComplete(){
             return ((this.user_credentials._id===this.user_actions.executor||this.user_credentials._id===this.user_actions.assigned_by)&&!this.user_actions.completed)?null:'disabled';
          },
            allowUpdate(){
                if(this.user_actions.assigned_by===this.user_credentials._id&&!this.user_actions.completed){
                    return null;
                }else{
                    return "disabled";
                }
            },
            allowRemove(){

                if(this.user_actions.assigned_by===this.user_credentials._id){
                     return null;
                }else if(this.user_actions.executor===this.user_credentials._id&&this.user_actions.completed){
                    return null;
                }else{
                    return "disabled";
                }
            },
            warn_message(){
                return (this.user_credentials._id!==this.user_actions.assigned_by||this.user_credentials._id!==this.user_actions.executor)&&!this.user_actions.completed;
            },
        }
    }
</script>
<style>
    .action {
        font-weight: bold;
        box-sizing: border-box;
        padding: 10px;
    }
</style>