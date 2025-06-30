//Lọc các biến thể thành 1 mảng để hiển thị UI
export const extractAllVariant = (variants: any) => {
    const result: any = {};

    for (const variant of variants) {
        for (const key in variant) {
            const value = variant[key];
            // console.log('value: ', value)
            if (typeof value === 'object' && value !== null) {
                if (!result[key]) {
                    result[key] = [];
                }

                const exits = result[key].some((item: any) => item.id === value.id);
                if (!exits) {
                    result[key].push(value);
                }
            }
        }
    }

    return result;
}

//Lọc variant khả dụng dựa vào các biến thể được chọn
export const filterVariantByChoose = (variants: any, chooseVariants: any) => {
    return variants.filter((variant: any) => (
        Object.entries(chooseVariants).every(([key, val]: any) => variant[key]?.id === val.id)
    ))
}