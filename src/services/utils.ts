export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }

  const error = await res.json();
  return Promise.reject(error);
};
