export const caculateTotalProduct = (cart) => {
    let total = 0;
    total = cart.products.reduce((acc, curr) => {
        // console.log('curr', curr);
        return acc + ((curr.variant.price - curr.variant.discount) * curr.quantity);
    }, 0)

    return total
}

export const caculateTotalCart = (cart) => {
    const shippingFee = cart.shippingFee;
    let totalProduct = 0;
    let discountProduct = 0;
    let discountVoucher = 0;
    let total = 0;
    let allData;

    totalProduct = cart.products.reduce((acc, curr) => {
        return acc + (curr.variant.price * curr.quantity);
    }, 0)

    discountProduct = cart.products.reduce((acc, curr) => {
        return acc + (curr.variant.discount * curr.quantity);
    }, 0)

    if (cart.voucherUsage && cart.voucherUsage.length > 0) {
        discountVoucher = cart.voucherUsage.reduce((acc, curr) => {
            if (curr.typeOfDiscount === 'fixed') return acc + curr.discount;
            if (curr.typeOfDiscount === 'percent') {
                if (curr.maxDiscount && curr.maxDiscount > 0) {
                    const total = acc + ((totalProduct - discountProduct) * curr.discount / 100)
                    if (total <= curr.maxDiscount) return total
                    return curr.maxDiscount
                }
            }

        }, 0)
    }

    total = totalProduct - discountProduct - discountVoucher + shippingFee;
    if (total < 0) total = 0;

    allData = {
        ...cart._doc,
        totalProduct,
        discountProduct,
        discountVoucher,
        total
    }

    return { totalProduct, discountProduct, discountVoucher, total, allData }
}

export function toRad(deg) {
    return (deg * Math.PI) / 180;
}

export function haversineDistanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371; //km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export function calculateShippingFeeKm(distanceKm) {
    const base = 10000; //Phí tối thiểu
    const ratePerKm = 4000; //Mỗi km tiếp theo
    let fee = base + distanceKm * ratePerKm;

    //Làm tròn (1000đ)
    fee = Math.ceil(fee / 1000) * 1000;
    return fee;
}