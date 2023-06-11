import { currentUser } from "@clerk/nextjs/app-beta";
import getBasketItems from "@/utils/server/getBasketItems";

import HeaderContent from "./HeaderContent";

const Header = async () => {
  const user = await currentUser();

  let orderCount = 0;

  if (user) {
    const basketItems = await getBasketItems(user.id);
    orderCount = basketItems.reduce((acc, v) => acc + v.count, 0);
  }
  return (
    <HeaderContent orderCount={orderCount} userImg={user?.profileImageUrl!} />
  );
};

export default Header;
