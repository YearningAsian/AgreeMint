// src/components/Header.tsx
export default function Header() {
  return (
    <div data-layer="Header" className="Header w-[2242px] h-64 relative bg-white">
      <img
        data-layer="AgreeMint Logo"
        className="AgreemintLogo w-[711px] h-52 left-[94px] top-[16px] absolute"
        src="https://placehold.co/711x214"
        alt="AgreeMint Logo"
      />
      <div
        data-layer="Line 2"
        className="Line2 w-[2242px] h-0 left-0 top-[256px] absolute shadow-[0px_10px_20px_0px_rgba(0,0,0,0.25)] outline outline-[3px] outline-offset-[-1.50px] outline-black"
      ></div>
    </div>
  );
}
