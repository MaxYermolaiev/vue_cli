<template>
    <div class="col-sm-12 col-md-6 col-lg-3 card-item">
        <div class="card">
            <img :src="user_data.img" class="user-img" alt="photo user">
            <div class="card-body">
                <h5 @click="$router.push(`/user/${user_data._id}`)" class="card-title">{{`${user_data.firstname}
                    ${user_data.lastname}`}}</h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppCardSmall',
        props: {user_data: Object},
    }
</script>
<style scoped>

    h5 {
        cursor: pointer;
        text-transform: capitalize;
    }
    h5:hover {
        opacity: 0.7;
    }
    img{

        height: 300px;
        object-fit: cover;
    }
    .card-body{

        text-align: center;
    }
    .card-item{
        margin:4px;
    }
</style>