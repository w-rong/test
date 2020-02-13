<template>
    <div class="leftroot">
        <weather />
        <brigade />
        <spot />
    </div>
</template>

<script>
import weather from './lib/weather'
import spot from './lib/spot'
import brigade from './lib/brigade'

export default {
    components: {
        weather,
        brigade,
        spot
    }
}
</script>

<style scoped lang="less">
    .leftroot{
        // display: flex;
        .flexDefault(space-between);
        flex-direction: column;
    }
</style>

