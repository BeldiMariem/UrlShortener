import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as FiIcons from "react-icons/fi";
import { logout } from "../../../infrastructure/services/authService";
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
const isAdmin = user?.role === "admin";
const handleLogout = async () => {
  try {
    await logout();
  } catch (err) {
    console.error("Logout failed", err);
  }
};
type IconComponent = React.ComponentType<{ className?: string; size?: number }>;
type ColorMode = "light" | "dark";

interface NavItem {
  to: string;
  label: string;
  icon: IconComponent;
}

interface Theme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  activeText: string;
  menuHover: string;
}

const {
  FiSettings,
  FiHome,
  FiUsers,
  FiLink,
  FiSearch,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} = FiIcons as Record<string, IconComponent>;

const NAV_ITEMS: NavItem[] = [
  { to: "/home", label: "Home", icon: FiHome },
  { to: "/profile", label: "Profile", icon: FiSettings },
  { to: "/users", label: "Users", icon: FiUsers },
  { to: "/myUrls", label: "My URLs", icon: FiLink },
  { to: "/search", label: "Search", icon: FiSearch },
];

const themes: Record<ColorMode, Theme> = {
  light: {
    primary: "#FFA000",
    primaryLight: "#FFECB3",
    primaryDark: "#FF8F00",
    background: "#FFFDF7",
    text: "#2D3748",
    textSecondary: "#4A5568",
    border: "#E2E8F0",
    activeText: "#1A202C",
    menuHover: "#FFF3E0",
  },
  dark: {
    primary: "#FFC107",
    primaryLight: "#FFECB3",
    primaryDark: "#FFA000",
    background: "#1F2937",
    text: "#F3F4F6",
    textSecondary: "#9CA3AF",
    border: "#374151",
    activeText: "black",
    menuHover: "#4B5563",
  },
};

interface SidebarProps {
  mode?: ColorMode;
}

const Sidebar: React.FC<SidebarProps> = ({ mode = "dark" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const theme = themes[mode];

  const toggleCollapse = () => setCollapsed(c => !c);
  const LogoutButton = styled.button<{ $collapsed: boolean; $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${({ $collapsed }) => ($collapsed ? "0" : "0.75rem")};
  padding: ${({ $collapsed }) => ($collapsed ? "0.75rem" : "0.75rem 1rem")};
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $theme }) => $theme.text};
  font-size: 0.95rem;
  border-radius: 8px;
  font-weight: 500;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ $theme }) => $theme.menuHover};
    color: ${({ $theme }) => $theme.primaryDark};

    ${IconWrapper} {
      background: ${({ $theme }) => $theme.primaryLight};
      color: ${({ $theme }) => $theme.primaryDark};
    }
  }
`;
  return (
    <Container collapsed={collapsed} $theme={theme}>
      <Header $theme={theme}>
        {!collapsed ? (
          <BrandContainer>
            <Brand $theme={theme}>Shorty</Brand>
            <LinkIcon $theme={theme}>
              <FiLink size={16} />
            </LinkIcon>
          </BrandContainer>
        ) : null}
        <ToggleButton onClick={toggleCollapse} aria-label="Toggle sidebar" $theme={theme}>
          {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </ToggleButton>
      </Header>

      <NavMenu>
  {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
    console.log(user?.role)
    if (label === "Users" && !isAdmin) return null; 

    return (
      <NavItem key={to}>
        <NavLinkStyled
          to={to}
          $active={pathname === to}
          $collapsed={collapsed}
          $theme={theme}
        >
          <IconWrapper $active={pathname === to} $theme={theme}>
            <Icon size={18} />
          </IconWrapper>
          {!collapsed && (
            <>
              <Label>{label}</Label>
              {pathname === to && <ActiveIndicator $theme={theme} />}
            </>
          )}
        </NavLinkStyled>
      </NavItem>
    );
  })}
</NavMenu>

      <Footer $theme={theme}>
      <Link to="/">

        <LogoutButton
          onClick={handleLogout}
          $collapsed={collapsed}
          $theme={theme}
        >
          <IconWrapper $active={false} $theme={theme}>
            <FiLogOut size={18} />
          </IconWrapper>
          {!collapsed && <Label>Logout</Label>}
        </LogoutButton>
        </Link>
      </Footer>
    </Container>
  );
};

export default Sidebar;

const Container = styled.aside<{ collapsed: boolean; $theme: Theme }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: ${({ collapsed }) => (collapsed ? "80px" : "260px")};
  background: ${({ $theme }) => $theme.background};
  color: ${({ $theme }) => $theme.text};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid ${({ $theme }) => $theme.border};
  position: sticky;
  top: 0;
  box-shadow: ${({ $theme }) =>
    $theme.background === themes.dark.background
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"};
`;

const Header = styled.header<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid ${({ $theme }) => $theme.border};
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Brand = styled.h3<{ $theme: Theme }>`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ $theme }) => $theme.primaryDark};
  letter-spacing: -0.5px;
`;

const LinkIcon = styled.span<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $theme }) => $theme.primary};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    color: ${({ $theme }) => $theme.primaryDark};
  }
`;

const ToggleButton = styled.button<{ $theme: Theme }>`
  background: none;
  border: none;
  color: ${({ $theme }) => $theme.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ $theme }) => $theme.primaryLight};
    color: ${({ $theme }) => $theme.primaryDark};
    transform: scale(1.1);
  }
`;

const NavMenu = styled.ul`
  flex: 1;
  margin: 1rem 0;
  padding: 0 0.75rem;
  list-style: none;
  overflow-y: auto;
`;

const NavItem = styled.li`
  margin: 0.25rem 0;
`;

const IconWrapper = styled.span<{ $active: boolean; $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${({ $active, $theme }) => $active ? $theme.primary : 'transparent'};
  color: ${({ $active, $theme }) => $active ? $theme.activeText : $theme.textSecondary};
  transition: all 0.2s ease;
`;

const NavLinkStyled = styled(NavLink) <{
  $active: boolean;
  $collapsed: boolean;
  $theme: Theme;
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ $collapsed }) => $collapsed ? '0' : '0.75rem'};
  padding: ${({ $collapsed }) => $collapsed ? '0.75rem' : '0.75rem 1rem'};
  color: ${({ $active, $theme }) => $active ? $theme.activeText : $theme.text};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  border-radius: 8px;
  transition: all 0.2s ease;
  justify-content: ${({ $collapsed }) => $collapsed ? 'center' : 'flex-start'};
  background: ${({ $active, $theme }) => $active ? $theme.primaryLight : 'transparent'};

  &:hover {
    background: ${({ $theme }) => $theme.menuHover};
    color: ${({ $theme }) => $theme.primaryDark};
    
    ${IconWrapper} {
      background: ${({ $active, $theme }) => $active ? $theme.primary : $theme.primaryLight};
      color: ${({ $active, $theme }) => $active ? $theme.activeText : $theme.primaryDark};
    }
  }
`;

const Label = styled.span`
  white-space: nowrap;
  transition: opacity 0.2s ease;
`;

const ActiveIndicator = styled.span<{ $theme: Theme }>`
  position: absolute;
  right: 1rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $theme }) => $theme.primary};
`;

const Footer = styled.footer<{ $theme: Theme }>`
  padding: 1rem;
  border-top: 1px solid ${({ $theme }) => $theme.border};
`;