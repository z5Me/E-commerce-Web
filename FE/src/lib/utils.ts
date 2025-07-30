import axios from "axios";
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

export const uploadSingleImage = async (file: any) => {
  const CLOUND_NAME = 'dnqj78t2f';
  const PRESET_NAME = 'demo-upload';
  const FOLDER_NAME = 'Test';
  const CLOUND_API = `https://api.cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`;

  const formData = new FormData();

  formData.append("upload_preset", PRESET_NAME);
  formData.append("folder", FOLDER_NAME);
  formData.append("file", file);

  const response = await axios.post(`${CLOUND_API}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
  return response.data.secure_url;
}

export const createSlug = (name: string) => {
  const nameExtrac = name
    .normalize('NFD')                  // Tách dấu khỏi chữ cái
    .replace(/[\u0300-\u036f]/g, '')   // Xóa dấu
    .toLowerCase()                     // Chuyển thành chữ thường
    .replace(/[^a-z0-9\s-]/g, '')      // Xóa ký tự đặc biệt
    .trim()                            // Xóa khoảng trắng đầu/cuối
    .replace(/\s+/g, '-')               // Đổi khoảng trắng thành "-"
    .replace(/-+/g, '-');               // Gộp nhiều "-" liên tiếp

  const uniqueSlug = `${nameExtrac}-${Date.now()}`;

  return uniqueSlug;
}
