import { startLoader, stopLoader } from "../store/slices/loaderSlice";
import { store } from "../store/store";

export const loader = {
    start: () => store.dispatch(startLoader()),
    stop: () => store.dispatch(stopLoader())
}