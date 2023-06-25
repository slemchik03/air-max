const deleteItemFromBasket = async (data: {
  basketItemId: string;
  count: number;
  userId: string;
}): Promise<{ ok: boolean }> => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/deleteItemFromBasket`);

    const response = await fetch(url, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify(data),
    });

    return { ok: true };
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
};

export default deleteItemFromBasket;
