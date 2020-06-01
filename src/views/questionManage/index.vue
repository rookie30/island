<!-- 题库管理员-题目管理 -->
<template>
    <div class="questionManage">
        <div class="header">
            <el-select v-model="listQuery.type" @change="getList">
                <el-option
                    :value="1"
                    label="单选题">
                </el-option>
                <el-option
                    :value="2"
                    label="多选题">
                </el-option>
                <el-option
                    :value="3"
                    label="判断题">
                </el-option>
            </el-select>
            <span class="chapterTip">{{ chapterName }}</span>
            <el-button 
                icon="el-icon-plus" 
                style="float:right;margin-right:20px;"
                @click="createQuestion">
            </el-button>
        </div>
        <el-table 
            v-loading="isLoading"
            :data="questionInfo"
            fit 
            highlight-current-row>
            <el-table-column
                align="center"
                label="ID" 
                width="80">
                <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="题目">
                <template slot-scope="scope">
                        {{ scope.row.content }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="答案" 
                width="80">
                <template slot-scope="scope">
                        {{  scope.row.answer | answerFilter(listQuery.type) }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="解析" 
                width="200">
                <template slot-scope="scope">
                        {{ scope.row.analysis }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="难度" 
                width="80">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.level | levelTagFilter">
                        {{ scope.row.level | levelFilter }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="状态" 
                width="80">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusTagFilter">
                        {{ scope.row.status | statusFilter }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作" 
                width="200">
                <template slot-scope="scope">
                    <el-button 
                        icon="el-icon-edit-outline"
                        circle
                        @click="editQuestion(scope.row)">
                    </el-button>
                    <el-button icon="el-icon-delete" type="danger" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <EditQuestion
            ref="editQuestion"
            @isSuccess="getEditInfo($event)">
        </EditQuestion>
        <CreateQuestion
            ref="createQuestion"
            @isCreate="getCreateInfo($event)">
        </CreateQuestion>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import * as api from '@/api/questionManage';
import EditQuestion from '@/components/EditQuestion'; // 题目编辑页
import CreateQuestion from '@/components/CreateQuestion'; // 题目创建页

export default {
    name: 'questionManage',
    components: {
        Pagination,
        EditQuestion,
        CreateQuestion,
    },
    inject: [
        'reload'
    ],
    filters: {
        levelFilter(level) {
            const levelMap = {
                1: '简单',
                2: '中等',
                3: '困难'
            };
            return levelMap[level];
        },
        levelTagFilter(status) {
            const statusMap = {
                1: 'success',
                2: 'warning',
                3: 'danger'
            };
            return statusMap[status];
        },
        statusFilter(status) {
            const statusMap = {
                1: '已发布',
                0: '草稿'
            };
            return statusMap[status];
        },
        statusTagFilter(status) {
            const statusMap = {
                1: 'success',
                0: 'info'
            };
            return statusMap[status];
        },
        answerFilter(answer, type) {
            if(type != 3) {
                return answer;
            }
            else {
                const answerMap = {
                        1: '正确',
                        2: '错误'
                    };
                return answerMap[answer];
            }
            
        },
    },
    data() {
        return {
            chapterName: null, // 章节名称
            questionInfo: [], // 题目信息
            total: 0,
            isLoading: false,
            listQuery: {
                currentPage: 1,
                limit: 20,
                chapter: '', // 章节id
                type: 1
            },
        }
    },
    methods: {
        /**
         * 获取传入的章节信息
         */
        getChapterInfo() {
            const chapterInfo = JSON.parse(JSON.stringify(this.$route.query));
            this.listQuery.chapter = chapterInfo.id;
            this.chapterName = chapterInfo.name;
            this.getList();
        },

        getList() {
            this.isLoading = true;
            api.getQuestionInfo(this.listQuery).then(res => {
                // console.log(res);
                this.questionInfo = res.data.rows;
                this.total = res.data.count;
                this.isLoading = false;
            }).catch(error => {
                console.log(error);
                this.$message.error("获取题目信息失败");
                this.isLoading = false;
            });
        },

        editQuestion(info) {
            let questioInfo = JSON.parse(JSON.stringify(info));
            this.$refs.editQuestion.editQuestionInfo(questioInfo);
        },

        reloadPage() {
            this.listLoading = true;
            setTimeout(() => {
                this.listLoading = false;
                this.reload();
            }, 200);
        },

        getEditInfo(situation) {
            if(situation == "success") {
                this.reloadPage();
            }
        },

        createQuestion() {
            let chapterID = this.listQuery.chapter;
            this.$refs.createQuestion.createQuestion(chapterID);
        },

        getCreateInfo(situation) {
            if(situation == "success") {
                this.reloadPage();
            }
        }
    },
    mounted() {
        this.getChapterInfo();
    }
}
</script>

<style scoped>
.questionManage .header {
    margin: 15px;
}
.questionManage .chapterTip {
    font-size: 13px;
    margin-left: 15px;
    color: grey;
}
</style>