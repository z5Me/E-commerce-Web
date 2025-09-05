export const caculateTotalProduct = (cart) => {
    let total = 0;
    total = cart.products.reduce((acc, curr) => {
        // console.log('curr', curr);
        return acc + ((curr.variant.price - curr.variant.discount) * curr.quantity);
    }, 0)

    return total
}

export const caculateTotalCart = (cart) => {
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

    total = totalProduct - discountProduct - discountVoucher;
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