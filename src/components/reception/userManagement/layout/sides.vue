<template>
    <el-menu :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo mymenu">
        <!-- 用户管理 -->
        <el-submenu index="1">
            <template slot="title" >
                <i class="el-icon-location"></i>
                <span>用户管理</span>
            </template>
            <el-menu-item @click="toUser">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
            </el-menu-item>
        </el-submenu>
        <!-- 角色管理 -->
        <el-submenu index="2" >
            <template slot="title" >
                <i class="el-icon-document"></i>
                <span>角色管理</span>
            </template>
            <el-menu-item @click="toRole">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
            </el-menu-item>
        </el-submenu>
        <!-- 权限管理 -->
        <el-submenu index="3" >
            <template slot="title" >
                <i class="el-icon-document"></i>
                <span>权限管理</span>
            </template>
            <el-menu-item @click="tojuris">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
            </el-menu-item>
        </el-submenu>
        
    </el-menu>
</template>

<script>
export default {
    props: ['propsStatus'],
    data(){
        return {
            jurisdctionShow: false,
            userStatus: 0,
        }
    },
    methods: {
        toRole(){
            this.$router.push({
                path: '/home/role',
                // query: {
                //     s: this.userStatus
                // }
            })
        },
        toUser(){
            this.$router.push({
                path: '/home/user',
                // query: {
                //     s: this.userStatus
                // }
            })
        },
        tojuris(){
            this.$router.push({
                path: '/home/juris',
                query: {
                    s: this.userStatus
                }
            })
        }
    },
}
</script>

<style>
    .mymenu {
        height: 100%;
        background-color: #f0f0f0;
    }
    .el-submenu__title, .el-menu-item{
        font-size: 20px;
    }
    .el-submenu{
        width: 100%;
    }
    .el-icon-arrow-down:before{
        content: ''
    }
    .el-menu-item.is-active{
        color: #333;
    }
</style>
