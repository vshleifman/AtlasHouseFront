import '@testing-library/jest-dom/extend-expect';

jest.spyOn(window, 'XMLHttpRequest').mockReturnValue(({
  open: jest.fn(),
  send: jest.fn(),
} as unknown) as XMLHttpRequest);
