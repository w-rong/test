<template>
    <div class="user_con">
        <div class="user_header">
            <headers />
        </div>
        <div class="home_container">
            <div class="home_side">
                <sides />
            </div>
            <div class="home_right">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import headers from '@/components/reception/userManagement/layout/headers.vue'
import sides from '@/components/reception/userManagement/layout/sides.vue'
export default {
    components: {
        headers,
        sides
    },
}
</script>

<style>
    .user_con{
        width: 100%;
        height: 100%;
    }
    .user_header{
        width: 100%;
        height: 80px;
    }
    .home_container{
        width: 100%;
        height: calc(100% - 80px);
    }
    .home_side{
        width: 200px;
        height: 100%;
        float: left;
    }
    .home_right{
        float: right;
        width: calc(100% - 200px);
        height: 100%;
        overflow: hidden;
    }
</style>
