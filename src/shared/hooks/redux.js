import { useDispatch, useSelector } from 'react-redux';

// for JS projects these are thin wrappers; keeps imports consistent
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);
