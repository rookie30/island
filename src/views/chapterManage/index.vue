<!-- 章节管理 -->
<template>
    <div class="chapterManage">
        <div class="header">
            <el-button 
                icon="el-icon-plus" 
                style="float:right;"
                @click="createChapter">
            </el-button>
        </div>
        <div class="content">
            <el-table
                v-loading="isLoading"
                :data="chapterInfo"
                fit 
                highlight-current-row>
                <el-table-column align="center" label="ID" width="80">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="章节名称">
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button 
                            icon="el-icon-edit-outline"
                            circle 
                            class="operationBtn"
                            @click="editChapter(scope.row)">
                        </el-button>
                        <el-button
                            icon="el-icon-document-copy"
                            circle
                            @click="toQuestionManage(scope.row)">
                        </el-button>
                        <el-button icon="el-icon-delete" type="danger" circle class="delAccountBtn operationBtn"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <EditChapterForm 
            ref="editChapterForm"
            @editSituation="getEditSituation($event)">
        </EditChapterForm>
        <CreateChapterForm 
            ref="createChapterForm"
            @createSituation="getCreateSituation($event)">
        </CreateChapterForm>
    </div>
</template>


<script>
import * as api from '@/api/chapterManage';
import EditChapterForm from '@/components/EditChapter';
import CreateChapterForm from '@/components/CreateChapter';

export default {
    name: 'chapterManage',
    components: {
        EditChapterForm,
        CreateChapterForm,
    },
    inject: [
        'reload'
    ],
    data() {
        return {
            chapterInfo: [],
            count: 0,
            isLoading: false
        }
    },
    methods: {
        getChapterInformation() {
            this.isLoading = true;
            api.getChapterInfo().then(res => {
                this.chapterInfo = res.data.rows;
                this.count = res.count;
                this.isLoading = false;
            }).catch(error => {
                console.log(error);
                this.$message.error("获取章节信息失败");
                this.isLoading = false;
            });
        },

        editChapter(info) {
            let chapterInfo = JSON.parse(JSON.stringify(info));
            this.$refs.editChapterForm.editChapterInfo(chapterInfo);
        },

        toQuestionManage(info) {
            let chapterInfo = JSON.parse(JSON.stringify(info));
            this.$router.push({path: '/questionManage', query: chapterInfo});
        },

        createChapter() {
            let libraryID = this.chapterInfo[0].library_id;
            this.$refs.createChapterForm.createChapterInfo(libraryID);
        },

        getCreateSituation(situation) {
            if(situation == "success") {
                this.reloadPage();
            } 
        },

        getEditSituation(situation) {
            if(situation == "success") {
                this.reloadPage();
            } 
        },

        reloadPage() {
            this.listLoading = true;
            setTimeout(() => {
                this.listLoading = false;
                this.reload();
            }, 200);
        },
    },
    mounted() {
        this.getChapterInformation();
    }
}
</script>

<style scoped>
.chapterManage .header {
    margin: 15px;
}
</style>