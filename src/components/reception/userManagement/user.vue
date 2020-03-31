<template>
    <div class="userInfo">
        <el-card>
            <el-row class="myrow">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="16">
                    &nbsp;&nbsp;
                    <el-button type="success" plain @click="openAddUse">添加用户</el-button>
                    <!-- <el-button type="success" plain @click="addDialog = true; addUserform = []">添加用户</el-button> -->
                </el-col>
            </el-row>

            <el-table :data="userList" border style="width: 100%" class="user_table">
                <el-table-column type="index" label="编号" width="100"></el-table-column>
                <el-table-column  prop="userName" label="用户名" width="160"> </el-table-column>
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
                            <!-- <el-button @click="currUserRole(scope.row.id )"   size="mini" plain type="success" icon="el-icon-check"></el-button> -->
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"  
                @current-change="currChange"
                :current-page="currPage"
                :page-size="pagesize"
                :page-sizes="[5, 10]"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加 -->
        <el-dialog title="添加用户" width="40%" :visible.sync="addDialog" :center="true" custom-class="userInfoDia">
            
            <el-form :model="addUserform" >
                <el-form-item label="用户名" label-width="100px" prop="userName" :rules="[ { required: true, message: '不能为空'}]">
                    <el-input v-model="addUserform.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="100px" prop="Password" :rules="[{validator:validcodeName, trigger:'blur',  message: '6-16字母数字组合'}]">
                    <el-input type="password"  v-model="addUserform.passWord" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog=false">取 消</el-button>
                <el-button type="primary" @click="addUserInfo('addUserform')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 查看个人信息 -->
        <el-dialog title="查看用户信息" width="40%" :visible.sync="moreDialog" :center="true" custom-class="userInfoDia">
            <el-form :model="moreInfo">
                <el-form-item label="用户名" label-width="120px">
                    <el-input :disabled="true" v-model="moreInfo.userName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="密码" label-width="120px">
                    <el-input :disabled="true" v-model="moreInfo.passWord" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="创建时间" label-width="120px">
                    <el-input :disabled="true" v-model="moreInfo.createTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" label-width="120px">
                    <el-radio v-model="moreInfo.isEnable" label="1" :disabled="true">是</el-radio>
                    <el-radio v-model="moreInfo.isEnable" label="0" :disabled="true">否</el-radio>
                </el-form-item>
                <el-form-item label="角色" label-width="120px">
                    <el-checkbox-group v-model="moreInfo.userRoleCheck" :disabled="true">
                        <el-checkbox  v-for="(item, index) in roleInfo" :checked="true" :label="item" :key="index">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moreDialog=false">取 消</el-button>
                <el-button @click="moreDialog=false" type="primary" >确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改用户信息 -->
        <el-dialog title="修改用户信息" width="40%" :visible.sync="editDialog" :center="true" custom-class="userInfoDia">
            <el-form :model="editUserform">
                <el-form-item label="用户名" label-width="100px">
                    <el-input v-model="editUserform.userName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="密码" label-width="100px">
                    <el-input v-model="editUserform.passWord" autocomplete="off"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="是否启用" label-width="120px">
                    <el-radio v-model="editUserform.isEnable" label="1">是</el-radio>
                    <el-radio v-model="editUserform.isEnable" label="0">否</el-radio>
                </el-form-item> -->
                <el-form-item label="角色" label-width="120px">
                    <el-checkbox-group v-model="editUserform.userRoleCheck"  @change="roleChange(editUserform.userRoleCheck)">
                        <el-checkbox  v-for="(item, index) in editRoleInfo"  :label="item.id" :key="index" :checked="item.checked">{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog=false">取 消</el-button>
                <el-button type="primary" @click="editUserBtn()" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import md5 from 'js-md5';
import qs from 'qs'
export default {
    data(){
        return{
            validcodeName: (rule,value,callback)=>{
                let reg= /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/
                if(!reg.test(value)){callback(new Error('必须是由4-9位数字和字母组合'))
                }else{
                    callback()
                }
            },
            currPage: 1,
            pagesize: 10,
            total: 0,
            search: '',
            userList: [],
            roleListAll: [],
            moreDialog: false,
            editDialog: false,
            addDialog: false,
            moreInfo: {
                userName: '',
                createTime: '',
                passWord: '',
                isEnable: false,
                userRoleCheck: [],
            },
            addUserform: {
                userName: '',
                passWord: ''
            },
            editUserform: {
                userName: '',
                passWord: '',
                isEnable: '1',
                userRoleCheck: [],
            },
            editUserId: '',
            roleInfo: [],
            editRoleInfo: [],
            oldEditRole: [],
            editRoleLength: 0,
            
            
        }
    },
    methods: {
        openAddUse(){
            this.addDialog = true; 
            // this.addUserform = {}
        },
        sizeChange(data){
            this.pagesize = data
            this.getUser()
        },
        currChange(data){
            this.currPage = data
            this.getUser()
        },
        // 获取用户
        async getUser(){
            var res = await this.$http.get(
                `/root/user/findUsersPage?pageNo=${this.currPage}&pageSize=${this.pagesize}`
            )
            let {data} = res.data
            this.userList = data.list
            this.total = data.total
        },
        // 查询用户
        async searchUser(){
             var res = await this.$http.get(
                `/root/user/findUsersPage?username=${this.search}`
            )
            let {data} = res.data
            this.userList = data.list
            this.total = data.total
        },
        // 查看用户信息
        async moreData(id){
            this.moreDialog = true
            var res = await this.$http.get(
                `/root/user/selectUserInfo?id=${id}`
            )
            let {data} = res.data
            this.moreInfo.userName = data.userName
            this.moreInfo.passWord = data.passWord
            this.moreInfo.createTime = data.createTime
            this.moreInfo.isEnable = String(data.isEnable)
            // 获取用户对应角色
            var res1 = await this.$http.get(
                `/root/user/findUserRoles?userId=${id}`
            )
            let data1 = res1.data.data
            this.roleInfo = data1
            this.getUerRole(id)
        },
        // 获取用户对应角色
        async getUerRole(id){
            var res1 = await this.$http.get(
                `/root/user/findUserRoles?userId=${id}`
            )
            let data1 = res1.data.data
            this.roleInfo = data1
        },
        // 添加用户
        async addUserInfo(){
            let reg= /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/
            if(this.addUserform.passWord == '' || this.addUserform.userName == '' ){
                this.$message({
                    showClose: true,
                    message: '不能为空',
                    type: 'error'
                });
                return
            }
            if(!reg.test(this.addUserform.passWord)){
                return
            }
            var res = await this.$http.post(
                `/root/user/addUser`,
                qs.stringify({
                    pwd: md5(this.addUserform.passWord),
                    username:this.addUserform.userName,
                    //let passwordNew = md5(this.editFormRule.pass)
                })
            )
            let {data, code} = res
            // console.log(res)
            if(data.code == 10000){
                this.$message({
                    showClose: true,
                    message: data.msg,
                    type: 'success'
                });
                this.addDialog = false
                this.getUser()
            } else {
                this.$message({
                    showClose: true,
                    message: data.msg,
                    type: 'error'
                });
            }
            for(var key in this.addUserform){
                this.addUserform[key] = ''
            }
        },
        // 删除用户
        delData(id){
            var taht = this
            this.$confirm('确认删除用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                var res = await this.$http.delete(
                    `/root/user/deleteUserInfo?id=${id}`
                )
                let {code, msg} = res.data
                if(code == 10000){
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getUser()
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
        // 修改用户
        async editData(id){
            // this.editUserform.userRoleCheck = []
            this.oldEditRole = []
            this.oldEditRole = []
            this.editUserId = id
            this.editDialog = true
            var res = await this.$http.get(
                `/root/user/selectUserInfo?id=${id}`
            )
            let {data} = res.data
            this.editUserform.userName = data.userName
            this.editUserform.passWord = data.passWord
            this.editUserform.isEnable = String(data.isEnable)
            // 根据获取角色列表
            var res1 = await this.$http.get(
                `/root/user/findRoleList`
            )
            let data1 = res1.data.data
            this.roleListAll = res1.data.data
            // 根据id获取对应角色
            var res2 = await this.$http.get(
                `/root/user/findUserRoles?userId=${id}`
            )
            let data2 = res2.data.data
            this.oldEditRole = res2.data.data
            var that = this
            this.editRoleInfo = []
            if(data1.length != 0){
                data1.map(element => {
                    that.editRoleInfo.push({id: element.id, roleName: element.roleName, checked: false})
                });
                this.editUserform.userRoleCheck = []
                that.editRoleInfo.forEach(item=>{
                    if(data2.indexOf(item.roleName)!= -1){
                        this.editUserform.userRoleCheck.push(item.id)
                    }
                })
            }

        },
        // 修改角色
        async roleChange(data){
            var oldLength = this.editRoleLength
            var newLength = this.editUserform.userRoleCheck.length
            if(oldLength < newLength){
                //为用户添加角色
                var res = await this.$http.post(
                    `/root/user/addRoleForUser`,
                    qs.stringify({
                        roleId: this.editUserform.userRoleCheck[this.editUserform.userRoleCheck.length -1],
                        userId: this.editUserId,
                    })
                )
                let {msg, code} = res.data
                if(code == 10000){
                    oldLength += 1
                }
            } else {
                //不变或移除角色
                var oldRole = []
                var disRoleId = ''
                var disRoleName = ''
                this.oldEditRole.map(item=>{
                    this.roleListAll.map(items=>{
                        if(item == items.roleName){
                            oldRole.push( items.id)
                        }
                    })
                })
                oldRole.forEach(item=>{
                   if(data.indexOf(item) == -1){
                       disRoleId = item
                   }

                })

                var res = await this.$http.post(
                    `/root/user/removeRoleFromUser`,
                    qs.stringify({
                        roleId: disRoleId,
                        userId: this.editUserId,
                    })
                )
            }
        },
        
        // 确认修改
        async editUserBtn(){
            this.editDialog = true
            var res = await this.$http.post(
                `/root/user/editUserInfo`,
                qs.stringify({
                    userId: this.editUserId,
                    username: this.editUserform.userName
                })
            )
            let {code, msg} = res.data
            if(code == 10000){
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'success'
                });
                this.getUser()
            } else{
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
            }
            this.editDialog = false

            
        },
        
    },
    mounted(){
        this.getUser()
    }
}

</script>

<style>
    .userInfo{
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
    .user_table{
        margin-top: 50px;
    }
    .userInfo .el-icon-close:before{
        color: #333;
    }
    .userInfo .el-dialog.userInfoDia .el-dialog__header{
        border: none;
    }
</style>
