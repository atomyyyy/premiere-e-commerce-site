import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';
import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import SizeList from '../SizeList';
import ColorList from '../ColorList';
import { uniqueId } from '../../helpers/general';

import * as styles from './QuickView.module.css';

const QuickView = (props) => {
  const {
    data: { activeProduct = {} } = {},
    upsertCartItemById,
    setActiveProduct
  } = useShoppingCartContext();

  const { close } = props;

  const {
    register,
    handleSubmit,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      cartItemId: uniqueId(),
      name: activeProduct?.name,
      productCode: activeProduct?.productCode,
      price: activeProduct?.price,
      image: activeProduct?.image,
      size: null,
      color: activeProduct?.colorOptions ? activeProduct?.colorOptions[0].title : null,
      quantity: 1
    }
  });

  useEffect(() => {
    setValue('cartItemId', uniqueId());
    setValue('name', activeProduct?.name);
    setValue('productCode', activeProduct?.productCode);
    setValue('price', activeProduct?.price);
    setValue('image', activeProduct?.image);
    setValue('size', null);
    setValue('color', activeProduct?.colorOptions ? activeProduct?.colorOptions[0].title : null);
  }, [activeProduct, setValue])

  const onSubmit = (cartItem) => {
    setActiveProduct(null);
    upsertCartItemById(cartItem);
    close();
  }

  if (!activeProduct) {
    return <div></div>
  }

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.titleContainer}>
          <h4>Select Options</h4>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.productContainer}>
          <span className={styles.productName}>{activeProduct?.name}</span>
          <div className={styles.price}>
            <CurrencyFormatter amount={activeProduct?.price}></CurrencyFormatter>
          </div>
          <div className={styles.productImageContainer}>
            <img alt={activeProduct?.alt} src={activeProduct?.image}></img>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeProduct.colorOptions?.length && (
            <div className={styles.sectionContainer}>
              <ColorList
                {...register('color')}
                ref={null}
                options={activeProduct.colorOptions}
                value={watch('color')}
                setActiveColor={(val) => setValue('color', val)}
              />
            </div>
          )}
          {activeProduct.sizeOptions?.length && (
            <div className={styles.sectionContainer}>
              <SizeList
                {...register('size')}
                ref={null}
                setActive={(val) => setValue('size', val)}
                options={activeProduct.sizeOptions}
                value={watch('size')}
              />
            </div>
          )}
          <Button type='submit' fullWidth level={'primary'}>
            加入購物車
          </Button>
        </form>
      </div>
    </div>
  );
  // 



  // const [value, setActiveColor] = useState(
  //   activeProduct?.colorOptions?.length ? activeProduct?.colorOptions[0] : null 
  // );
  // const [activeSize, setActiveSize] = useState(
  //   activeProduct?.sizeOptions?.length ? activeProduct?.sizeOptions[0] : null
  // );

  // useEffect(() => {
  //   setActiveColor(activeProduct?.colorOptions?.length ? activeProduct?.colorOptions[0] : null)
  //   setActiveSize( activeProduct?.sizeOptions?.length ? activeProduct?.sizeOptions[0] : null)
  // }, [activeProduct])

  // const handleAddToBag = () => {
  //   close();
  //   updateCartState({
  //     ...data,
  //     cart: [...cart, {
  //       cartItemId: uniqueId(),
  //       productCode: activeProduct?.productCode,
  //       name: activeProduct?.name,
  //       price: activeProduct?.price,
  //       color: value?.title,
  //       size: activeSize,
  //       description: activeProduct?.description,
  //       image: activeProduct?.image,
  //       category: activeProduct?.category,
  //       quantity: 1
  //     }]
  //   })
  // };

  // if (activeProduct) {
  //   return (

  //   );
  // }


};

export default QuickView;
