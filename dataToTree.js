/**
 * 将数组类型数据转化为树状数据
 * @param {Array} data 原始数据
 * @param {String} parentId 父节点的id
 * @return {Array} 返回树状格式数据
 */
function translateDataToTree(data, parentId){
    const tree = []
    let temp = []
    data.forEach(item => {
        if (item.upId == parentId){
            const obj = item
            temp = this.translateDataToTree(data, item.deptId)

            if (temp.length > 0){
                obj.children = temp
            }

            tree.push(obj)
        }
    })
    return tree
}