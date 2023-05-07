const deleteItemFromBasket = async (
  basketItemId: string,
  userId: string
): Promise<{ ok: boolean }> => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/deleteItemFromBasket`);

    const response = await fetch(url, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify({ basketItemId, userId }),
    });

    return { ok: true };
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
};

export default deleteItemFromBasket;
