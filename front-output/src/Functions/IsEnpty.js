
//送られた文字列がどれか空ならtrue
const isEnpty = (strArray) => {
    let flag = false
    strArray.map((str) => {
        if (!str) {
            flag = true
        }
    })
    return flag
}

export default isEnpty