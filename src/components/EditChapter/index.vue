<!-- 章节信息编辑页  -->
<template>
    <div class="editChapter">
        <el-dialog
            title="章节信息编辑"
            :visible.sync="isEdit">
            <el-form
                :model="chapterInfo"
                ref="chapterInfoForm"
                :rules="rules"
                class="chapterInfoForm">
                <el-form-item label="章节名称" label-width="80px" prop="name">
                    <el-input v-model="chapterInfo.name" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                        type="primary" 
                        class="confirmBtn"
                        @click="submitForm('chapterInfoForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {editChapterInfo} from '@/api/chapterManage';

export default {
    name: 'editChapter',
    data() {
         let checkName = (rule, content, callback) => {
            if(!content) {
                return callback(new Error("章节名称不能为空"));
            }
            callback();
        };
        return {
            isEdit: false,
            chapterInfo: {},
            rules: {
                name: [
                    {validator: checkName, trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        editChapterInfo(info) {
            this.isEdit = !this.isEdit;
            this.chapterInfo = info;
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    editChapterInfo(this.chapterInfo).then(res => {
                        if(res.code == 200) {
                            this.$message.success("修改成功");
                            this.$emit("editSituation", "success");
                        }
                        else {
                            this.$message.error("修改失败");
                        }
                    }).catch(error => {
                        console.log(error);
                        this.$message.error("修改失败");
                    });
                }
                else {
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
.editChapter .confirmBtn{
    float: right;
}
</style>