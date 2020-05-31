<!-- 创建试卷模板 -->
<template>
    <div class="paperModel">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>创建试卷模板</span>
          </div>
          <el-form
            ref="form"
            :rules="rules"
            label-width="80px"
            :model="paper_info"
          >
            <el-form-item label="试卷名称" prop="name">
              <el-input v-model="paper_info.name"></el-input>
            </el-form-item>
            <el-form-item label="试卷类型" prop="type">
              <el-radio-group v-model="paper_info.type">
                <el-radio :label="1">正式</el-radio>
                <el-radio :label="2">模拟</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit('form')"
                style="float:right"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
    </div>
</template>

<script>
import {addPaperModel} from '@/api/paper';

export default {
    name: 'paperModel',
    data() {
        let checkName = (rule, name, callback) => {
            if (!name) {
                return callback(new Error("请输入试卷名称"));
            }
            callback();
        };
        let checkType = (rule, type, callback) => {
            if(!type) {
                return callback(new Error("请选择试卷类型"));
            }
            callback();
        };
        return {
            paper_info: {},
            rules: {
                name: [{ validator: checkName, trigger: "blur" }],
                type: [{ validator: checkType, trigger: 'blur' }],
            }
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    addPaperModel(this.paper_info).then(res => {
                        console.log(res);
                        this.$message.success("创建成功");
                    }).catch(err => {
                        console.log(err);
                        this.$message.error("创建失败");
                    })
                }
                else {
                    return false;
                }
                
            });
        }
    },
    mounted() {
        this.paper_info.library_id = JSON.parse(sessionStorage.getItem("userInfo")).library_id;
    }
}
</script>

<style scoped>
.paperModel {
    margin-top: 10%;
}
.paperModel .box-card {
    width: 80%;
    margin: 0 auto;
}
</style>