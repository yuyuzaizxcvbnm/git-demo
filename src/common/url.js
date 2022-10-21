
const domain = '/api/'

const urlList = {
    // 验证码
    code: `${domain}authCode/login?t=`,
    // 登录
    login:`${domain}user/login`,
    // 我的
    detail:`${domain}user/detail`,
}

export default urlList;