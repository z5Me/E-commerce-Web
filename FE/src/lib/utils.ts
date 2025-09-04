import type { IProduct } from "@/common/types/product";
import { useAppDispatch } from "@/store/store";
import { getAllProducts } from "@/store/thunks/productThunk";
import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractAttribute = (variants: any, attribute: any) => {
  // console.log('variants: ', variants)
  // console.log('attribute: ', attribute)
  const allAttributes = attribute.filter((attr: any) => {
    // Duyệt qua các giá trị của thuộc tính
    return attr.value.some((attrValue: any) => {
      // Kiểm tra có giá trị nào của thuộc tính xuất hiện trong biến thể hay không
      return variants.some((variant: any) => {
        // Duyệt qua các giá trị của biến thể
        return variant.values.some((variantValue: any) => {
          // So sánh id của giá trị thuộc tính với id của giá trị biến thể
          return variantValue._id.toString() === attrValue._id.toString();
        });
      });
    });
  });

  // Lọc ra các value thực sự xuất hiện trong variants
  const filter = allAttributes.map((attri: any) => {
    return {
      ...attri,
      value: attri.value.filter((item: any) => {
        return variants.some((variant: any) => {
          return variant.values.some((value: any) => {
            return item._id.toString() === value._id.toString()
          })
        })
      })
    }
  })

  return filter
};

export const findFitVariant = (variants: any, chooseVariant: any) => {
  return variants.filter((variant: any) =>
    chooseVariant.every((choosed: any) =>
      variant.values.some((v: any) => v._id === choosed._id)
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

export const debounce = (func: any, delay: number) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const getDetailProduct = (): IProduct | undefined => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const dataProducts = useSelector((state: any) => state.product.dataProducts, shallowEqual);
  const [data, setData] = useState<IProduct>();

  useEffect(() => {
    if (dataProducts && dataProducts.length > 0) {
      const filterProduct = dataProducts.filter((item: IProduct) => item.slug === slug);
      if (filterProduct) {
        setData(filterProduct[0]);
        return;
      }

      return;
    } else {
      dispatch(getAllProducts({ filterHidden: 'true' }));
    }
  }, [dataProducts, slug]);

  return data;
}

//Format Viet Nam Time
export function formatVietnamTime(dateInput: Date) {
  const date = new Date(dateInput);
  return date.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh', // Giờ VN
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

//Tìm và lấy giá cao nhất
export function getMaxPrice(allProducts: IProduct[]) {
  const maxPrice = allProducts.reduce((acc: number, curr: IProduct) => {
    const price = curr.variants.reduce((prev, current) => {
      return current.price > prev ? current.price : prev
    }, 0)
    return price > acc ? price : acc
  }, 0);

  return maxPrice;
}

//Fomart tiền việt nam
export function formatPriceVietNam(value: string | number, decimal = 1) {
  if (typeof value === 'string') {
    value = Number(value);
  };

  if (isNaN(value)) return "";

  if (value < 1000) {
    return value.toLocaleString("vi-VN") + 'đ'
  };

  if (value < 1000000) {
    return (value / 1000).toFixed(decimal).replace(/\.0+$/, "") + 'k';
  }

  if (value >= 1000000) {
    return (value / 1000000).toFixed(decimal).replace(/\.0+$/, "") + 'tr';
  }
}

//Format thêm dấu phân cách tiền lớn
export function VietNamPrice(value: string | number) {
  if (typeof value === 'string') {
    value = Number(value);
  };

  if (isNaN(value)) return "";

  return value.toLocaleString('vi-VN');
}