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

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
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
          class={`w-6 h-5 flex flex-col justify-between pointer-events-none transition-all duration-300 ${
            isOpen ? 'open' : ''
          }`}
          aria-hidden="true"
        >
          <span
            class={`w-full h-0.5 bg-current transition-all duration-300 origin-left ${
              isOpen ? 'translate-y-[9px] rotate-45' : ''
            }`}
          />
          <span
            class={`w-full h-0.5 bg-current transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            class={`w-full h-0.5 bg-current transition-all duration-300 origin-left ${
              isOpen ? '-translate-y-[9px] -rotate-45' : ''
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
        class={`fixed top-0 right-0 w-[300px] h-full shadow-2xl flex flex-col transition-transform duration-300 ease-out rounded-tl-3xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          backgroundColor: '#ffffff !important',
          background: '#ffffff !important',
          zIndex: 60,
          position: 'fixed',
          top: '0',
          right: '0',
          width: '300px',
          height: '100%',
          backgroundImage: 'none',
          opacity: '1'
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Close Button */}
        <div class="flex justify-end p-6 pb-4 border-b border-coral/10">
          <button
            onClick={closeMenu}
            class="p-2 text-slate-900 hover:text-coral-vibrant transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Navigation */}
        <nav
          class="flex flex-col gap-8 px-8 pb-8 pt-4 flex-grow text-right"
          style={{
            backgroundColor: 'transparent'
          }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {menuLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              class={`text-xl font-display font-semibold py-2 transition-all duration-200 ${
                link.href === '/contact'
                  ? 'text-coral-vibrant border-r-4 border-coral-vibrant pr-6 mt-4 hover:pr-8'
                  : 'text-slate-900 hover:text-coral-vibrant hover:pr-2'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
