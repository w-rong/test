<template>
    <div class="roleInfo">
        <el-card>
            <el-row class="myrow">
                <el-col :span="8">
                    <!-- <el-input placeholder="请输入内容"  class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input> -->
                </el-col>
                <el-col :span="16">
                    &nbsp;&nbsp;
                    <el-button type="success" plain @click="addDialog = true">添加权限</el-button>
                </el-col>
            </el-row>

            <el-table :data="jurisList" border style="width: 100%" class="role_table">
                <el-table-column type="index" label="编号" width="100"></el-table-column>
                <el-table-column  prop="permissionCode" label="权限码" width="160"> </el-table-column>
                <el-table-column  prop="permissionName" label="权限名" width="160"> </el-table-column>
                <el-table-column  prop="permissionUrl" label="权限地址" width="320"> </el-table-column>
                <el-table-column prop="isEnable" label="是否启用" width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isEnable">是</div>
                        <div v-else>否</div>
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <!-- slot-scope="scope" -->
                        <div>
                            <el-button @click="moreData(scope.row.id)" size="mini" plain icon="el-icon-view" type="view"></el-button>
                            <el-button @click="delData(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete"></el-button>
                            <el-button @click="editData(scope.row.id)" size="mini" plain type="primary" icon="el-icon-edit"></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"  
                @current-change="currChange"
                :current-page="pageNo"
                :page-size="pageSize"
                :page-sizes="[5, 10]"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加权限 -->
        <el-dialog title="添加权限" width="40%" :visible.sync="addDialog" :center="true" custom-class="userInfoDia">
            <el-form :model="addUserform" >
                <el-form-item label="权限编码" label-width="100px"  :rules="[ { required: true, message: '不能为空'}]">
                    <el-input v-model="addUserform.permissionCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限名称" label-width="100px" :rules="[ { required: true, message: '不能为空'}]">
                    <el-input v-model="addUserform.permissionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限链接" label-width="100px" :rules="[{ required: true, message: '不能为空'}]">
                    <el-input v-model="addUserform.permissionUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" label-width="120px">
                    <el-radio v-model="addUserform.isEnable" label="1" >是</el-radio>
                    <el-radio v-model="addUserform.isEnable" label="0" >否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog=false">取 消</el-button>
                <el-button type="primary" @click="addJurisInfo">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 查看权限 -->
        <el-dialog title="查看权限" width="40%" :visible.sync="moreDialog" :center="true" custom-class="userInfoDia">
            <el-form :model="moreUserform" >
                <el-form-item label="编号" label-width="100px"  :rules="[ { required: true, message: '不能为空'}]">
                    <el-input :disabled="true" v-model="moreUserform.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限编码" label-width="100px"  :rules="[ { required: true, message: '不能为空'}]">
                    <el-input :disabled="true" v-model="moreUserform.permissionCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限名称" label-width="100px" :rules="[ { required: true, message: '不能为空'}]">
                    <el-input :disabled="true" v-model="moreUserform.permissionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限链接" label-width="100px" :rules="[{ required: true, message: '不能为空'}]">
                    <el-input :disabled="true" v-model="moreUserform.permissionUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" label-width="120px">
                    <el-radio :disabled="true" v-model="moreUserform.isEnable" label="1" >是</el-radio>
                    <el-radio :disabled="true" v-model="moreUserform.isEnable" label="0" >否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moreDialog=false">取 消</el-button>
                <el-button type="primary" @click="moreDialog = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改权限 -->
        <el-dialog title="修改权限" width="40%" :visible.sync="editDialog" :center="true" custom-class="userInfoDia">
            <el-form :model="editUserform" >
                <el-form-item label="编号" label-width="100px" :rules="[ { required: true, message: '不能为空'}]">
                    <el-input :disabled="true" v-model="editUserform.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限编码" label-width="100px"  :rules="[ { required: true, message: '不能为空'}]">
                    <el-input v-model="editUserform.permissionCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限名称" label-width="100px" :rules="[ { required: true, message: '不能为空'}]">
                    <el-input v-model="editUserform.permissionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限链接" label-width="100px" :rules="[{ required: true, message: '不能为空'}]">
                    <el-input v-model="editUserform.permissionUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" label-width="120px">
                    <el-radio v-model="editUserform.isEnable" label="1" >是</el-radio>
                    <el-radio v-model="editUserform.isEnable" label="0" >否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog=false">取 消</el-button>
                <el-button type="primary" @click="editJurisBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data(){
        return{
            search: '',
            jurisList: [
                {userName: 'iu', creationTime: '909', loginTime: '909', loginNumber: '6'}
            ],
            addDialog: false,
            moreDialog: false,
            editDialog: false,
            addUserform:{
                permissionCode: '',
                permissionName: '',
                permissionUrl: '',
                isEnable: '1',
            },
            moreUserform:{
                id: '',
                permissionCode: '',
                permissionName: '',
                permissionUrl: '',
                isEnable: '1',
                createTime: '',
            },
            editUserform:{
                id: '',
                permissionCode: '',
                permissionName: '',
                permissionUrl: '',
                isEnable: false,
                createTime: '',
            },
            pageNo: 1,
            pageSize: 8,
            total: 0,
        }
    },
    methods: {
        sizeChange(data){
            this.pageSize = data
            this.getJuris()
        },
        currChange(data){
            this.pageNo = data
            this.getJuris()
        },
        // 获取权限列表
        async getJuris(){
            var res = await this.$http.get(
                `/root/user/findPermissionList?pageNo=${this.pageNo}&pageSize=${this.pageSize}`,
            )
            let {data} = res.data
            this.jurisList = data.list
            this.total = data.total
        },
        // 添加权限
        async addJurisInfo(){
            var res = await this.$http.post(
                `/root/user/insertPtPermissionInfo`,
                qs.stringify({
                    isEnable: Number(this.addUserform.isEnable),
                    permissionCode: this.addUserform.permissionCode,
                    permissionName: this.addUserform.permissionName,
                    pemissionUrl: this.addUserform.permissionUrl,
                })
            )
            let {code, msg} = res.data
            if(code == 10000){
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'success'
                });
                this.getJuris()
            } else{
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
            }
            this.addDialog = false
        },
        // 查看权限
        async moreData(id){
            this.moreDialog = true
            var res = await this.$http.get(
                `/root/user/selectPermissionInfo?id=${id}`
            )
            let {data} = res.data
            this.moreUserform.id = data.id
            this.moreUserform.permissionCode = data.permissionCode
            this.moreUserform.permissionName = data.permissionName
            this.moreUserform.permissionUrl = data.permissionUrl
            this.moreUserform.isEnable = String(data.isEnable)
        },
        // 修改权限
        async editData(id){
            this.editDialog = true
            var res = await this.$http.get(
                `/root/user/selectPermissionInfo?id=${id}`
            )
            let {data} = res.data
            this.editUserform.id = data.id
            this.editUserform.permissionCode = data.permissionCode
            this.editUserform.permissionName = data.permissionName
            this.editUserform.permissionUrl = data.permissionUrl
            this.editUserform.isEnable = String(data.isEnable)
        },
        // 确认修改
        async editJurisBtn(id){
            var res = await this.$http.post(
                `/root/user/updatePtPermissionInfo`,
                qs.stringify({
                    id: this.editUserform.id,
                    isEnable: Number(this.editUserform.isEnable),
                    permissionCode: this.editUserform.permissionCode,
                    permissionName: this.editUserform.permissionName,
                    permissionUrl: this.editUserform.permissionUrl,
                    createTime: this.editUserform.createTime,
                })
            )
            let {code, msg} = res.data
            if(code == 10000){
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'success'
                });
                this.getJuris()
            } else{
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
            }
            this.editDialog = false
        },
        // 删除权限
        delData(id){
            this.$confirm('确认删除用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                var res = await this.$http.delete(
                    `/root/user/deletePtPermissionInfo?id=${id}`
                )
                let {code, msg} = res.data
                if(code == 10000){
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getJuris()
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
        }

    },
    mounted(){
        this.getJuris()
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
