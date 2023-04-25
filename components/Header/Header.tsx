import NavBar from "../NavBar/NavBar";

const Header = () => {
  return (
    <div className="px-[15px] md:px-[35px] xl:px-[85px] py-[30px] grid grid-cols-[0px 1fr 90px] grid-flow-col">
      <div className="hidden xl:block"></div>
      <NavBar />
    </div>
  );
};

export default Header;
