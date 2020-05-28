<!-- 章节创建页  -->
<template>
    <div class="createChapter">
        <el-dialog
            title="章节创建"
            :visible.sync="isCreate">
            <el-form
                :model="chapterInfo"
                ref="chapterInfoForm"
                :rules="rules"
                class="chapterInfoForm">
                <el-form-item label="章节名称" label-width="80px" prop="name">
                    <el-input v-model="chapterInfo.name" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom:0;">
                    <el-button 
                        type="primary" 
                        class="confirmBtn"
                        style="float:right;"
                        @click="submitForm('chapterInfoForm')">
                        创建
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {createChapterInfo} from '@/api/chapterManage';

export default {
    name: 'createChapter',
    data() {
        let checkName = (rule, content, callback) => {
            if(!content) {
                return callback(new Error("章节名称不能为空"));
            }
            callback();
        };
        return {
            isCreate: false,
            chapterInfo: {
                library_id: ''
            },
            rules: {
                name: [
                    {validator: checkName, trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        createChapterInfo(libraryID) {
            this.isCreate = !this.isCreate;
            this.chapterInfo.library_id = libraryID;
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    createChapterInfo(this.chapterInfo).then(res => {
                        if(res.code == 200) {
                            this.$message.success("创建成功");
                            this.$emit("createSituation", "success");
                        }
                        else {
                            this.$message.error("创建失败");
                        }
                    }).catch(error => {
                        console.log(error);
                        this.$message.error("创建失败");
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
