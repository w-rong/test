<template>
    <div class="leftroot">
        <opinion />
        <tourists />
        <consumption />
    </div>
</template>

<script>
import opinion from './lib/opinion'
import tourists from './lib/tourists'
import consumption from './lib/consumption'

export default {
    components: {
        opinion,
        consumption,
        tourists
    }
}
</script>

<style scoped lang="less">
    .leftroot{
        .flexDefault(space-between);
        flex-direction: column;
    }
</style>

