
import { User } from '../types/community';
import { MessageSquare, MapPin, Star } from 'lucide-react';

interface CommunityCardProps {
  user: User;
  onMessage: (user: User) => void;
}

const CommunityCard = ({ user, onMessage }: CommunityCardProps) => {
  return (
    <div className="community-card">
      <div className="flex items-start gap-4">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-[hsl(var(--warm-text))]">
              {user.name}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[hsl(var(--sunny))] text-[hsl(var(--sunny))]" />
              <span className="text-sm font-medium text-[hsl(var(--warm-text))]">
                {user.rating}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[hsl(var(--sage))]" />
            <span className="text-sm text-[hsl(var(--warm-text))]/70">
              {user.location} • {user.distance} miles away
            </span>
          </div>
          
          <p className="text-sm text-[hsl(var(--warm-text))]/80 mb-3 leading-relaxed">
            {user.bio}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {user.expertise.slice(0, 3).map((skill, index) => (
              <span key={index} className="expertise-badge">
                {skill}
              </span>
            ))}
            {user.expertise.length > 3 && (
              <span className="expertise-badge">
                +{user.expertise.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                user.availability ? 'bg-[hsl(var(--sage))]' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-[hsl(var(--warm-text))]/70">
                {user.availability ? 'Available now' : 'Busy'}
              </span>
            </div>
            
            <button 
              onClick={() => onMessage(user)}
              className="flex items-center gap-2 bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] 
                         text-white px-4 py-2 rounded-xl text-sm font-medium
                         hover:shadow-lg hover:shadow-orange-200/50 
                         transform hover:scale-105 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              Knock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
