
import { Users, Heart, BookOpen, HandHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { mockStats, mockUsers } from '../data/mockData';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-lg shadow-orange-100/20 dark:shadow-orange-950/20 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] p-3 rounded-2xl">
                <span className="text-white text-xl font-bold">🏠</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Knock Knock</h1>
                <p className="text-sm text-muted-foreground">Your neighborhood expertise network</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => navigate('/')}
                  className="text-foreground hover:text-[hsl(var(--coral))] transition-colors font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigate('/community')}
                  className="text-muted-foreground hover:text-[hsl(var(--coral))] transition-colors"
                >
                  Community
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-muted-foreground hover:text-[hsl(var(--coral))] transition-colors"
                >
                  Profile
                </button>
                <button 
                  onClick={() => navigate('/messages')}
                  className="text-muted-foreground hover:text-[hsl(var(--coral))] transition-colors"
                >
                  Messages
                </button>
              </nav>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to your neighborhood! 👋
          </h2>
          <p className="text-xl text-muted-foreground/70 mb-8 max-w-2xl mx-auto">
            Connect with skilled neighbors, share your expertise, and build a stronger community together.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button 
              onClick={() => navigate('/profile')}
              className="btn-warm"
            >
              ✨ Offer Your Help
            </button>
            <button 
              onClick={() => navigate('/community')}
              className="btn-secondary"
            >
              🔍 Find Help
            </button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatsCard
            icon={<Users className="w-8 h-8" />}
            value={mockStats.totalMembers}
            label="Community Members"
            color="coral"
          />
          <StatsCard
            icon={<Heart className="w-8 h-8" />}
            value={mockStats.helpSessionsThisWeek}
            label="Helps This Week"
            color="sage"
          />
          <StatsCard
            icon={<BookOpen className="w-8 h-8" />}
            value={mockStats.skillsShared}
            label="Skills Shared"
            color="sunny"
          />
          <StatsCard
            icon={<HandHeart className="w-8 h-8" />}
            value={mockStats.neighborsHelped}
            label="Neighbors Helped"
            color="coral"
          />
        </div>

        {/* Featured Neighbors */}
        <section>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            ⭐ Featured Neighbors
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="community-card">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.profession}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {user.bio.slice(0, 80)}...
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {user.expertise.slice(0, 2).map((skill, index) => (
                    <span key={index} className="expertise-badge text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
