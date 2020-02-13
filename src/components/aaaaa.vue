<template>
	<div id="app111" >
                <headtop :title='pageTitle'/>
		<!-- <main :style="{height: `${960 * scaleY}px`}"> -->
		<main >
				<left />
				<center />
				<right />
			<!-- <div >
			</div>
			<div style="margin: 0 20px">
			</div>
			<div >
			</div> -->
		</main>
	</div>
</template>

<script>
import headtop from '@/components/header/headtop';
import left from '@/components/left';
import center from '@/components/center';
import right from '@/components/right';

function getWidth () {
	let dh = 1080, dw = 1920
	let height = window.innerHeight
	let width = window.innerWidth

	let scaleX = (height / dh)
	let scaleY = (width / dw)

	console.log(scaleX, scaleY)

	window.scale = Math.min(scaleY, scaleX)
}
// window.resize(
	getWidth()
// )

export default {
	// name: 'app',
	data () {
		return {
            pageTitle: '产业综合监测分析系统',
			scaleX: 1,
			// scaleY: 1
		}
	},
	watch(){
		// this.getWidth()
	},
	method:{
		getWidth () {
	let dh = 1080, dw = 1920
	let height = window.innerHeight
	let width = window.innerWidth

	let scaleX = (height / dh)
	let scaleY = (width / dw)

	console.log(scaleX, scaleY)

	window.scale = Math.min(scaleY, scaleX)
}
	},
	components: {
		headtop,
		left,
		center,
		right,
	},
	mounted () {
		// document.documentElement.style.fontSize = `${window.scale * 20}px`s
		// window.onresize = function(){
document.documentElement.style.fontSize = `${window.scale * 20}px`
let that = this
window.onresize = function(){
that.getWidth()
		}
		// window.resize()
		
	}
}
</script>

<style lang="less">
#app111 {
	background: url('../../public/static/img/bg@1x.jpg') no-repeat;
	// background: red;
	// min-width: 1920px;
	width: 100%;
	// min-height: 100vh;
	height: 100vh;
	background-size: 100% 100%;

	main{
		display: flex;
		justify-content: space-between;
		padding: 0 2.5%;
		height: calc(100vh - 5.5rem);
	}
}

body{
	overflow-y: hidden;
}
</style>
