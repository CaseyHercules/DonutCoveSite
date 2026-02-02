import { useState, useEffect } from 'preact/hooks';

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', updatePath);
    document.addEventListener('astro:page-load', updatePath);
    
    return () => {
      window.removeEventListener('popstate', updatePath);
      document.removeEventListener('astro:page-load', updatePath);
    };
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    document.body.style.overflowX = '';
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  const handleBackdropClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;
    if (target === currentTarget) {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        .mobile-menu-panel {
          background-color: #ffffff !important;
          background: #ffffff !important;
        }
        .mobile-menu-link {
          opacity: 0;
          transform: translateX(10px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out, background-color 0.2s ease-out;
        }
        .mobile-menu-panel.open .mobile-menu-link {
          opacity: 1;
          transform: translateX(0);
        }
        .mobile-menu-link:hover,
        .mobile-menu-link:active {
          background-color: rgba(255, 69, 0, 0.08);
          border-radius: 0.5rem;
        }
        .mobile-menu-link.active {
          background-color: rgba(255, 69, 0, 0.12);
          border-radius: 0.5rem;
        }
      `}</style>
      <div class="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        class="p-3 -mr-2 text-slate-900 relative z-50 touch-manipulation active:opacity-70 transition-opacity"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        type="button"
        style={{
          minWidth: '44px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div
          class="w-6 h-5 flex items-center justify-center pointer-events-none relative"
          aria-hidden="true"
        >
          <span
            class={`absolute w-full h-0.5 bg-current transition-all duration-300 ${
              isOpen ? 'rotate-45' : '-translate-y-2 rotate-0'
            }`}
          />
          <span
            class={`w-full h-0.5 bg-current transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            class={`absolute w-full h-0.5 bg-current transition-all duration-300 ${
              isOpen ? '-rotate-45' : 'translate-y-2 rotate-0'
            }`}
          />
        </div>
      </button>

      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        class={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          top: '80px',
          zIndex: 40
        }}
      />

      {/* Menu Panel */}
      <div
        class={`mobile-menu-panel shadow-2xl flex flex-col transition-all duration-300 ease-out rounded-2xl ${
          isOpen ? 'translate-x-0 opacity-100 visible open' : 'translate-x-full opacity-0 invisible pointer-events-none'
        }`}
        style={{ 
          position: 'fixed',
          top: '80px',
          right: isOpen ? '16px' : '-240px',
          width: '220px',
          height: 'auto',
          maxHeight: 'calc(100vh - 100px)',
          backgroundColor: '#ffffff',
          zIndex: 9999,
          backgroundImage: 'none',
          overflowY: 'auto'
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Menu Navigation */}
        <nav
          class="flex flex-col gap-4 px-5 pb-5 pt-4 text-right"
          style={{
            backgroundColor: 'transparent'
          }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {menuLinks.map((link, index) => {
            const isActive = currentPath === link.href;
            const isContact = link.href === '/contact';
            
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                class={`mobile-menu-link text-lg font-display font-semibold py-2 px-3 -mx-3 relative ${
                  isContact
                    ? 'text-coral-vibrant'
                    : isActive
                    ? 'text-coral-vibrant'
                    : 'text-slate-900 hover:text-coral-vibrant'
                } ${isActive ? 'active' : ''}`}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {link.label}
                {isContact && (
                  <span class="absolute bottom-0 right-3 w-[calc(100%-1.5rem)] h-0.5 bg-coral-vibrant"></span>
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
    </>
  );
}
