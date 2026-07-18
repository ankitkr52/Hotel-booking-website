import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, UserButton } from '@clerk/clerk-react';
import { useAppContext } from '../context/AppContext';

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
);

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openSignIn } = useClerk();
    const location = useLocation();
    const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

    useEffect(() => {
        // ✅ Non-home pages always scrolled style
        if (location.pathname !== '/') {
            setIsScrolled(true);
        } else {
            setIsScrolled(window.scrollY > 10);
        }

        const handleScroll = () => {
            if (location.pathname === '/') {
                setIsScrolled(window.scrollY > 10);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    // ✅ Menu band karo jab bhi route change ho
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 
            ${isScrolled 
                ? "bg-white/95 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" 
                : "py-4 md:py-6 text-white"
            }`}
        >
            {/* Logo */}
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src={assets.luxebookIcon} alt="logo" className="h-10" />
            </Link>

            {/* ✅ Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path && link.path !== '/'
                    return (
                        <Link
                            key={i}
                            to={link.path}
                            className={`group flex flex-col gap-0.5 transition-colors duration-200
                                ${isScrolled 
                                    ? 'text-gray-700 hover:text-orange-500' 
                                    : 'text-white hover:text-orange-300'
                                }
                                ${isActive ? 'text-orange-500 font-medium' : ''}
                            `}
                        >
                            {link.name}
                            {/* ✅ Underline animation */}
                            <div className={`h-0.5 transition-all duration-300
                                ${isActive 
                                    ? 'w-full bg-orange-500' 
                                    : `w-0 group-hover:w-full ${isScrolled ? 'bg-orange-500' : 'bg-orange-300'}`
                                }`} 
                            />
                        </Link>
                    )
                })}
            </div>

            {/* ✅ Desktop Right Side — Search removed */}
            <div className="hidden md:flex items-center gap-4">
                {user ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="My Bookings"
                                labelIcon={<BookIcon />}
                                onClick={() => navigate('/my-bookings')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button
                        onClick={openSignIn}
                        className="bg-black text-white px-8 py-2.5 rounded-full hover:bg-orange-500 transition-all duration-300"
                    >
                        Login
                    </button>
                )}

                {user && (
                    <button
                        className={`border px-4 py-1.5 text-sm font-light rounded-full cursor-pointer transition-all duration-300
                            ${isScrolled 
                                ? 'border-gray-400 text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500' 
                                : 'border-white text-white hover:bg-white hover:text-gray-800'
                            }`}
                        onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}
                    >
                        {isOwner ? 'Dashboard' : 'List your hotel'}
                    </button>
                )}
            </div>

            {/* ✅ Mobile Top Bar */}
            <div className="flex items-center gap-3 md:hidden">
                {user && (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="My Bookings"
                                labelIcon={<BookIcon />}
                                onClick={() => navigate('/my-bookings')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                )}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex flex-col gap-1.5 p-1"
                    aria-label="Toggle menu"
                >
                    {/* ✅ Animated Hamburger Icon */}
                    <span className={`block h-0.5 w-6 transition-all duration-300 
                        ${isScrolled ? 'bg-gray-700' : 'bg-white'}
                        ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} 
                    />
                    <span className={`block h-0.5 w-6 transition-all duration-300
                        ${isScrolled ? 'bg-gray-700' : 'bg-white'}
                        ${isMenuOpen ? 'opacity-0' : ''}`} 
                    />
                    <span className={`block h-0.5 w-6 transition-all duration-300
                        ${isScrolled ? 'bg-gray-700' : 'bg-white'}
                        ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} 
                    />
                </button>
            </div>

            {/* ✅ Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-800 flex flex-col md:hidden items-center justify-center gap-8 font-medium text-xl transition-all duration-500 z-40
                ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
                {/* Close Button */}
                <button
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <img src={assets.closeIcon} alt="close" className="h-6" />
                </button>

                {/* Logo in Mobile Menu */}
                <img src={assets.luxebookIcon} alt="logo" className="h-10 mb-4" />

                {/* ✅ Mobile Nav Links */}
                {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path && link.path !== '/'
                    return (
                        <Link
                            key={i}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`hover:text-orange-500 transition-colors duration-200 relative group
                                ${isActive ? 'text-orange-500 font-semibold' : 'text-gray-700'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300
                                ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                            />
                        </Link>
                    )
                })}

                {/* ✅ Mobile Dashboard/List Hotel Button */}
                {user && (
                    <button
                        className="border border-gray-300 px-8 py-3 text-base rounded-full hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                        onClick={() => {
                            setIsMenuOpen(false);
                            isOwner ? navigate('/owner') : setShowHotelReg(true);
                        }}
                    >
                        {isOwner ? 'Dashboard' : 'List your hotel'}
                    </button>
                )}

                {/* ✅ Mobile Login Button */}
                {!user && (
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            openSignIn();
                        }}
                        className="bg-black text-white px-12 py-3 rounded-full hover:bg-orange-500 transition-all duration-300"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;