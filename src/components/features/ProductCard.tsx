import { ProductItem } from '@/types/common';
import { formatCurrency } from '@/utils/helpers';

import Icon from '@/components/common/Icon';
import '@/assets/scss/components/features/product-card.scss';

interface Props {
    productData?: ProductItem
    isLoading?: boolean
};

function ProductCard ({productData, isLoading}: Props) {
    return(
        <>
            {
                !isLoading && productData?
                <div className="product-card-wrap">
                    <img
                        className="product-img"
                        src={productData.imageUrl}
                    />
                    <div className="info-block">
                        <div className="info-content">
                            <div>
                                <p>{productData.title}</p>
                                <p className="product-price">$ {formatCurrency(productData.price)}</p>
                            </div>
                            <span className="cart-icon">
                                <Icon type="cartShopping" />
                            </span>
                        </div>
                    </div>
                </div>
                :
                <div className="product-card-wrap loading">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-white/70">
                        <div className="h-2 w-1/2 rounded-xl bg-gray-300 mb-1.5"></div>
                        <div className="h-2 w-1/5 rounded-xl bg-gray-300"></div>
                    </div>
                </div>
            }
        </>
    )
};
export default ProductCard