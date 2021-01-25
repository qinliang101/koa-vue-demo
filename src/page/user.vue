<template>
    <div class="page">
        <div class="section_top lemon_title">Hello，{{userInfo.account}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user_id: this.$route.query.user_id,
            userInfo: {},
        }
    },
    async created() {
        try {
            let data = await this.$http.get('/getUser')
            this.userInfo = data.data
        } catch(e) {
            this.$message.warning(e.statusText)
        }
    }
}
</script>