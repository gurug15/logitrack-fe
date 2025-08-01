import { Link } from "react-router-dom";

export const Breadcrumb = ({ items }) => (
  <div className="flex flex-wrap gap-2 p-4">
    {items.map((item, index) => (
      <span key={index}>
        {item.link ? (
          <Link to={item.link} className="text-[#687282] text-base font-medium leading-normal">
            {item.label}
          </Link>
        ) : (
          <span className="text-[#121417] text-base font-medium leading-normal">
            {item.label}
          </span>
        )}
        {index < items.length - 1 && (
          <span className="text-[#687282] text-base font-medium leading-normal ml-2">/</span>
        )}
      </span>
    ))}
  </div>
);

