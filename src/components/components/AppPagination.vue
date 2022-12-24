<template>
    <nav class="pagination justify-content-center" aria-label="Page navigation example">
        <AppButton @action="pagination.back" name="Back" :disabled="back_control" button-style="btn-secondary"/>
        <ul class="pagination_list">
            <li v-for="(item) in toDisplay" :key="item.page" :class="`pagination_item ${item.active}`"
                @click="pagination.select(item.page)">{{item.page}}
            </li>
        </ul>
        <AppButton @action="pagination.forward" name="Forward" :disabled="forward_control"
                   button-style="btn-secondary"/>
    </nav>
</template>

<script>
    import AppButton from "@/components/components/AppButton";

    export default {
        name: "ComponentPagination",
        components: {AppButton},
        props: {
            pagination: {
                state: {
                    type: Object,
                    default: () => {
                        return {page: 1, limit: 5, total: 5}
                    }
                },
                back: Function,
                forward: Function,
                select: Function
            }
        },
        data() {
            return {
                total_pages: (this.pagination.state.total % this.pagination.state.limit === 0) ? this.pagination.state.total / this.pagination.state.limit : +parseInt(this.pagination.state.total / this.pagination.state.limit) + 1,
                current: this.pagination.state.page,

            }
        },
        methods: {},
        computed: {
            toDisplay() {
                let temp = (this.total_pages < 5) ? new Array(this.total_pages).fill(1) : new Array(5).fill(1);
                //create arr of ell, depend on pages quantity-max 5
                let current = this.current - 2;//right and back pages
                temp.forEach((itm, idx, arr) => {
                    arr[idx] = current;
                    current++
                });
                let index = temp.findIndex(itm => itm === 0);
                if (index < 0) {
                    temp.forEach((item, idx, arr) => {
                        arr[idx] = (item == this.current) ? {page: item, active: "active"} : {page: item, active: ""}
                    });
                } else {
                    let deleted = temp.splice(0, index + 1);
                    let startToPushValue = (temp.length) ? temp[temp.length - 1] + 1 : 1;
                    deleted.map(() => {
                        temp.push(startToPushValue);
                        startToPushValue++;
                    });
                    temp.forEach((item, idx, arr) => {
                        arr[idx] = (item == this.current) ? {page: item, active: "active"} : {page: item, active: ""}
                    });
                }

                let remove_end_index;
                temp.map((ell, idx) => {
                    if (ell.page === this.total_pages + 1) {
                        remove_end_index = idx
                    }
                });

                if (remove_end_index > -1) {
                    temp = temp.slice(0, remove_end_index)
                }
                return temp
            },
            back_control() {
                return (this.pagination.state.page == 1) ? 'disabled' : null;
            },
            forward_control() {
                return (Number(this.pagination.state.page) >= this.total_pages) ? 'disabled' : null;
            }

        }
    }
</script>
<style>
    .pagination {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .pagination_list {

        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        list-style: none;
    }

    .pagination_item {
        text-align: center;
        width: 2rem;
        border-radius: 3px;
        margin: 3px;
        cursor: pointer;
    }

    .pagination_item.active {
        background: #898b8e;
    }

    .pagination_item:hover {
        background: #9e9e9e;
    }
</style>