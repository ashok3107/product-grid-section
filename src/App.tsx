import { useEffect, useState } from 'react'
import './App.css'
import { formatProductsWithSkuDetails } from './helpers/DataHelper';

import ProductCard from './components/ProductCard/ProductCard';
import styles from './App.module.scss';

export type ProductTypeForProductCard = {
  product_id: string;
  name: string;
  description: string;
  category: string;
  collection: string;
  created_at: string;
  colors: Array<string>;
  detailsByColor: DetailsByColorType;
};

export type DetailsByColorType = {
  [key: string]: {
    images: Array<string>;
    color: string;
    salePrice: number;
    listPrice: number;
  }
}

function App() {
  const [parsedProducts, setProducts] = useState<Array<ProductTypeForProductCard>>([]);
  useEffect(() => {
    // init mapping call
    const modifiedProducts = formatProductsWithSkuDetails();
    setProducts(modifiedProducts);
  }, []);

  return (
    <div className={styles.content}>
    <h4>Latest Arrivals</h4>
      {parsedProducts.map((product: ProductTypeForProductCard) => (
        <ProductCard key={product.product_id} {...product} />
      ))}
    </div>
  )
}

export default App
