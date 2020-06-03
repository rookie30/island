<!-- 批卷页 -->
<template>
    <div class="checkPaper">

    </div>
</template>

<script>
import {checkPaper} from '@/api/examManage';

export default {
    name: 'checkPaper',
    data() {
        return {
            examId: '',

        }
    },
    methods: {
        getPaperInfo() {
            checkPaper(this.examId).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.examId = this.$route.query.examId;
        this.getPaperInfo();
    }
}
</script>

<style scoped>

</style>