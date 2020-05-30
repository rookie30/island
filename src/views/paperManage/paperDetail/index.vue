<template>
  <h1>Paper ID:{{paper_id}}</h1>
</template>

<script>
export default {
  data(){
    return{
      paper_id:''
    }
  },
  mounted(){
    this.paper_id = this.$route.query.paper_id;
  }
}
</script>

<style>

</style>