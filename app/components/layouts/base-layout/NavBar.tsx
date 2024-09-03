import { Bell, CircleUserRound } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="navbar">
      <h1>RCP IMS</h1>
      <nav className="nav-btns">
        <a href="#">
          <Bell className="nav-icon" />
        </a>
        <a href="#">
          <CircleUserRound className="nav-icon" />
        </a>
      </nav>
    </header>
  );
};
