<template>
    <AppLoading v-if="appState.loading"/>
    <AppInfoBox v-else-if="appState.error" class_type="error" :message="appState.error"/>
    <!--landing app and cheking for user origin-->

    <!--App-->
    <AppHeader v-if="!appState.error&&!appState.loading" :props="props"/>
    <main class="content-box">
    <router-view v-if="!appState.error&&!appState.loading" :props="this.props"></router-view>
    </main>

</template>

<script>
    import {AppInfoBox,AppLoading,AppHeader} from "./components"
    import {engine} from './components/engine/engine';

    export default {
        name: 'App',

        data() {
            return {
                props:{
                    token:null,
                    _id:null,
                    login:this.login,
                    logout:this.logout,
                },
                appState:{loading:true,success:null,error:null},
            }
        },
        provide() {
            return {
                credentials: () => this.props
            }
        },
        methods: {
            logout(){
                this.props={...this.props,token:null,_id:null};
                engine.clearUserData();
                this.$router.push("/authentication");
            },
            login({token,_id}){
                this.props={...this.props,token:token,_id:_id};
                engine.setStorage({token:token,_id:_id});
                this.$router.push({path: '/users', query: {page: 1, limit: 8}});
            },
            check_user(){
                let {token,_id} =  engine.getStorageData();
                if(token&&_id){
                    engine.request("check-user","GET",null,{},true)
                        .then(()=> {
                                this.props={...this.props,token:token,_id:_id};
                                this.appState={loading:null,success:true,error:null};
                                this.$router.push({path: '/users', query: {page: 1, limit: 8}});//users
                            },
                            (err)=>{
                                this.appState={loading:null,success:null,error:err.message};
                                setTimeout(()=> this.check_user(),3000);
                            });
                }else{
                    this.appState={loading:false,success:null,error:null};
                    this.$router.push("/authentication");
                }
            }
        },
        components: {AppInfoBox,AppLoading,AppHeader},
        mounted() {
            setTimeout(()=> this.check_user(),1500);//in first load check credentials, compare with db and after login user or redirect into ath page
        }
    }
</script>
<style src="./index.css"></style>
