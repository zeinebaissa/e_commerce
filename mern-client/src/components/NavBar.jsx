//import React from 'react'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { RiWomenLine } from "react-icons/ri";


import './navbar.css'


function NavBar() {
    const [isSticky,setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    const navItems = [
        { link: "Home", path: "/home" },
        { link: "Shop", path: "/shop" },
        { link: "Basket", path: "/basket"},
        { link: "About us", path: "/about" },
        { link: "Login", path: "/signin" },
    ];
    return (
        <header className="w-full bg-transparent fixed top-0 left-0 right 0 transition-all ease-in duration-300 navbar">
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-gray-200": ""}`}>
                <div className="flex justify-between items-center text-base gap-8">
                    {/* logo */}
                    <Link to="/home" className='text-2xl font-bold text-pink-700 flex items-center gap-2'>
      <RiWomenLine className='inline-block text-3xl' />
      FOR HER
    </Link>

                    <ul className="md:flex space-x-12 hidden">
                        {navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-black font-bold uppercase cursor-pointer hover:text-pink-600'>{link}</Link>)}
                    </ul>

                </div>
            </nav>
        </header>
    );
}

export default NavBar
