//import React from 'react'
import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
//import { BiBuoy } from 'react-icons/bi';
import { HiChartPie, HiInbox, HiOutlineCloudUpload, HiTable, HiUser, } from 'react-icons/hi';
import './SiideBar.css';
import { Link } from 'react-router-dom';
const SiideBar = () => {
  const [alluser, setAlluser] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/all-signin')
      .then(res => res.json())
      .then(data => setAlluser(data))
  }, [])

  return (
    <div>
      <Sidebar aria-label="Sidebar with content separator example" className="custom-sidebar"  >
        <div className="sidebar-content">
          <Sidebar.Items>
            <Sidebar.ItemGroup className=''>
              <Sidebar.Item href="/home" icon={HiChartPie} className="itemStyle">
                Home
              </Sidebar.Item>
              <Sidebar.Item href="/admin/dashboard/upload-Articles" icon={HiOutlineCloudUpload} className="itemStyle">
                Upload Article
              </Sidebar.Item>
              <Sidebar.Item href="/admin/dashboard/manage-Articles" icon={HiInbox} className="itemStyle">
                Manage Articles
              </Sidebar.Item>
              <Sidebar.Item href="/admin/dashboard/upload-promotion-code" icon={HiOutlineCloudUpload} className="itemStyle">
                Upload Promotion
              </Sidebar.Item>
              <Sidebar.Item href="/admin/dashboard/manage-promotion-code" icon={HiInbox} className="itemStyle">
                Manage Promotion
              </Sidebar.Item>
              <Sidebar.Item href="/admin/dashboard/manage-users" icon={HiInbox} className="itemStyle">
                Manage Users
              </Sidebar.Item>
              <Sidebar.Item href="/admin/dashboard/manage-review" icon={HiInbox} className="itemStyle">
                Manage Review
              </Sidebar.Item>
              {
                alluser.map(user => (
                  <Sidebar.Item key={user._id} icon={HiUser} className="itemStyle">
                    <Link to={`/admin/dashboard/change-password/${user._id}`}>Change Password</Link>
                  </Sidebar.Item>
                ))
              }

              <Sidebar.Item href="/admin/signin" icon={HiTable} className="itemStyle">
                Log Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>

          </Sidebar.Items>
        </div>
      </Sidebar>
    </div>
  )
}


export default SiideBar
