import FilterBlock from "@/components/ShoesPage/FilterBlock/FilterBlock";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-10 grid-cols-[1fr,4fr] py-[100px] px-10">
      <FilterBlock />
      {children}
    </div>
  );
}
