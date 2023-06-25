const getCheckoutData = async (sessionId: string) => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/getCheckout`);
    url.searchParams.append("sessionId", sessionId);

    const request = await fetch(url);
    
    if (request.status === 200) {
      const data = await request.json();
      return data;
    }
  } catch (error) {
    return null;
  }
};

export default getCheckoutData;
