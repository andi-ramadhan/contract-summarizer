import ButtonLink from "../ButtonLink";

export default function Navbar() {
  const ButtonNav = (props) => (
    <ButtonLink classStyle="hover:text-emerald-500 transition ease-in-out text-shadow-xs" {...props} />
  );

  return (
    <nav className="absolute inset-x-0 top-20 h-20 px-6 py-4 flex items-center justify-end backdrop-blur-2xl z-100 max-w-[100em]">
      <div className="flex items-center justify-end gap-6 w-full w-max-6xl mx-auto">
        <ButtonNav link={"/"} text={"Home"} />
        <ButtonNav link={"/saved"} text={"Saved"} />
      </div>
    </nav>
  );
}