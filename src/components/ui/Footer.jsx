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
          <p className="text-[#606e8a] text-base font-normal leading-normal">
            © 2024 LogiTRACK. All rights reserved.
          </p>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;