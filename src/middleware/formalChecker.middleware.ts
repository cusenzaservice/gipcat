// https://www.mrw.it/javascript/verifica-partita-iva-javascript_12582.html
// TODO: FIX NOT WORKING
const checkVatNumber = (pi) => {
    if (pi == '') return false;
    else if (!/^[0-9]{11}$/.test(pi)) return false;
    else {
        var s = 0;
        for (let i = 0; i <= 9; i += 2) {
            s += pi.charCodeAt(i) - '0'.charCodeAt(0);
        }
        for (let i = 1; i <= 9; i += 2) {
            var c = 2 * (pi.charCodeAt(i) - '0'.charCodeAt(0));
            if (c > 9) c = c - 9;
            s += c;
        }
        var controllo = (10 - s % 10) % 10;
        if (controllo != pi.charCodeAt(10) - '0'.charCodeAt(0)) return true;
        else return false;
    }
}

// https://gbresci.blogspot.com/2011/07/controllo-check-digit-codice-fiscale-in.html
// TODO: FIX NOT WORKING
const checkFiscalCode = (cf) => {
    let valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let even_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let odd_set = "BAKPLCQDREVOSFTGUHMINJWZYX";

    if (cf == '') return '';
    cf = cf.toUpperCase();
    if (cf.length != 16)
        return false;

    for (let i = 0; i < 16; i++) {
        if (valid.indexOf(cf.charAt(i)) == -1)
            return false;
    }

    let s = 0;
    for (let i = 1; i <= 13; i += 2)
        s += even_set.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
    for (let i = 0; i <= 14; i += 2)
        s += odd_set
            .indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
    if (s % 26 != cf.charCodeAt(15) - 'A'.charCodeAt(0))
        return false;
    return true;
}

const checkMailAddress = (email) => {
    let c = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ) 
    if(c == null){
        return false;
    }else{
        return true;
    }
}

const formalChecker = {
    checkVatNumber: checkVatNumber,
    checkFiscalCode: checkFiscalCode,
    checkMailAddress: checkMailAddress
}

export = formalChecker;