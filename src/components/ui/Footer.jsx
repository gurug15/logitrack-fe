const Footer = () => {
  const footerLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact Us", href: "#" }
  ];

  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            {footerLinks.map((link, index) => (
              <a 
                key={index}
                className="text-[#606e8a] text-base font-normal leading-normal min-w-40" 
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" fill="#1b5ff3" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="#eaf1ff"/>
                <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#1b5ff3" fontWeight="bold">©</text>
              </svg>
              <span className="text-[#1b5ff3] font-semibold text-lg tracking-wide">2024 LogiTRACK</span>
            </div>
            <span className="text-[#606e8a] text-sm font-normal">All rights reserved.</span>
          </div>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;