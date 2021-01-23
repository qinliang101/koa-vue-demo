import axios from 'axios'

const $http = axios.create({
    baseURL: ''
})

//这里是配置请求头的部分
$http.interceptors.request.use(config => {
    let token = window.localStorage.getItem('token')
    if (token) {
        token = 'Bearer ' + token
        config.headers['Authorization'] = token
    }
    return config
})

$http.interceptors.response.use(response => {
        // 获取更新的token
        const { authorization } = response.headers

        //如果token存在则存在localStorage
        authorization && localStorage.setItem('token', authorization)

        return response
    },
    error => {
        if (error.response) {
            const { status } = error.response
            //如果401或405则到登录页
            if (status == 401 || status == 405) {
                location.href = '#/login'
            }
        }
        return Promise.reject(error)
    }
)

export default $http