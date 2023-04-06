export const checkResponse = async (res, dispatch = null, obj = null) => {
    if (res.ok) {
        return res.json();
    }

    dispatch && obj && dispatch(obj);
    const error = await res.json();
    return Promise.reject(error);
};
