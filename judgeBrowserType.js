/**
 * 判断浏览器类型
 */
function judgeBrowserType(){
    const { userAgent } = navigator
    const isOpera = userAgent.indexOf('Opera') > -1
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    const isFirefox = userAgent.indexOf("Firefox") > -1
    const isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1
    const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1

    if (isOpera){
        return 'opera'
    }

    if (isIE || isEdge || isIE11){
        return 'ie'
    }

    if (isFirefox){
        return 'firefox'
    }

    if (isSafari){
        return 'safari'
    }

    if (isChrome){
        return 'chrome'
    }
}