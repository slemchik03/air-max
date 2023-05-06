import prisma from "@/utils/prisma";
import NavBar from "../NavBar/NavBar";
import { currentUser } from "@clerk/nextjs/app-beta";
import getBasketItems from "@/utils/server/getBasketItems";

const Header = async () => {
  const user = await currentUser();
  let orderCount = 0;

  if (user) {
    const basketItems = await getBasketItems(user.id);
    orderCount = basketItems.reduce((acc, v) => acc + v.count, 0);
  }

  return (
    <div className="sticky top-0 left-0 bg-white px-[15px] md:px-[35px] xl:px-[85px] py-[30px] grid grid-cols-[0px 1fr 90px] grid-flow-col shadow-2xl z-[10001]">
      <div className="hidden xl:block"></div>
      <NavBar orderCountServer={orderCount} />
    </div>
  );
};

export default Header;
