import React from "react";
import styled from "styled-components";
import Sidebar from "../presentation/components/layout/SideBar";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;  
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
  return (
    <LayoutContainer>
      {showSidebar && <Sidebar />}
      <MainContent $showSidebar={showSidebar}>{children}</MainContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main<{ $showSidebar?: boolean }>`
  flex-grow: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow-x: hidden; /* prevent horizontal scroll if sidebar collapses */
`;

export default Layout;