function g2() {

    let objData = { a: 1, b: 2.2 }

    let xyzForLongName = 'xyz:12.34'

    //object-rest-spread
    objData = { ...objData, c: `abc&${xyzForLongName}` } //會添加_objectSpread2, _defineProperty等函式

    //array function
    let testLongName = () => {
        return 'ttt:5678'
    }

    //promise
    let pm = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('g2 foo')
        }, 300)
    })
    pm.then((value) => {
        console.log(value)
    })

    //async function
    async function testAsync() {
        async function core() {
            return Promise.reject('reject')
        }
        await core()
    }
    testAsync()
        .then((r) => {
            console.log('aaa testAsync resolve', r)
        })
        .catch((r) => {
            console.log('aaa testAsync reject', r)
        })

    console.log('g2 objData=', objData)
    console.log('g2 testLongName()=', testLongName())
}

export default g2
