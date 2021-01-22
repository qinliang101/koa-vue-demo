<template>
    <div>
        <t-form
            style="width: 350px;margin:0 auto"
            :data="formData"
            ref="form"
            :colon="true"
            @submit="onSubmit"
            labelWidth="0"
        >
            <t-form-item name='account'>
                <t-input type="account" clearable v-model="formData.account" placeholder="请输入账户名">
                    <t-icon name="desktop" slot="prefix-icon"></t-icon>
                </t-input>
            </t-form-item>

            <t-form-item name='password'>
                <t-input type="password" clearablec v-model="formData.password" placeholder="请输入密码">
                    <t-icon name="lock-on" slot="prefix-icon"></t-icon>
                </t-input>
            </t-form-item>

            <t-form-item>
                <t-button theme="primary" type="submit" block >{{isRegister ? '注册' : '登录'}}</t-button>
            </t-form-item>
            <a @click="switchSubmmit">{{isRegister ? '现在登录' : '现在注册'}}</a>
        </t-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                account: '',
                password: '',
            },
            isRegister: false
        }
    },

    methods: {
        async onSubmit({ result, firstError, e }) {
            e.preventDefault()
            if (result === true) {
                let data = {}
                if (this.isRegister) {
                    data = await this.$http.post('/register', {
                        account: this.formData.account,
                        password: this.formData.password,
                    })
                } else {
                    data = await this.$http.post('/login', {
                        account: this.formData.account,
                        password: this.formData.password,
                    })
                }
                data = data.data
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    this.$message.success(this.isRegister ? '注册成功' : '登录成功')
                    this.$router.push({ path: '/user', query: { user_id: data.user_id} })
                } else {
                    this.$message.warning(data.info)
                }
            } else {
                this.$message.warning(firstError)
            }
        },

        switchSubmmit() {
            this.isRegister = !this.isRegister
            this.formData.account = ''
            this.formData.password = ''
        }
    },
}
</script>