export default {
    state:{
        routepath:''
    },
    getters:{
        routepath:state=>state.routepath
    },
    mutations:{
        SET_PATH(state,path){
            state.routepath=path
        }
    }
}