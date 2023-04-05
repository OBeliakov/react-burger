export const checkResponse = (res, dispatch = null, obj = null) => {
    if (res.ok) {
        return res.json();
    }

    dispatch && obj && dispatch(obj);

    return Promise.reject(`Ошибка ${res.status}`);
};