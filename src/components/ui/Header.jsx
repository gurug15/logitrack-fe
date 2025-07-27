import Logo from './Logo';
import Button from './Button';

const Header = () => {
  const navItems = [
    { label: "Solutions", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Resources", href: "#" }
  ];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f1f5] px-10 py-3">
      <div className="flex items-center gap-4 text-[#111318]">
        <Logo />
        <h2 className="text-[#111318] text-lg font-bold leading-tight tracking-[-0.015em]">
          LogiTRACK
        </h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          {navItems.map((item, index) => (
            <a 
              key={index}
              className="text-[#111318] text-sm font-medium leading-normal" 
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="flex gap-2">
          <Button variant="primary">Request a demo</Button>
          <Button variant="secondary">Sign up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;