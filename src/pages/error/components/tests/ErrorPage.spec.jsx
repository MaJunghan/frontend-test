import { screen } from '@testing-library/react';
import React from 'react';

import ErrorPage from '@/pages/error/components/ErrorPage';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  // 실제 모듈을 모킹하여 useNavigate 훅을 spy 함수로 대체하여 반환
  return { ...original, useNavigate: () => navigateFn };
});

it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  const { user } = await render(<ErrorPage />);

  await user.click(screen.getByText('뒤로 이동'));
  expect(navigateFn).toHaveBeenNthCalledWith(1, -1);
});
