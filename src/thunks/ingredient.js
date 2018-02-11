import {getAllIngredients, getAllIngredientsSuccess, getAllIngredientsFailure} from '../actions/ingredient'
export function getAllIngredientsThunk() {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => new Promise((resolve, reject) => {
        const state = getState();
        if (state.getIn(['ingredient','ingredients']).size === 0) {
            dispatch(getAllIngredients());
            const headers = new Headers();
            headers.append('content-type', 'application/json');
            fetch(("http://54.36.189.177:8080/api/ingredients"), {
                headers,
                method: 'GET',
            })
                .then((response) => {
                    if (response.ok) {
                        response.json().then(data => {
                            dispatch(getAllIngredientsSuccess(data));
                        });
                    } else {
                        dispatch(getAllIngredientsFailure());
                        reject(new Error("Bad response from server", response.status));
                    }
                })
                .catch(error => {
                    dispatch(getAllIngredientsFailure());
                    console.error(error);
                    reject(error);
                })
        }

    });
}
