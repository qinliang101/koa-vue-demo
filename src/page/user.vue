<template>
    <div style="margin:0 auto">
        <div>你好，{{userInfo.account}}</div>
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
        let data = await this.$http.get('/api/user/' + this.user_id)
        this.userInfo = data.data
    }
}
</script>