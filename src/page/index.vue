<template>
    <div>
        <button @click="myclick">发射火箭～</button>
        <div>{{a}}</div>
        <div>{{b}}</div>
        <div>{{c}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            a: {},
            b: [],
            c: {}
        }
    },
    methods: {
        async myclick() {
            let res1 = await this.$http.get('/api/user/1')
            this.a = res1.data
            let res2 = await this.$http.get('/api/userlist')
            this.b = res2.data
            let res3 = await this.$http.post('/api/addUser', {
                nickname: '魔鬼',
                username: 'v_liangqin',
                password: '56789',
            })
            this.c = res3.data
        }
    }
}
</script>