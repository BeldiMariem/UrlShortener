// src/components/Sidebar/index.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";

const FiHome = FiIcons.FiHome as React.ComponentType<{ className?: string }>;
const FiUsers = FiIcons.FiUsers as React.ComponentType<{ className?: string }>;
const FiSettings = FiIcons.FiSettings as React.ComponentType<{ className?: string }>;
const FiLogOut = FiIcons.FiLogOut as React.ComponentType<{ className?: string }>;
const FiChevronLeft = FiIcons.FiChevronLeft as React.ComponentType<{ className?: string }>;
const FiChevronRight = FiIcons.FiChevronRight as React.ComponentType<{ className?: string }>;

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <SidebarContainer className={isCollapsed ? "collapsed" : ""}>
      <SidebarHeader>
        {!isCollapsed && <Brand>Shorty</Brand>}
        <ToggleButton onClick={toggleSidebar}>
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </ToggleButton>
      </SidebarHeader>

      <NavMenu>
        <NavItem>
          <NavLink to="/"><FiHome />{!isCollapsed && <span>Home</span>}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users"><FiUsers />{!isCollapsed && <span>Users</span>}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/settings"><FiSettings />{!isCollapsed && <span>Settings</span>}</NavLink>
        </NavItem>
      </NavMenu>

      <SidebarFooter>
        <NavLink to="/logout"><FiLogOut />{!isCollapsed && <span>Logout</span>}</NavLink>
      </SidebarFooter>
    </SidebarContainer>
  );
};

const yellow = "#f8c43d";
const darkBlue = "#1c2541";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${darkBlue};
  color: white;
  transition: width 0.3s ease;
  width: 250px;

  &.collapsed {
    width: 80px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${yellow};
  color: #1c2541;
`;

const Brand = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: bold;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #1c2541;
  font-size: 1.4rem;
  cursor: pointer;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  flex-grow: 1;
`;

const NavItem = styled.li`
  margin: 5px 0;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s ease;

  svg {
    font-size: 1.2rem;
    margin-right: 10px;
  }

  &:hover {
    background-color: ${yellow};
    color: #1c2541;

    svg {
      color: #1c2541;
    }
  }

  .collapsed & {
    justify-content: center;

    svg {
      margin-right: 0;
    }
  }
`;

const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export default Sidebar;
