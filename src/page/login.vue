<template>
    <div class="page">
        <t-form
            class="section_top t_form_ceneter"
            :data="formData"
            ref="form"
            :colon="true"
            @submit="onSubmit"
            labelWidth="0"
        >
            <t-form-item name='user_name'>
                <t-input type="user_name" clearable v-model="formData.user_name" placeholder="请输入账户名">
                    <t-icon name="desktop" slot="prefix-icon"></t-icon>
                </t-input>
            </t-form-item>

            <t-form-item name='password'>
                <t-input type="password" clearablec v-model="formData.password" placeholder="请输入密码">
                    <t-icon name="lock-on" slot="prefix-icon"></t-icon>
                </t-input>
            </t-form-item>

            <t-form-item>
                <t-button theme="primary" type="submit" block >{{isRegister ? 'Register' : 'Login'}}</t-button>
            </t-form-item>

            <t-form-item>
                <a style="margin:0 auto" href="javascript:;" @click="switchSubmmit">{{isRegister ? 'Login Now' : 'Register Now'}}</a>
            </t-form-item>
        </t-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                user_name: '',
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
                        user_name: this.formData.user_name,
                        password: this.formData.password,
                    })
                } else {
                    data = await this.$http.post('/login', {
                        user_name: this.formData.user_name,
                        password: this.formData.password,
                    })
                }
                let userInfo = data.data
                if (userInfo.success) {
                    localStorage.setItem('token', userInfo.token)
                    this.$router.push('/user')
                } else {
                    this.$message.warning(userInfo.info)
                }
            } else {
                this.$message.warning(firstError)
            }
        },

        switchSubmmit() {
            this.isRegister = !this.isRegister
            this.formData.user_name = ''
            this.formData.password = ''
        }
    },
}
</script>