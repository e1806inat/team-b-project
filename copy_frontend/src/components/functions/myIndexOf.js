//function myIndexOf(hairetu, zokusei, key, setHensuu) {
export const myIndexOf = (hairetu, zokusei, key) => {
    let hensuu = -1
    if (zokusei === "kanji") {
        hairetu.map((comp, index) => {
            if (comp.Kanji === key) {
                hensuu = index
            }
        })
    }

    else if (zokusei === "kata") {
        hairetu.map((comp, index) => {
            if (comp.kata === key) {
                hensuu = index
            }
        })
    }

    else if (zokusei === "eng") {
        hairetu.map((comp, index) => {
            if (comp.eng === key) {
                hensuu = index
            }
        })
    }
    return hensuu
}

