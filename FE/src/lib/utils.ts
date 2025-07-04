//Lọc các biến thể thành 1 mảng để hiện thị UI (dùng cho sản phẩm có 1 biến thể)
export const extractOneVariant = (variant: any) => {
    const result: any = {};
}

//Lọc các biến thể thành 1 mảng để hiển thị UI
export const extractAttribute = (variants: any, attribute: any) => {
    return attribute.filter((attr: any) => {
        // Duyệt qua các giá trị của thuộc tính
        return attr.values.some((attrValue: any) => {
            // Kiểm tra có giá trị nào của thuộc tính xuất hiện trong biến thể hay không
            return variants.some((variant: any) => {
                // Duyệt qua các giá trị của biến thể
                return variant.values.some((variantValue: any) => {
                    // So sánh id của giá trị thuộc tính với id của giá trị biến thể
                    return variantValue.id === attrValue.id;
                });
            });
        });
    });
};

//Lọc variant khả dụng dựa vào các biến thể được chọn
export const findFitVariant = (variants: any, chooseVariant: any) => {
    return variants.filter((variant: any) =>
        chooseVariant.every((choosed: any) =>
            variant.values.some((v: any) => v.id === choosed.id)
        )
    );
};