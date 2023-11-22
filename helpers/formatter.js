function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function toRupiah(value) {
    return value.toLocaleString('id-ID', {
        style: "currency",
        currency: "IDR"
    })
}

module.exports = {
    numberWithCommas,
    toRupiah
}