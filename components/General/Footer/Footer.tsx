import LinkBtn from "../../UI/Button/LinkBtn";

const routes = [
  { title: "Features", links: ["About", "Careers", "Mobile"] },
  { title: "Features", links: ["About", "Careers", "Mobile"] },
  { title: "Features", links: ["About", "Careers", "Mobile"] },
];

const Footer = () => {
  return (
    <div className="grid grid-flow-row justify-center text-center md:text-left md:grid-flow-col md:justify-end gap-10 px-5 xl:px-[100px] text-[#DE343D] bg-[#F9F9F9] py-[100px]">
      {routes.map(({ title, links }, idx) => (
        <div key={idx} className="grid gap-8">
          <p className="font-monumentBold text-xl font-bold">{title}</p>
          <div className="grid text-[18px] gap-4">
            {links.map((text) => (
              <LinkBtn key={text} type="orange" text={text} href="#" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Footer;
