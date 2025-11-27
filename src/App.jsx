import { useState, useRef } from 'react'

const initialEvent = {
  name: '',
  phoneNumber: '',
  dateTime: '',
  location: '',
  costPerPerson: '',
  description: '',
  flyerImage: null,
  backgroundImage: null,
  capacity: '',
  photoGallery: [],
  links: [],
}

const initialModules = [
  { id: 'rsvp', name: 'RSVP', icon: 'rsvp', enabled: false },
  { id: 'schedule', name: 'Schedule', icon: 'schedule', enabled: false },
  { id: 'menu', name: 'Menu', icon: 'menu', enabled: false },
  { id: 'music', name: 'Music', icon: 'music', enabled: false },
  { id: 'dress-code', name: 'Dress Code', icon: 'dresscode', enabled: false },
  { id: 'registry', name: 'Registry', icon: 'registry', enabled: false },
]

function App() {
  const [event, setEvent] = useState(initialEvent)
  const [modules, setModules] = useState(initialModules)
  const [ui, setUi] = useState({
    showCapacityModal: false,
    showPhotoGalleryModal: false,
    showLinksModal: false,
    showCustomizeModal: false,
  })

  const flyerInputRef = useRef(null)
  const backgroundInputRef = useRef(null)
  const photoInputRef = useRef(null)

  const updateEvent = (field, value) => {
    setEvent(prev => ({ ...prev, [field]: value }))
  }

  const handleFlyerUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateEvent('flyerImage', url)
    }
  }

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateEvent('backgroundImage', url)
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateEvent('photoGallery', [...event.photoGallery, url])
    }
  }

  const removePhoto = (index) => {
    const newGallery = event.photoGallery.filter((_, i) => i !== index)
    updateEvent('photoGallery', newGallery)
  }

  const toggleModal = (modal) => {
    setUi(prev => ({ ...prev, [modal]: !prev[modal] }))
  }

  const addLink = () => {
    updateEvent('links', [...event.links, { title: '', url: '' }])
  }

  const updateLink = (index, field, value) => {
    const newLinks = [...event.links]
    newLinks[index] = { ...newLinks[index], [field]: value }
    updateEvent('links', newLinks)
  }

  const removeLink = (index) => {
    const newLinks = event.links.filter((_, i) => i !== index)
    updateEvent('links', newLinks)
  }

  const toggleModule = (moduleId) => {
    setModules(prev => prev.map(m =>
      m.id === moduleId ? { ...m, enabled: !m.enabled } : m
    ))
  }

  const handleGoLive = () => {
    console.log('Event data:', event)
    console.log('Enabled modules:', modules.filter(m => m.enabled))
    alert('Event is now live! Check console for event data.')
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#1a0a1f] via-[#2d1b3d] to-[#1a1a2e] text-white overflow-x-hidden"
      style={event.backgroundImage ? {
        background: `linear-gradient(135deg, rgba(26, 10, 31, 0.85) 0%, rgba(45, 27, 61, 0.85) 50%, rgba(26, 26, 46, 0.85) 100%), url(${event.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : undefined}
    >
      <header className="flex justify-between items-center px-10 py-5">
        <div className="font-serif text-2xl font-bold text-[#e8ddd4] tracking-wide">let's hang</div>
        <nav className="flex gap-8 items-center">
          <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">Home</a>
          <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">People</a>
          <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">Search</a>
          <button className="bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full text-sm hover:bg-white/20 transition-colors">
            Sign in
          </button>
        </nav>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 max-w-6xl mx-auto px-10 py-10">
        <section className="flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#9b7bb8] via-[#d4a5c9] to-[#f8e8e0]">
            {event.flyerImage ? (
              <img src={event.flyerImage} alt="Event flyer" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center text-white text-center p-5">
                <div className="text-7xl font-black leading-[0.9] uppercase drop-shadow-lg">
                  YOU'RE<br />INVITED
                </div>
              </div>
            )}
            <button
              className="absolute bottom-3 right-3 bg-black/50 text-white w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={() => flyerInputRef.current?.click()}
            >
              ↗
            </button>
            <input type="file" ref={flyerInputRef} onChange={handleFlyerUpload} accept="image/*" />
          </div>

          <button
            className="bg-white/10 backdrop-blur-lg border border-white/15 text-white py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2.5 hover:bg-white/15 hover:border-white/25 transition-all"
            onClick={() => backgroundInputRef.current?.click()}
          >
            🖼️ Change background
          </button>
          <input type="file" ref={backgroundInputRef} onChange={handleBackgroundUpload} accept="image/*" />
        </section>

        <section className="flex flex-col gap-5">
          <h1 className="text-4xl font-light text-white/85 mb-2">Name your event</h1>

          <div className="flex items-center bg-[#3c2d46]/50 rounded-xl p-1 border border-white/10">
            <span className="px-3">📱</span>
            <input
              type="tel"
              className="flex-1 bg-transparent border-none text-white/60 py-3 px-4 text-sm outline-none placeholder:text-white/50"
              placeholder="Enter phone number to save the draft"
              value={event.phoneNumber}
              onChange={(e) => updateEvent('phoneNumber', e.target.value)}
            />
            <button className="bg-white/10 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
              →
            </button>
          </div>

          <div className="bg-[#2d2337]/60 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3 py-3.5 px-2 border-b border-white/10">
              <span className="text-lg w-6 text-center">📅</span>
              <input
                type="text"
                className="flex-1 bg-transparent border-none text-white/70 text-sm outline-none placeholder:text-white/50"
                placeholder="Date and time"
                value={event.dateTime}
                onChange={(e) => updateEvent('dateTime', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 py-3.5 px-2 border-b border-white/10">
              <span className="text-lg w-6 text-center">📍</span>
              <input
                type="text"
                className="flex-1 bg-transparent border-none text-white/70 text-sm outline-none placeholder:text-white/50"
                placeholder="Location"
                value={event.location}
                onChange={(e) => updateEvent('location', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 py-3.5 px-2">
              <span className="text-lg w-6 text-center">🎟️</span>
              <input
                type="text"
                className="flex-1 bg-transparent border-none text-white/70 text-sm outline-none placeholder:text-white/50"
                placeholder="Cost per person"
                value={event.costPerPerson}
                onChange={(e) => updateEvent('costPerPerson', e.target.value)}
              />
            </div>
          </div>

          <div className="bg-[#2d2337]/40 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <textarea
              className="w-full min-h-[80px] bg-transparent border-none text-white/70 text-sm outline-none resize-y placeholder:text-white/50"
              placeholder="Describe your event"
              value={event.description}
              onChange={(e) => updateEvent('description', e.target.value)}
            />
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <button
              className={`flex items-center gap-2 bg-[#3c3246]/60 backdrop-blur-lg border border-white/15 text-white/90 py-2.5 px-4.5 rounded-full text-sm hover:bg-[#46384f]/70 hover:border-white/25 transition-all ${event.capacity ? 'bg-[#9b7bb8]/40 border-[#9b7bb8]/60' : ''}`}
              onClick={() => toggleModal('showCapacityModal')}
            >
              + Capacity
            </button>
            <button
              className={`flex items-center gap-2 bg-[#3c3246]/60 backdrop-blur-lg border border-white/15 text-white/90 py-2.5 px-4.5 rounded-full text-sm hover:bg-[#46384f]/70 hover:border-white/25 transition-all ${event.photoGallery.length > 0 ? 'bg-[#9b7bb8]/40 border-[#9b7bb8]/60' : ''}`}
              onClick={() => toggleModal('showPhotoGalleryModal')}
            >
              + Photo gallery
            </button>
            <button
              className={`flex items-center gap-2 bg-[#3c3246]/60 backdrop-blur-lg border border-white/15 text-white/90 py-2.5 px-4.5 rounded-full text-sm hover:bg-[#46384f]/70 hover:border-white/25 transition-all ${event.links.length > 0 ? 'bg-[#9b7bb8]/40 border-[#9b7bb8]/60' : ''}`}
              onClick={() => toggleModal('showLinksModal')}
            >
              + Links
            </button>
            <button className="bg-transparent border-none text-white/50 py-2.5 px-3 text-sm hover:text-white/80 transition-colors">
              Show more
            </button>
          </div>

          <div className="bg-[#231e2d]/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-5">
              <div className="flex gap-4 flex-wrap">
                <span className="text-2xl opacity-60">📢</span>
                <span className="text-2xl opacity-60">📅</span>
                <span className="text-2xl opacity-60">🎲</span>
                <span className="text-2xl opacity-60">🔗</span>
                <span className="text-2xl opacity-60">🖼️</span>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-white/90">Customize your</div>
                <div className="text-sm text-white/60">event your way</div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl opacity-60 font-serif font-bold">RSVP</span>
              </div>
            </div>
            <button
              className="w-full bg-white/10 backdrop-blur-lg border border-white/10 text-white/90 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
              onClick={() => toggleModal('showCustomizeModal')}
            >
              🎨 Customize
            </button>
          </div>

          <button
            className="w-full bg-gradient-to-br from-[#78648c]/60 to-[#50416a]/60 backdrop-blur-lg border border-white/10 text-[#ff6b9d] py-4.5 rounded-2xl text-base font-medium flex items-center justify-center gap-2 hover:from-[#826e96]/70 hover:to-[#5a4b74]/70 hover:-translate-y-0.5 transition-all"
            onClick={handleGoLive}
          >
            🎉 Go live
          </button>
        </section>
      </main>

      {ui.showCapacityModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => toggleModal('showCapacityModal')}>
          <div className="bg-gradient-to-br from-[#2d1b3d] to-[#1a1a2e] rounded-2xl p-8 max-w-md w-[90%] border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">Set Capacity</h2>
              <button className="bg-transparent border-none text-white/60 text-2xl cursor-pointer hover:text-white" onClick={() => toggleModal('showCapacityModal')}>×</button>
            </div>
            <input
              type="number"
              className="w-full bg-[#3c2d46]/50 border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm outline-none mb-4 placeholder:text-white/50"
              placeholder="Maximum number of attendees"
              value={event.capacity}
              onChange={(e) => updateEvent('capacity', e.target.value)}
            />
            <button className="w-full bg-gradient-to-br from-[#9b7bb8] to-[#7b5b98] border-none text-white py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity" onClick={() => toggleModal('showCapacityModal')}>
              Save
            </button>
          </div>
        </div>
      )}

      {ui.showPhotoGalleryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => toggleModal('showPhotoGalleryModal')}>
          <div className="bg-gradient-to-br from-[#2d1b3d] to-[#1a1a2e] rounded-2xl p-8 max-w-md w-[90%] border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">Photo Gallery</h2>
              <button className="bg-transparent border-none text-white/60 text-2xl cursor-pointer hover:text-white" onClick={() => toggleModal('showPhotoGalleryModal')}>×</button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {event.photoGallery.map((photo, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden relative">
                  <img src={photo} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                  <button className="absolute top-1.5 right-1.5 bg-black/60 border-none text-white w-6 h-6 rounded-full text-sm cursor-pointer" onClick={() => removePhoto(index)}>×</button>
                </div>
              ))}
              <button className="aspect-square bg-[#3c2d46]/30 border border-dashed border-white/30 rounded-lg flex items-center justify-center text-3xl text-white/50 hover:border-white/50 hover:text-white/80 transition-all cursor-pointer" onClick={() => photoInputRef.current?.click()}>
                +
              </button>
            </div>
            <input type="file" ref={photoInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
            <button className="w-full bg-gradient-to-br from-[#9b7bb8] to-[#7b5b98] border-none text-white py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity" onClick={() => toggleModal('showPhotoGalleryModal')}>
              Done
            </button>
          </div>
        </div>
      )}

      {ui.showLinksModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => toggleModal('showLinksModal')}>
          <div className="bg-gradient-to-br from-[#2d1b3d] to-[#1a1a2e] rounded-2xl p-8 max-w-md w-[90%] border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">Add Links</h2>
              <button className="bg-transparent border-none text-white/60 text-2xl cursor-pointer hover:text-white" onClick={() => toggleModal('showLinksModal')}>×</button>
            </div>
            {event.links.map((link, index) => (
              <div key={index} className="flex items-center gap-3 bg-[#3c2d46]/30 rounded-lg p-3 mb-3">
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none text-white text-sm outline-none"
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) => updateLink(index, 'title', e.target.value)}
                />
                <input
                  type="url"
                  className="flex-1 bg-transparent border-none text-white text-sm outline-none"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                />
                <button className="bg-transparent border-none text-white/50 cursor-pointer hover:text-[#ff6b9d]" onClick={() => removeLink(index)}>×</button>
              </div>
            ))}
            <button className="w-full bg-transparent border border-dashed border-white/30 text-white/60 py-3 rounded-lg mb-4 hover:border-white/50 hover:text-white/80 transition-all cursor-pointer" onClick={addLink}>+ Add link</button>
            <button className="w-full bg-gradient-to-br from-[#9b7bb8] to-[#7b5b98] border-none text-white py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity" onClick={() => toggleModal('showLinksModal')}>
              Save
            </button>
          </div>
        </div>
      )}

      {ui.showCustomizeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => toggleModal('showCustomizeModal')}>
          <div className="bg-gradient-to-br from-[#2d1b3d] to-[#1a1a2e] rounded-2xl p-8 max-w-md w-[90%] border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">Customize Modules</h2>
              <button className="bg-transparent border-none text-white/60 text-2xl cursor-pointer hover:text-white" onClick={() => toggleModal('showCustomizeModal')}>×</button>
            </div>
            <p className="text-white/60 mb-5 text-sm">Select modules to add to your event page</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`bg-[#3c2d46]/40 border border-white/10 rounded-xl p-4 cursor-pointer flex items-center gap-3 hover:bg-[#463750]/50 transition-all ${module.enabled ? 'bg-[#9b7bb8]/30 border-[#9b7bb8]/50' : ''}`}
                  onClick={() => toggleModule(module.id)}
                >
                  <span className="text-2xl">
                    {module.icon === 'rsvp' && '✉️'}
                    {module.icon === 'schedule' && '📅'}
                    {module.icon === 'menu' && '🍽️'}
                    {module.icon === 'music' && '🎵'}
                    {module.icon === 'dresscode' && '👔'}
                    {module.icon === 'registry' && '🎁'}
                  </span>
                  <span className="text-sm text-white/90">{module.name}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-gradient-to-br from-[#9b7bb8] to-[#7b5b98] border-none text-white py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity" onClick={() => toggleModal('showCustomizeModal')}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
