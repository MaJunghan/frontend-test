import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { TOAST_ID } from '@/constants';
import ProductCard from '@/pages/home/components/ProductCard';
import useProducts from '@/pages/home/hooks/useProducts';
import { useCartStore } from '@/store/cart';
import { useFilterStore } from '@/store/filter';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

const PRODUCT_PAGE_LIMIT = 20;

// productList 기준으로 통합 테스트 코드를 작성한다면
// 1. 상품 리스트 조회 API에 맞게 상품 정보(상품명, 가격, 상품 이미지)가 잘 렌더링 되는지
// 2. 상품을 클릭 했을 때 navigate 모킹을 통해 상세화면으로 이동하는지
// 3. 장바구니, 구매 버튼을 눌렀을 때
//  - 로그인 : 상품 추가 후 장바구니로 이동
//  - 비로그인 : 로그인 페이지로 이동
// 4. 상품 리스트가 더 있는 경우 show more 버튼이 노출되며, 이를 통해 데이터를 더 가져 올 수 있는지

const ProductList = ({ limit = PRODUCT_PAGE_LIMIT }) => {
  const navigate = useNavigate();
  const filter = useFilterStore(state =>
    pick(state, 'categoryId', 'title', 'minPrice', 'maxPrice'),
  );
  const { user, isLogin } = useUserStore(state =>
    pick(state, 'user', 'isLogin'),
  );
  const { addCartItem } = useCartStore(state => pick(state, 'addCartItem'));

  const { data, ...productsMethods } = useProducts({
    limit,
    params: filter,
  });

  const products =
    data?.pages.reduce((acc, cur) => [...acc, ...cur.products], []) ?? [];
  const { fetchNextPage, isFetchingNextPage, hasNextPage } = productsMethods;

  const handleClickCart = (ev, product) => {
    ev.stopPropagation();
    if (isLogin) {
      addCartItem(product, user.id, 1);
      toast.success(`${product.title} 장바구니 추가 완료!`, { id: TOAST_ID });
    } else {
      navigate(pageRoutes.login);
    }
  };
  const handleClickPurchase = (ev, product) => {
    ev.stopPropagation();
    if (isLogin) {
      addCartItem(product, user.id, 1);
      navigate(pageRoutes.cart);
    } else {
      navigate(pageRoutes.login);
    }
  };

  return (
    <Grid container spacing={1} rowSpacing={1} justifyContent="center">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}_${index}`}
          product={product}
          onClickAddCartButton={handleClickCart}
          onClickPurchaseButton={handleClickPurchase}
        />
      ))}
      {hasNextPage && (
        <Grid item>
          <Button
            variant="contained"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          >
            Show more
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductList;
