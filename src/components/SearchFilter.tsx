
import { Search } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  availableSkills: string[];
}

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedSkills, 
  onSkillToggle, 
  availableSkills 
}: SearchFilterProps) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg shadow-orange-100/20 border border-[hsl(var(--warm-gray))]/30 mb-6">
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--warm-text))]/50 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, skill, or expertise..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="warm-input w-full pl-12"
        />
      </div>
      
      <div>
        <h4 className="font-medium text-[hsl(var(--warm-text))] mb-3">Filter by expertise:</h4>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => onSkillToggle(skill)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedSkills.includes(skill)
                  ? 'bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] text-white shadow-md'
                  : 'bg-[hsl(var(--warm-gray))]/50 text-[hsl(var(--warm-text))] hover:bg-[hsl(var(--warm-gray))]'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
