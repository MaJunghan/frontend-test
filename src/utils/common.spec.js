import { pick, debounce } from './common';

describe('pick util 단위테스트', () => {
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a')).toEqual({ a: 'A' });
  });

  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a', 'b')).toEqual({ a: 'A', b: { c: 'C' } });
  });

  it('대상 객체로 아무 것도 전달 하지 않을 경우 빈 객체가 반환된다', () => {
    expect(pick()).toEqual({});
  });

  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj)).toEqual({});
  });
});

describe('debounce util 단위테스트', () => {
  // 테스트 코드는 비동기 타이머와 무관하게 동기적으로 실행된다
  // 즉, 비동기 함수가 실행되기 전에 단언이 실행됨.
  // 타이머 모킹 -> 0.3초 딜레이해야 정상적으로 검증가능 -> spy함수 호출 확인

  beforeEach(() => {
    // 타이머 모킹
    vi.useFakeTimers();

    // 시간은 흐르기 때문에 매일 달라짐
    // 시간을 고정하려면 vi.setSystemTime() 사용하여 일관된 환경으로 테스트 가능
    vi.setSystemTime(new Date('2023-12-25'));
  });

  // 타이머 모킹도 초기화 필수
  afterEach(() => {
    vi.useRealTimers();
  });

  it('특정 시간이 지난 후 함수가 호출된다', () => {
    const spy = vi.fn();
    const debounceFn = debounce(spy, 300);

    debounceFn();
    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalled();
  });

  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.', () => {
    const spy = vi.fn();
    const debounceFn = debounce(spy, 300);

    // 최초 호출
    debounceFn();

    // 최초 호출 후 0.2초 후 호출
    vi.advanceTimersByTime(200);
    debounceFn();

    // 두번째 호출 후 0.1초 후 호출
    vi.advanceTimersByTime(100);
    debounceFn();

    // 세번째 호출 후 0.2초 후 호출
    vi.advanceTimersByTime(200);
    debounceFn();

    // 네번째 호출 후 0.3초 후 호출
    vi.advanceTimersByTime(300);
    debounceFn();

    // 마지막 호출만 호출 되었는지 확인
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
