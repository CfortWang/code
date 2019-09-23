/*
 * [page 生成验证码] 
 * @Created by cfort on 2019-05-23 09:31:09 
 * @Last Modified by: cfort
 * @Last Modified time: 2019-09-23 14:33:44
 */
export default id => {
    /**
     * 创建一个图形验证码对象
     * @param {Object} options option
     * @returns {any} 验证码对象
     */
    function GVerify(options){
        // 默认options参数值
        this.options = {
            // 容器Id
            id,
            // canvas的ID
            canvasId: 'verifyCanvas',
            // 默认canvas宽度
            width: '90',
            // 默认canvas高度
            height: '32',
            // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
            type: 'blend',
            code: ''
        }

        // 判断传入参数类型
        if (Object.prototype.toString.call(options) === '[object Object]'){
            // 根据传入的参数，修改默认参数值
            console.log(typeof options)

            for(const i in options){
                this.options[i] = options[i]
            }
        }
        else {
            this.options.id = options
        }

        this.options.numArr = '0,1,2,3,4,5,6,7,8,9'.split(',')
        this.options.letterArr = getAllLetter()
        // eslint-disable-next-line no-underscore-dangle
        this._init()
        this.refresh()
    }

    GVerify.prototype = {
        // 初始化方法
        _init(){
            const con = document.getElementById(this.options.id)
            const canvas = document.createElement('canvas')
            // this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
            // this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
            canvas.id = this.options.canvasId
            canvas.width = this.options.width
            // canvas.width = document.body.clientWidth/2 - this.options.width;
            canvas.height = this.options.height
            canvas.style.cursor = 'pointer'
            canvas.innerHTML = '您的浏览器版本不支持canvas'
            con.appendChild(canvas)
            // eslint-disable-next-line consistent-this
            const parent = this

            canvas.onclick = function(){
                parent.refresh()
            }
        },
        // 生成验证码
        refresh(){
            this.options.code = ''
            const canvas = document.getElementById(this.options.canvasId)
            let ctx = null
            let txtArr = []

            if (canvas.getContext){
                ctx = canvas.getContext('2d')
            }

            ctx.textBaseline = 'middle'
            // this.options.width = document.body.clientWidth/2 - this.options.width;
            ctx.fillStyle = randomColor(180, 240)
            ctx.fillRect(0, 0, this.options.width, this.options.height)

            // 判断验证码类型
            if (this.options.type === 'blend'){
                txtArr = this.options.numArr.concat(this.options.letterArr)
            }
            else if (this.options.type === 'number'){
                txtArr = this.options.numArr
            }
            else {
                txtArr = this.options.letterArr
            }

            for(let i = 1; i <= 4; i++){
                const txt = txtArr[randomNum(0, txtArr.length)]
                this.options.code += txt
                ctx.font = '30px SimHei'
                // 随机生成字体大小
                // ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; 
                // 随机生成字体颜色
                ctx.fillStyle = randomColor(50, 160)
                // ctx.shadowOffsetX = randomNum(-3, 3);
                // ctx.shadowOffsetY = randomNum(-3, 3);
                ctx.shadowBlur = randomNum(-3, 3)
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
                const x = this.options.width / 5 * i
                const y = this.options.height / 2
                const deg = randomNum(-30, 30)
                // 设置旋转角度和坐标原点
                ctx.translate(x, y)
                ctx.rotate(deg * Math.PI / 180)
                ctx.fillText(txt, 0, 0)
                // 恢复旋转角度和坐标原点
                ctx.rotate(-deg * Math.PI / 180)
                ctx.translate(-x, -y)
            }

            // 绘制干扰线
            for(let i = 0; i < 4; i++){
                ctx.strokeStyle = randomColor(40, 180)
                ctx.beginPath()
                ctx.moveTo(randomNum(0, this.options.width / 2), randomNum(0, this.options.height / 2))
                ctx.lineTo(randomNum(0, this.options.width / 2), randomNum(0, this.options.height))
                ctx.stroke()
            }

            // 绘制干扰点
            for(let i = 0; i < this.options.width / 4; i++){
                ctx.fillStyle = randomColor(0, 255)
                ctx.beginPath()
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI)
                ctx.fill()
            }
        },
        // 验证验证码
        validate(code){
            const verifyCode = code.toLowerCase()
            const vCode = this.options.code.toLowerCase()

            if (verifyCode === vCode){
                return true
            }

            return false
        }
    }

    /**
     * 生成字母数组
     * @param {any} null 无
     * @returns {Array} 字母数组
     */
    function getAllLetter(){
        const letterStr = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
        return letterStr.split(',')
    }

    /**
     * 生成一个随机数
     * @param {int} min 最小值
     * @param {int} max 最大值
     * @returns {int} 随机数
     */
    function randomNum(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }

    /**
     * 生成一个随机色
     * @param {int} min 最小颜色值
     * @param {int} max 最大颜色值
     * @returns {int} 随机颜色rgb值
     */
    function randomColor(min, max){
        const r = randomNum(min, max)
        const g = randomNum(min, max)
        const b = randomNum(min, max)
        return `rgb(${ r },${ g },${ b })`
    }

    return new GVerify(id)
}