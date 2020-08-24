/**
 * 获取指定时间到现在的所有月份
 */
function getRangeMonth(start){
    const temp = start.split('-')
    const startTime = new Date(temp[0], temp[1])
    const endTime = new Date()
    const monthArr = [start]

    while(endTime.getTime() - startTime.getTime() >= 0){
        const year = startTime.getFullYear()
        const month = startTime.getMonth() + 1 < 10 ? `0${ startTime.getMonth() + 1 }` : startTime.getMonth() + 1
        monthArr.push(`${ year }-${ month }`)
        startTime.setMonth(startTime.getMonth() + 1)
    }

    return monthArr
}