import {Map} from "immutable";
import {GO_TO_INIT_PAGE, GO_TO_MAIN_PAGE} from "../actions/route";

export const initialState = () => {
    return Map({
      route : null
    });
};

export default (state = initialState(), action) => {
    switch (action.type) {
        case GO_TO_INIT_PAGE:

            return state.set('route', 'INIT');
        case GO_TO_MAIN_PAGE:

            return state.set('route', 'MAIN');
    }

    return state;
}
