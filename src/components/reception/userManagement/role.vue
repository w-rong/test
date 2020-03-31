<template>
    <div class="roleInfo">
        <el-card>
            <el-row class="myrow">
                <el-col :span="8">
                    <!-- <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input> -->
                </el-col>
                <el-col :span="16">
                    &nbsp;&nbsp;
                    <el-button type="success" plain @click="addDialog = true">添加角色</el-button>
                </el-col>
            </el-row>

            <el-table :data="roleList" border style="width: 100%" class="role_table">
                <el-table-column type="index" label="编号" width="100"></el-table-column>
                <el-table-column  prop="roleName" label="角色名" width="160"> </el-table-column>
                <el-table-column  prop="createTime" label="创建时间" width="260"> </el-table-column>
                <el-table-column prop="isEnable" label="是否启用" width="260">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isEnable">是</div>
                        <div v-else>否</div>
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <div>
                            <el-button @click="moreData(scope.row.id)" size="mini" plain icon="el-icon-view" type="view"></el-button>
                            <el-button @click="delData(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete"></el-button>
                            <el-button @click="editData(scope.row.id)" size="mini" plain type="primary" icon="el-icon-edit"></el-button>
                            <el-button @click="currUserRole(scope.row.id)" size="mini" plain type="success" icon="el-icon-check"></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            
        </el-card>
        <!-- 查看角色 -->
        <el-dialog title="查看角色" width="40%" :visible.sync="moreDialog" :center="true" custom-class="userInfoDia">
            <el-form :model="moreInfo">
                <el-form-item label="编号" label-width="120px">
                    <el-input :disabled="true" v-model="moreInfo.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名" label-width="120px">
                    <el-input :disabled="true" v-model="moreInfo.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" label-width="120px">
                    <el-input :disabled="true" v-model="moreInfo.createTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" label-width="120px">
                    <el-radio :disabled="true" v-model="moreInfo.isEnable" label="1">是</el-radio>
                    <el-radio :disabled="true" v-model="moreInfo.isEnable" label="0">否</el-radio>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moreDialog=false">取 消</el-button>
                <el-button @click="moreDialog" type="primary" >确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加角色 -->
        <el-dialog title="添加角色" width="40%" :visible.sync="addDialog" :center="true" custom-class="userInfoDia">
            <el-form :model="addInfo">
                <el-form-item label="角色名" label-width="120px">
                    <el-input v-model="addInfo.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="是否启用" label-width="120px">
                    <el-radio v-model="addInfo.isEnable" label="1">是</el-radio>
                    <el-radio v-model="addInfo.isEnable" label="0">否</el-radio>
                </el-form-item> -->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog=false">取 消</el-button>
                <el-button @click="addRole" type="primary" >确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改角色 -->
        <el-dialog title="修改用户角色"  width="40%" :visible.sync="editDialog" :center="true" custom-class="userInfoDia">
            <el-form :model="editInfo">
                <el-form-item  label="编号" label-width="120px">
                    <el-input :disabled="true" v-model="editInfo.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名" label-width="120px">
                    <el-input v-model="editInfo.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" label-width="120px">
                    <el-input :disabled="true" v-model="editInfo.createTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" label-width="120px">
                    <el-radio v-model="editInfo.isEnable" label="1" >是</el-radio>
                    <el-radio v-model="editInfo.isEnable" label="0" >否</el-radio>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog=false">取 消</el-button>
                <el-button @click="editDataBtn" type="primary" >确 定</el-button>
            </div>
        </el-dialog>
        <!-- 角色权限 -->
        <el-dialog title="添加权限" width="40%" :center="true" style="text-align:cennter" :visible.sync="setRoleDialog">
            <el-tree
                @check-change="roleChange"
                ref="mytree"
                :data="roleData"
                show-checkbox
                node-key="id"
                :default-expanded-all="true"
                :default-checked-keys="defaultChecked"
                :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="setRoleDialog=false">取 消</el-button>
                <el-button type="primary" @click="setUserRole">确 定</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>
import moment from "moment"
import qs from 'qs'
export default {
    data(){
        return{
            
            search: '',
            roleList: [
                {userName: 'iu', creationTime: '909', loginTime: '909', loginNumber: '6'}
            ],
            addDialog: false,
            setRoleDialog: false,
            editDialog: false,
            moreDialog: false,
            currRoleId: '',
            moreInfo:{
                roleName: '',
                createTime: '',
                isEnable: '1',
                id: ''
            },
            addInfo:{
                roleName: '',
                isEnable: '1',
            },
            editInfo:{
                id: '',
                roleName: '',
                createTime: '',
                isEnable: '1',
            },
            rolepageNo: '1',
            rolepageSize: '9999',
            defaultChecked: [],
            defaultProps: {
                label: 'permissionName',
            },
            roleData: []
            
        }
    },
    methods: {
        sizeChange(){

        },
        currChange(){

        },
        // 获取角色
        async getRole(){
            var res = await this.$http.get(
                `/root/user/findRoleList`
            )
            let {data} = res.data
            if(data.length == 0){
                this.$message({
                    showClose: true,
                    message: '暂无数据'
                });
            } else{
                this.roleList = data
            }
        },
        // 查看角色
        async moreData(id){
            this.moreDialog = true
            var res = await this.$http.post(
                `/root/user/findRoleInfo`,
                qs.stringify({
                    roleId: id
                })
            )
            let {data} = res.data
            this.moreInfo.id = data.id
            this.moreInfo.roleName = data.roleName
            this.moreInfo.createTime = data.createTime
            this.moreInfo.isEnable = String(data.isEnable)
        },
        // 添加角色
        async addRole(){
            var res = await this.$http.post(
                `/root/user/insertPtRoleInfo`,
                qs.stringify({
                    roleName: this.addInfo.roleName,
                    // isEnable: Number(this.addInfo.isEnable),
                })
            )
            let {msg, code} = res.data
            if(code == 10000){
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'success'
                });
                this.getRole()
            } else {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
            }
            this.addDialog = false 
        },

        // 修改角色
        async editData(id){
            this.editDialog = true
            var res = await this.$http.post(
                `/root/user/findRoleInfo`,
                qs.stringify({
                    roleId: id
                })
            )
            let {data} = res.data
            this.editInfo.id = data.id
            this.editInfo.roleName = data.roleName
            this.editInfo.createTime = data.createTime
            this.editInfo.isEnable = String(data.isEnable)
        },
        // 确认修改
        async editDataBtn(){
            var res = await this.$http.post(
                `/root/user/updatePtRoleInfo`,
                qs.stringify({
                    createTime: this.editInfo.createTime,
                    id: Number(this.editInfo.id),
                    isEnable: this.editInfo.isEnable,
                    roleName: this.editInfo.roleName,
                })
            )
            console.log(res)
            let {code, msg} = res.data
            if(code == 10000){
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'success'
                });
                this.getRole()
            } else{
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
            }
            this.editDialog = false
        },
        // 删除角色
        async delData(id){
            this.$confirm('确认删除用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                var res = await this.$http.delete(
                    `/root/user/deletePtRoleInfo?id=${id}`
                )
                let {code, msg} = res.data
                if(code == 10000){
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getRole()
                } else {
                    this.$message({
                        showClose: true,
                        message: msg,
                        type: 'error'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 权限列表
        async getRoleList(){
            var res = await this.$http.get(
                `/root/user/findPermissionList?pageNo=${this.rolepageNo}&pageSize=${this.rolepageSize}`
            )
            console.log(res)
            let {data} = res.data
            this.roleData = data.list
        },
        // 角色对应权限
        async currUserRole(id){
            this.currRoleId = id
            this.setRoleDialog = true
            this.getRoleList()
            
            var res1 = await this.$http.get(
                `/root/user/findRolePermissions?roleId=${id}`
            )
            let data1 = res1.data.data
            var that = this
            this.defaultChecked = []
            if(data1.length != 0){
                data1.forEach(element => {
                    that.defaultChecked.push(element.id)    
                });
            }
            console.log(data1)
        },
        // 修改角色权限
        async roleChange(data, isTrue){
            console.log(data)
            if(isTrue == true){
                // 添加
                var res = await this.$http.post(
                    `/root/user/addPermissionForRole`,
                    qs.stringify({
                        permissionId: data.id,
                        roleId: this.currRoleId
                    })
                )
                console.log(res)
            } else {
                // 移除
                var res = await this.$http.post(
                    `/root/user/removePermissionFromRole`,
                    qs.stringify({
                        permissionId: data.id,
                        roleId: this.currRoleId
                    })
                )
                console.log(res)
            }

        },
        // 确认角色权限
        setUserRole(){

        }
        
    },
    mounted(){
        this.getRole()
        this.getRoleList()
    }
}
</script>

<style>
    .roleInfo .el-dialog__header{
        border: none;
    }
    .roleInfo .el-icon-close:before{
        color: #333;
    }
    .roleInfo{
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
    .role_table{
        margin-top: 50px;
    }
</style>
