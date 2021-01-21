<template>
    <div style="width: 350px;margin:0 auto">
        <t-form
            :data="formData"
            :colon="true"
            labelWidth="0"
        >
            <t-form-item name='username'>
                <t-input type="username" clearable v-model="username" placeholder="请输入账户名">
                    <t-icon-desktop slot="prefix-icon"></t-icon-desktop>
                </t-input>
            </t-form-item>

            <t-form-item name='password'>
                <t-input type="password" clearablec v-model="password" placeholder="请输入密码">
                    <t-icon-lock-on slot="prefix-icon"></t-icon-lock-on>
                </t-input>
            </t-form-item>

            <t-form-item>
                <t-button theme="primary" @click="onSubmit" block >登录</t-button>
            </t-form-item>
        </t-form>
    </div>
</template>

<script>
import TIconDesktop from '@tencent/tdesign-vue/lib/icon/desktop';
import TIconLockOn from '@tencent/tdesign-vue/lib/icon/lock-on';
import bcrypt from 'bcryptjs'
export default {
    components: {
        TIconDesktop,
        TIconLockOn,
    },
    data() {
        return {
            formData: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        onReset() {
            this.formData.username = ''
            this.formData.password = ''
        },

        async onSubmit() {
            await this.$http.post('/api/postUserAuth', {
                username: this.formData.username,
                password: bcrypt.hashSync(this.formData.password),
            })
            this.$message.success('提交成功')
        },
    }
}
</script>