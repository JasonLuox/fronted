import Mock from 'mockjs'

const origin = 'http://127.0.0.1:8000/api'

// Mock.setup({
//     timeout: '6000'
// })

Mock.mock(origin + '/test/', 'get', {
    result: true,
    data: 'after'
})
