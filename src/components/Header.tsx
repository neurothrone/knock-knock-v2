
import { HandHeart, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

const Header = ({ showBackButton = false, title }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card shadow-lg shadow-orange-100/20 dark:shadow-orange-950/20 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-muted/30 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
            )}
            <div className="bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] p-3 rounded-2xl">
              {showBackButton ? (
                <HandHeart className="w-6 h-6 text-white" />
              ) : (
                <span className="text-white text-xl font-bold">🏠</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {title || 'Knock Knock'}
              </h1>
              {!title && (
                <p className="text-sm text-muted-foreground">Your neighborhood expertise network</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate('/')}
                className={`transition-colors font-medium ${
                  isActive('/') 
                    ? 'text-[hsl(var(--coral))]' 
                    : 'text-muted-foreground hover:text-[hsl(var(--coral))]'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/community')}
                className={`transition-colors ${
                  isActive('/community') 
                    ? 'text-[hsl(var(--coral))] font-medium' 
                    : 'text-muted-foreground hover:text-[hsl(var(--coral))]'
                }`}
              >
                Community
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className={`transition-colors ${
                  isActive('/profile') 
                    ? 'text-[hsl(var(--coral))] font-medium' 
                    : 'text-muted-foreground hover:text-[hsl(var(--coral))]'
                }`}
              >
                Profile
              </button>
              <button 
                onClick={() => navigate('/messages')}
                className={`transition-colors ${
                  isActive('/messages') 
                    ? 'text-[hsl(var(--coral))] font-medium' 
                    : 'text-muted-foreground hover:text-[hsl(var(--coral))]'
                }`}
              >
                Messages
              </button>
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
