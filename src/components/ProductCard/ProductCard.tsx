import { useCallback, useEffect, useState } from 'react';
import styles from './ProductCard.module.scss';
import { ProductTypeForProductCard } from '../../App';


const ProductCard = (props: ProductTypeForProductCard) => {
  const {
    name: productName, colors, detailsByColor,
  } = props;
  const [currColorIndex, setCurrColorIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [selectedColorDetails, setSelectedColorDetails] = useState(detailsByColor[colors[0]]);
  // const [currentImage, setCurrentImage] = useState(selectedColorDetails.images[0]);
  const { salePrice, listPrice, images } = selectedColorDetails;
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [displayImgButtons, setDisplayImgButtons] = useState(false);

  useEffect(() => {
    setSelectedColorDetails(detailsByColor[colors[currColorIndex]]);
    setCurrImageIndex(0);
  }, [currColorIndex]);

  useEffect(() => {
    setIsImageLoading(true);
  }, [currImageIndex])

  const onProductImageOver = useCallback(() => {
    setDisplayImgButtons(true);
  }, []);

  const onProductImageMouseOut = useCallback(() => {
    setDisplayImgButtons(false);
  }, []);

  return (
    <div className={styles.productCard}>
      <div onMouseOver={onProductImageOver} onMouseOut={onProductImageMouseOut} className={`${styles.productImg} ${displayImgButtons && !isImageLoading ? styles.showImgBtns : ''}`}>
        {images.length > 1 && <button onClick={() => setCurrImageIndex(currImageIndex - 1)} disabled={currImageIndex === 0}>{'<'}</button>}
        <img onLoad={() => setIsImageLoading(false)} src={images[currImageIndex]} alt={productName} />
        {images.length > 1 && <button className={styles.nextBtn} onClick={() => setCurrImageIndex(currImageIndex + 1)} disabled={currImageIndex === images.length - 1}>{'>'}</button>}
        {isImageLoading && <span className={styles.loading}>Loading...</span>}
      </div>
      <span className={styles.selectedColor}>{selectedColorDetails.color}</span>
      <h4>{productName}</h4>
      <div className={styles.price}>
        <span>${salePrice}</span>
        {listPrice !== salePrice && <span>${listPrice}</span>}
      </div>
      <div className={styles.availableColors}>
        {colors.map((color, index) => (
          <span key={color} onClick={() => setCurrColorIndex(index)} className={currColorIndex === index ? styles.activeColor : ''} style={{ backgroundColor: color }}></span>
        ))}
      </div>
    </div>
  )
};

export  default ProductCard;