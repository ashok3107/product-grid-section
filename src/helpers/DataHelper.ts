import { type DetailsByColorType, type ProductTypeForProductCard } from "../App";
import products from '../data/products.json';
import productImages from '../data/product-images.json';
import inventory from '../data/inventory.json';

export const formatProductsWithSkuDetails = () => {
  const modifiedProducts: Array<ProductTypeForProductCard> = [];
    products.forEach((product) => {
      const detailsByColor: DetailsByColorType = {};
      const colors: Array<string> = [];
      const tempImages = productImages.filter(img => img.product_id === product.product_id);
      tempImages.forEach((img) => {
        const tempColor = img.color;
        if (!detailsByColor[tempColor]) {
          const productWithPriceDetails = inventory.find(item => item.product_id === product.product_id && item.color === tempColor) || inventory[0];
          detailsByColor[tempColor] = {
            images: [],
            color: tempColor,
            salePrice: productWithPriceDetails.sale_price,
            listPrice: productWithPriceDetails.list_price,
          };
          colors.push(tempColor);
        }
        detailsByColor[tempColor].images.push(img.image_url);
      });
      modifiedProducts.push({ ...product, colors, detailsByColor });
    });
    return modifiedProducts;
};