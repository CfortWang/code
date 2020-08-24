/**
 * 获取未来12个月份
 */
function getxAxisDate(){
    const complDate = []
    const curDate = new Date()
    let y = curDate.getFullYear()
    let m = curDate.getMonth() + 2
    complDate[0] = `${ y }-${ m.toString().length === 1 ? `0${ m }` : m }`
    m++

    for(let i = 1; i < 12; i++, m++){
        if (m === 13){
            y++
            m = 1
        }

        complDate[i] = `${ y }-${ m.toString().length === 1 ? `0${ m }` : m }`
    }

    return complDate
}