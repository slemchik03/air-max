const deleteAllItemsFromBasket = async (basketId: string, userId: string) => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/clearBasket`);

    const response = await fetch(url, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify({ basketId, userId }),
    });
    const data = await response.json();
    return data?.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default deleteAllItemsFromBasket;
