import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { pathToUrl } from '@/helpers/url';
import { formatPrice } from '@/utils/formatter';

// productCard 기준으로 단위 테스트 코드를 작성한다면
// 1. productProp 기준으로 상품 정보(상품명, 가격, 상품 이미지)가 잘 렌더링 되는지
// 2. 상품을 클릭 했을 때 navigate 모킹을 통해 상세화면으로 이동하는지
// 3. 장바구니, 구매 버튼을 눌렀을 때 spy 함수를 통해 각 핸들러가 호출되는지

// 스파이 함수에서 onClick 함수의 호출 여부만 검증 -> 사용자가 productCard를 눌렀을때에 동작을 검증 불가
// API에서 주는 데이터 기준으로 올바르게 렌더링 되는지도 검증 불가

const ProductCard = ({
  product,
  onClickAddCartButton,
  onClickPurchaseButton,
}) => {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const { title, images, price, category, id } = product;

  const handleClickItem = () => {
    navigate(pathToUrl(pageRoutes.productDetail, { productId: id }));
  };
  const handleClickAddCartButton = ev => {
    onClickAddCartButton(ev, product);
  };
  const handleClickPurchaseButton = ev => {
    onClickPurchaseButton(ev, product);
  };

  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={3}
      onClick={handleClickItem}
      data-testid="product-card"
    >
      <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>
        <CardMedia component="img" height="140" image={images?.[0]} />
        <CardContent>
          <Chip
            label={category.name}
            size="small"
            color="success"
            variant="outlined"
            style={{ borderRadius: '10px' }}
          />
          <Typography
            gutterBottom
            component="h4"
            sx={{
              height: 50,
              fontWeight: 'bold',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(price)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClickAddCartButton}>
            장바구니
          </Button>
          <Button size="small" onClick={handleClickPurchaseButton}>
            구매
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
