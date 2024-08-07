const Qr = require('qrcode')
function generateQrCode(url) {
    return new Promise((resolve, reject) => {
        Qr.toDataURL(url, { color: { dark: '#0000FF', light: '#FFFFFF' } })
            .then(qrCodeUrl => resolve(qrCodeUrl))
            .catch(err => reject(err));
    })
}
module.exports={generateQrCode}