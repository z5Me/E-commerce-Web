import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export const findFitVariant = (variants: any, chooseVariant: any) => {
  return variants.filter((variant: any) =>
    chooseVariant.every((choosed: any) =>
      variant.values.some((v: any) => v.id === choosed.id)
    )
  );
};