
import { useState } from 'react';
import CommunityCard from '../components/CommunityCard';
import SearchFilter from '../components/SearchFilter';
import { mockUsers } from '../data/mockData';
import { User } from '../types/community';
import { useNavigate } from 'react-router-dom';
import { HandHeart, ArrowLeft } from 'lucide-react';

const Community = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Get all unique skills
  const allSkills = Array.from(new Set(mockUsers.flatMap(user => user.expertise))).sort();

  // Filter users based on search and selected skills
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => user.expertise.includes(skill));
    
    return matchesSearch && matchesSkills;
  });

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleMessage = (user: User) => {
    console.log('Starting conversation with:', user.name);
    navigate('/messages', { state: { selectedUser: user } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--warm-cream))] to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[hsl(var(--warm-gray))]/30 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-[hsl(var(--warm-gray))]/30 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[hsl(var(--warm-text))]" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] rounded-2xl flex items-center justify-center">
                <HandHeart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] bg-clip-text text-transparent">
                Community
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[hsl(var(--warm-text))] mb-2">
            Find Your Neighborhood Experts 🌟
          </h2>
          <p className="text-lg text-[hsl(var(--warm-text))]/70">
            Connect with skilled neighbors ready to help with your projects
          </p>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSkills={selectedSkills}
          onSkillToggle={handleSkillToggle}
          availableSkills={allSkills}
        />

        <div className="flex items-center justify-between mb-6">
          <p className="text-[hsl(var(--warm-text))]/70">
            Found {filteredUsers.length} neighbor{filteredUsers.length !== 1 ? 's' : ''} ready to help
          </p>
          {selectedSkills.length > 0 && (
            <button
              onClick={() => setSelectedSkills([])}
              className="text-[hsl(var(--coral))] hover:text-[hsl(var(--coral-secondary))] font-medium transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <CommunityCard 
              key={user.id} 
              user={user} 
              onMessage={handleMessage}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤷‍♀️</div>
            <h3 className="text-xl font-semibold text-[hsl(var(--warm-text))] mb-2">
              No neighbors found
            </h3>
            <p className="text-[hsl(var(--warm-text))]/70 mb-4">
              Try adjusting your search or clearing the filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSkills([]);
              }}
              className="btn-warm"
            >
              Reset Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Community;
