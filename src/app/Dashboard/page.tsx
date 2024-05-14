"use client"; // This is a client component 👈🏽

import SidebarWithNavbar from '../../components/SidebarWithNewbar';
import Table from './table';

const Dashboard: React.FC = () => {
  return (
    <SidebarWithNavbar>
      <div className="min-h-full">
        <div className="h-screen flex bg-gray-100">
          <Table/>
        </div>
      </div>
    </SidebarWithNavbar>
  );
}
export default Dashboard;