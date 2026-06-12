import React, { useState } from "react";
import { Sparkles, MessageSquare, ShieldCheck, ClipboardList, BookOpen, Layers, GraduationCap, Menu, X } from "lucide-react";
import logoImg from "../assets/images/logo.jpg";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openBookingModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: "home", label: "Trang chủ", icon: BookOpen },
    { id: "services", label: "Dịch vụ & Bảng giá", icon: Layers },
    { id: "workflow", label: "Quy trình", icon: ClipboardList },
    { id: "courses", label: "Khóa học", icon: GraduationCap, externalUrl: "https://khoahoccongnghe2-marisslide.vercel.app/" },
    { id: "advisor", label: "Trợ lý AI Tư vấn", icon: MessageSquare },
  ];

  return (
    <nav id="mario-navbar" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTab("home"); setIsOpen(false); }}>
            <img
              src={logoImg}
              alt="Maris Slide Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-md border border-gray-100"
              onError={(e) => {
                // Fallback in case logo fails to load (show letter M)
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = parent.querySelector('.logo-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }
              }}
            />
            <div className="logo-fallback hidden w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white font-bold shadow-md shadow-rose-200">
              <span className="text-xl tracking-tight">M</span>
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
                Maris Slide
              </span>
              <p className="text-[9px] font-semibold text-gray-400 tracking-wider uppercase">Tiên phong công nghệ giáo dục</p>
            </div>
          </div>

          {/* Nav Destinations (Desktop) */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              const linkClasses = `flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-rose-50 text-rose-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-rose-500"
              }`;
              if ('externalUrl' in item && item.externalUrl) {
                return (
                  <a
                    key={item.id}
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                );
              }
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={linkClasses}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Call Button & Burger Toggle */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              id="cta-booking-btn"
              onClick={openBookingModal}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Đặt Thiết Kế</span>
            </button>

            {/* Burger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-rose-500 hover:bg-rose-50 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white/95 px-4 py-3 space-y-1 shadow-inner animate-fade-in">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            const linkClasses = `flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-rose-50 text-rose-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-rose-500"
            }`;
            if ('externalUrl' in item && item.externalUrl) {
              return (
                <a
                  key={item.id}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComp className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              );
            }
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={linkClasses}
              >
                <IconComp className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
