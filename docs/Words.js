const human = ["鏝井", "士敷", "赭伸", "曽透", "充伊", "跳呂", "弓柳", "遠三", "仮佐", "御堤"];
const place = ["宅浦", "案山色", "研茂", "木歴", "匹重", "今姉", "東生代", "多志摩", "二谷隅"];
const archi1 = ["荘", "コーポ", "ハイツ", "ハイム", "株式会社", "コーポレーション", "不動産"];
const archi2 = ["メゾン", "ハイツ", "株式会社"];
const koukoku1 = ["病院", "薬局", "歯科", "塾", "サロン",];
const koukoku2 = ["イカダ", "ニコニコ", "二谷隅", "宅浦", "案山色", "多志摩", "士敷", "弓柳", "遠三"];
const koukoku3 = ["クリニック",  "ピアノ教室", "専門学校", "スタジオ"]
const hiragana = ["お", "し", "へ", "ん"];
const car = ["佑 河 急 便", getPlace().split('').join(' ') + " 輸 送", "ド ー ド ー 便"];

const chimei = getPlace();

export function getHuman() {
    return human[Math.floor(Math.random() * human.length)];
}

    let archi3 = null;
    let archi = null;
    if (Math.floor(Math.random() * 2) === 0) {
        archi3 = chimei;
    } else {
        archi3 = getHuman();
    }

    if (Math.floor(Math.random() * 2) === 0) {
        archi = archi3 + archi1[Math.floor(Math.random() * archi1.length)];
    } else {
        archi = archi2[Math.floor(Math.random() * archi2.length)] + archi3;
    }


export function getArchi() {
    return archi;
}

export function getPlace() {
    return place[Math.floor(Math.random() * place.length)];
}

export function getHiragana() {
    return hiragana[Math.floor(Math.random() * hiragana.length)];
}

export function getCar() {
    return car[Math.floor(Math.random() * car.length)];
}

export function smallNumber() {
    return Math.floor(Math.random() * 1000).toString().padStart(3, Math.random() * 10 + 1);
}

export function bigNumber() {
    var num1 = Math.floor(Math.random() * 100).toString().padStart(2, Math.random() * 10 + 1);
    var num2 = Math.floor(Math.random() * 100).toString().padStart(2, Math.random() * 10 + 1);
    return num1 + '-' + num2;
}

export function Number4() {
    return Math.floor(Math.random() * 10000).toString().padStart(4, Math.random() * 10 + 1);
}

export function Koukou1() {
    return koukoku1[Math.floor(Math.random() * koukoku1.length)];
}

export function Koukou2() {
    return koukoku2[Math.floor(Math.random() * koukoku2.length)];
}

export function Koukou3() {
    return koukoku3[Math.floor(Math.random() * koukoku3.length)];
}