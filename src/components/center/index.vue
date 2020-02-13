<template>
    <div class="leftroot">
        <maps />
        <portrait />
    </div>
</template>

<script>
import portrait from './lib/portrait'
import maps from './lib/maps'

export default {
    components: {
        portrait,
        maps
    }
}
</script>

<style scoped lang="less">
    .leftroot{
        .flexDefault(space-between);
        flex-direction: column;
        // flex: 1;
        // margin: 0 1%;
        width: 43rem;
        z-index: 98;
    }
</style>

