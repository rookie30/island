<!-- 章节信息编辑页  -->
<template>
    <div class="editChapter">
        <el-dialog
            title="章节信息编辑"
            :visible.sync="isEdit">
            <el-form
                :model="chapterInfo"
                class="chapterInfoForm">
                <el-form-item label="章节名称" label-width="80px">
                    <el-input v-model="chapterInfo.name" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="confirmBtn">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'editChapter',
    data() {
        return {
            isEdit: false,
            chapterInfo: {},

        }
    },
    methods: {
        editChapterInfo(info) {
            this.isEdit = !this.isEdit;
            this.chapterInfo = info;
        }
    }
}
</script>

<style scoped>
.editChapter .confirmBtn{
    float: right;
}
</style>