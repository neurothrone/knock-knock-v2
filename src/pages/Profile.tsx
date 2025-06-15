
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandHeart, ArrowLeft, Camera, MapPin, Star, Plus, X } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Your Name',
    profession: 'Your Profession',
    location: 'Your Street',
    bio: 'Tell your neighbors about yourself and how you love to help!',
    expertise: ['Add your first skill'],
    availability: true
  });
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', profileData);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.expertise.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        expertise: [...prev.expertise.filter(skill => skill !== 'Add your first skill'), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--warm-cream))] to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[hsl(var(--warm-gray))]/30 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
                Your Profile
              </h1>
            </div>
            
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className={isEditing ? 'btn-secondary' : 'btn-warm'}
            >
              {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="community-card max-w-2xl mx-auto">
          {/* Profile Picture Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-[hsl(var(--coral))]/20 to-[hsl(var(--sage))]/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <Camera className="w-12 h-12 text-[hsl(var(--warm-text))]/50" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[hsl(var(--coral))] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--warm-text))] mb-2">
                Your Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="warm-input w-full"
                />
              ) : (
                <p className="text-lg font-semibold text-[hsl(var(--warm-text))]">{profileData.name}</p>
              )}
            </div>

            {/* Profession */}
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--warm-text))] mb-2">
                Profession
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.profession}
                  onChange={(e) => setProfileData(prev => ({ ...prev, profession: e.target.value }))}
                  className="warm-input w-full"
                />
              ) : (
                <p className="text-[hsl(var(--warm-text))]/80">{profileData.profession}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--warm-text))] mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Location (Street Level)
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  className="warm-input w-full"
                  placeholder="e.g., Oak Street, Maple Avenue"
                />
              ) : (
                <p className="text-[hsl(var(--warm-text))]/80">{profileData.location}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--warm-text))] mb-2">
                Bio - Tell your neighbors about yourself!
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="warm-input w-full h-24 resize-none"
                  placeholder="Share what you love to help with and a bit about yourself..."
                />
              ) : (
                <p className="text-[hsl(var(--warm-text))]/80 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Expertise */}
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--warm-text))] mb-2">
                <Star className="inline w-4 h-4 mr-1" />
                Your Expertise & Skills
              </label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.expertise.map((skill, index) => (
                  <span key={index} className="flex items-center gap-2 expertise-badge">
                    {skill}
                    {isEditing && skill !== 'Add your first skill' && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-[hsl(var(--warm-text))]/60 hover:text-[hsl(var(--coral))] transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill..."
                    className="warm-input flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="bg-[hsl(var(--sage))] text-white px-4 py-2 rounded-xl hover:bg-[hsl(var(--sage-light))] transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between p-4 bg-[hsl(var(--warm-gray))]/20 rounded-2xl">
              <div>
                <h4 className="font-medium text-[hsl(var(--warm-text))] mb-1">Availability Status</h4>
                <p className="text-sm text-[hsl(var(--warm-text))]/70">
                  Let neighbors know if you're available to help
                </p>
              </div>
              
              {isEditing ? (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.availability}
                    onChange={(e) => setProfileData(prev => ({ ...prev, availability: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--sage))]"></div>
                </label>
              ) : (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    profileData.availability ? 'bg-[hsl(var(--sage))]' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm font-medium text-[hsl(var(--warm-text))]">
                    {profileData.availability ? 'Available' : 'Busy'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
