<template>
    <div class="date">
        <label>
            <div v-if="props?.start"><small>{{`Old start date ${props?.start}`}}</small></div>
            <input :v-model="start_date" type="date" name="start" @change="select('start',$event)"/>
            <small class="small-warning" v-if="start_date===null&&pageState.startError===false">Select action beginning date</small>
            <small class="small-danger" v-else-if="start_date===null&&pageState.startError===true">Selected date can not
                be older current date</small>
            <small class="small-success" v-else>Start date is OK</small>
        </label>

        <label v-if="!pageState.startError&&start_date">
            <div v-if="props?.end"><small>{{`Old end date ${props?.end}`}}</small></div>
            <input :v-model="end_date" type="date" name="end" @change="select('end',$event)"/>
            <small class="small-warning" v-if="end_date===null&&pageState.endError===false">Select action complete date</small>
            <small class="small-danger" v-else-if="end_date===null&&pageState.endError===true">
                Selected date should be start on nex date after start date!</small>
            <small class="small-success" v-else>End date is OK</small>
        </label>
    </div>
</template>

<script>
    export default {
        name: "AppCalendar",
        props: ["props"],
        data() {
            return {
                now: new Date().toLocaleDateString().split('.').reverse().join('-'),//to compare current date with start
                start_date: null,
                end_date: null,
                pageState: {startError: false, endError: false}
            }
        },
        methods: {
            select(name, event) {
                switch (name) {
                    case 'start': {
                        if (new Date(event.target.value) < new Date(this.now)) {
                            this.pageState.startError = true;
                            this.start_date = null;
                            this.$emit('calendar', {start_date: null, end_date: null});
                        } else {
                            this.pageState.startError = false;
                            this.start_date = event.target.value;
                            this.$emit('calendar', {start_date: null, end_date: null});
                        }
                        break;
                    }
                    case 'end': {
                        let totalSeconds = new Date(this.start_date).getTime() + 86400;

                        if (new Date(event.target.value) < new Date(this.start_date) || new Date(event.target.value) < new Date(totalSeconds)) {
                            this.pageState.endError = true;
                            this.end_date = null;
                            this.$emit('calendar', {start_date: null, end_date: null});
                        } else {
                            this.pageState.endError = false;
                            this.end_date = event.target.value;
                            this.$emit('calendar', {start_date: this.start_date, end_date: this.end_date});
                        }
                        break;
                    }
                }
            }
        },
        emits: ["calendar"],
        watch:{},
        mounted(){
        }
    }
</script>
<style>


</style>