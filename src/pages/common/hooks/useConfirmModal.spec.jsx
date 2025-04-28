import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';

it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result: 훅을 호출하여 얻은 결과 값을 반환 -> result.current 값의 참조를 통해 최신 상태를 추적할 수 있다.
  // rerender: 훅을 원하는 인자와 함께 새로 호출하여 상태를 갱신한다. (주로 props의 값이 변경되어 전달하는지 확인하는 용도)
  const { result } = renderHook(useConfirmModal);
  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));
  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result, rerender } = renderHook(useConfirmModal);

  // act : 상호작용 (렌더링,이펙트 등..)을 함게 그룹화하고 실행하여 실제 앱에서 동작하는 것처럼 렌더링과 업데이트를 상태 반영하도록 도와줌.
  // 업데이트 내용을 jsdom에 반영할 때 사용함.
  act(() => {
    result.current.toggleIsModalOpened();
  });

  expect(result.current.isModalOpened).toBe(true);
});
