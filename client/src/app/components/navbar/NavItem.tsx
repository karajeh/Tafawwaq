import Link from "next/link";

interface NavItemProps {
  label: string;
  link: string;
  toggleMenu?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, link, toggleMenu }) => {
  const handleClick = () => {
    if (toggleMenu) {
      toggleMenu();
    }
  };
  return (
    <Link
      href={link}
      className={`text-gray-500 hover:text-primary py-2 rounded-md text-sm md:text-base lg:text-md font-medium font-primary whitespace-nowrap`}
      onClick={handleClick}
    >
      {label}
    </Link>
  );
};

export default NavItem;
