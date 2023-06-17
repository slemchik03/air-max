import { currentUser } from "@clerk/nextjs/app-beta";
import getBasketItems from "@/utils/server/getBasketItems";

import HeaderContent from "./HeaderContent";
import prisma from "@/utils/prisma";

export interface NavLinkItem {
  href: string;
  text: string;
}

const getNavLinks = async () => {
  try {
    const res = await prisma.category.findMany();
    return res.map((item) => ({
      href: `/shoes?availibleCategories=${item.title}`,
      text: item.title,
    })) as NavLinkItem[];
  } catch (e) {
    console.log(e);

    return [];
  }
};

const Header = async () => {
  const [user, navLinks] = await Promise.all([currentUser(), getNavLinks()]);
  let orderCount = 0;

  if (user) {
    const basketItems = await getBasketItems(user.id);
    orderCount = basketItems.reduce((acc, v) => acc + v.count, 0);
  }
  return (
    <HeaderContent
      navLinks={navLinks}
      orderCount={orderCount}
      userImg={user?.profileImageUrl!}
    />
  );
};

export default Header;
