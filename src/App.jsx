import { useState, useRef } from 'react'
import './App.css'

// Initial state - mock backend data structure
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

  // Update event field - mock backend call
  const updateEvent = (field, value) => {
    setEvent(prev => ({ ...prev, [field]: value }))
    // In real app: api.updateEvent(field, value)
  }

  // Handle flyer image upload
  const handleFlyerUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateEvent('flyerImage', url)
    }
  }

  // Handle background change
  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateEvent('backgroundImage', url)
    }
  }

  // Handle photo gallery upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateEvent('photoGallery', [...event.photoGallery, url])
    }
  }

  // Remove photo from gallery
  const removePhoto = (index) => {
    const newGallery = event.photoGallery.filter((_, i) => i !== index)
    updateEvent('photoGallery', newGallery)
  }

  // Toggle modal
  const toggleModal = (modal) => {
    setUi(prev => ({ ...prev, [modal]: !prev[modal] }))
  }

  // Add link
  const addLink = () => {
    updateEvent('links', [...event.links, { title: '', url: '' }])
  }

  // Update link
  const updateLink = (index, field, value) => {
    const newLinks = [...event.links]
    newLinks[index] = { ...newLinks[index], [field]: value }
    updateEvent('links', newLinks)
  }

  // Remove link
  const removeLink = (index) => {
    const newLinks = event.links.filter((_, i) => i !== index)
    updateEvent('links', newLinks)
  }

  // Toggle module
  const toggleModule = (moduleId) => {
    setModules(prev => prev.map(m =>
      m.id === moduleId ? { ...m, enabled: !m.enabled } : m
    ))
  }

  // Handle Go Live
  const handleGoLive = () => {
    console.log('Event data:', event)
    console.log('Enabled modules:', modules.filter(m => m.enabled))
    alert('Event is now live! Check console for event data.')
  }

  return (
    <div className="app" style={event.backgroundImage ? {
      background: `linear-gradient(135deg, rgba(26, 10, 31, 0.85) 0%, rgba(45, 27, 61, 0.85) 50%, rgba(26, 26, 46, 0.85) 100%), url(${event.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    } : undefined}>

      {/* Header */}
      <header className="header">
        <div className="logo">let's hang</div>
        <nav className="nav">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">People</a>
          <a href="#" className="nav-link">Search</a>
          <button className="sign-in-btn">Sign in</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Section - Flyer */}
        <section className="flyer-section">
          <div className="flyer-container">
            {event.flyerImage ? (
              <img src={event.flyerImage} alt="Event flyer" className="flyer-image" />
            ) : (
              <div className="flyer-placeholder">
                <div className="flyer-placeholder-text">
                  YOU'RE<br />INVITED
                </div>
              </div>
            )}
            <button
              className="flyer-edit-btn"
              onClick={() => flyerInputRef.current?.click()}
              title="Change flyer"
            >
              ↗
            </button>
            <input
              type="file"
              ref={flyerInputRef}
              onChange={handleFlyerUpload}
              accept="image/*"
            />
          </div>

          <button
            className="change-background-btn"
            onClick={() => backgroundInputRef.current?.click()}
          >
            🖼️ Change background
          </button>
          <input
            type="file"
            ref={backgroundInputRef}
            onChange={handleBackgroundUpload}
            accept="image/*"
          />
        </section>

        {/* Right Section - Form */}
        <section className="form-section">
          <h1 className="event-title">Name your event</h1>

          {/* Phone Input */}
          <div className="phone-input-container">
            <span style={{ padding: '0 12px' }}>📱</span>
            <input
              type="tel"
              className="phone-input"
              placeholder="Enter phone number to save the draft"
              value={event.phoneNumber}
              onChange={(e) => updateEvent('phoneNumber', e.target.value)}
            />
            <button className="phone-submit-btn">→</button>
          </div>

          {/* Event Details Card */}
          <div className="event-details-card">
            <div className="detail-row">
              <span className="detail-icon">📅</span>
              <input
                type="text"
                className="detail-input"
                placeholder="Date and time"
                value={event.dateTime}
                onChange={(e) => updateEvent('dateTime', e.target.value)}
              />
            </div>
            <div className="detail-row">
              <span className="detail-icon">📍</span>
              <input
                type="text"
                className="detail-input"
                placeholder="Location"
                value={event.location}
                onChange={(e) => updateEvent('location', e.target.value)}
              />
            </div>
            <div className="detail-row">
              <span className="detail-icon">🎟️</span>
              <input
                type="text"
                className="detail-input"
                placeholder="Cost per person"
                value={event.costPerPerson}
                onChange={(e) => updateEvent('costPerPerson', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="description-container">
            <textarea
              className="description-input"
              placeholder="Describe your event"
              value={event.description}
              onChange={(e) => updateEvent('description', e.target.value)}
            />
          </div>

          {/* Module Buttons */}
          <div className="module-buttons">
            <button
              className={`module-btn ${event.capacity ? 'active' : ''}`}
              onClick={() => toggleModal('showCapacityModal')}
            >
              + Capacity
            </button>
            <button
              className={`module-btn ${event.photoGallery.length > 0 ? 'active' : ''}`}
              onClick={() => toggleModal('showPhotoGalleryModal')}
            >
              + Photo gallery
            </button>
            <button
              className={`module-btn ${event.links.length > 0 ? 'active' : ''}`}
              onClick={() => toggleModal('showLinksModal')}
            >
              + Links
            </button>
            <button className="show-more-btn">Show more</button>
          </div>

          {/* Customize Section */}
          <div className="customize-section">
            <div className="customize-header">
              <div className="customize-icons">
                <span className="customize-icon">📢</span>
                <span className="customize-icon">📅</span>
                <span className="customize-icon">🎲</span>
                <span className="customize-icon">🔗</span>
                <span className="customize-icon">🖼️</span>
              </div>
              <div className="customize-text">
                <div className="customize-title">Customize your</div>
                <div className="customize-subtitle">event your way</div>
              </div>
              <div className="customize-icons">
                <span className="customize-icon" style={{ fontFamily: 'serif', fontWeight: 'bold' }}>RSVP</span>
              </div>
            </div>
            <button
              className="customize-btn"
              onClick={() => toggleModal('showCustomizeModal')}
            >
              🎨 Customize
            </button>
          </div>

          {/* Go Live Button */}
          <button className="go-live-btn" onClick={handleGoLive}>
            🎉 Go live
          </button>
        </section>
      </main>

      {/* Capacity Modal */}
      {ui.showCapacityModal && (
        <div className="modal-overlay" onClick={() => toggleModal('showCapacityModal')}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Set Capacity</h2>
              <button className="modal-close" onClick={() => toggleModal('showCapacityModal')}>×</button>
            </div>
            <input
              type="number"
              className="modal-input"
              placeholder="Maximum number of attendees"
              value={event.capacity}
              onChange={(e) => updateEvent('capacity', e.target.value)}
            />
            <button className="modal-save-btn" onClick={() => toggleModal('showCapacityModal')}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* Photo Gallery Modal */}
      {ui.showPhotoGalleryModal && (
        <div className="modal-overlay" onClick={() => toggleModal('showPhotoGalleryModal')}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Photo Gallery</h2>
              <button className="modal-close" onClick={() => toggleModal('showPhotoGalleryModal')}>×</button>
            </div>
            <div className="photo-grid">
              {event.photoGallery.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo} alt={`Gallery ${index + 1}`} />
                  <button className="photo-remove-btn" onClick={() => removePhoto(index)}>×</button>
                </div>
              ))}
              <button className="add-photo-btn" onClick={() => photoInputRef.current?.click()}>
                +
              </button>
            </div>
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button className="modal-save-btn" onClick={() => toggleModal('showPhotoGalleryModal')}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Links Modal */}
      {ui.showLinksModal && (
        <div className="modal-overlay" onClick={() => toggleModal('showLinksModal')}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Links</h2>
              <button className="modal-close" onClick={() => toggleModal('showLinksModal')}>×</button>
            </div>
            {event.links.map((link, index) => (
              <div key={index} className="link-item">
                <input
                  type="text"
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) => updateLink(index, 'title', e.target.value)}
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                />
                <button className="link-remove-btn" onClick={() => removeLink(index)}>×</button>
              </div>
            ))}
            <button className="add-link-btn" onClick={addLink}>+ Add link</button>
            <button className="modal-save-btn" onClick={() => toggleModal('showLinksModal')}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* Customize Modal */}
      {ui.showCustomizeModal && (
        <div className="modal-overlay" onClick={() => toggleModal('showCustomizeModal')}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Customize Modules</h2>
              <button className="modal-close" onClick={() => toggleModal('showCustomizeModal')}>×</button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '14px' }}>
              Select modules to add to your event page
            </p>
            <div className="quick-links-grid">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`quick-link-item ${module.enabled ? 'enabled' : ''}`}
                  onClick={() => toggleModule(module.id)}
                >
                  <span className="quick-link-icon">
                    {module.icon === 'rsvp' && '✉️'}
                    {module.icon === 'schedule' && '📅'}
                    {module.icon === 'menu' && '🍽️'}
                    {module.icon === 'music' && '🎵'}
                    {module.icon === 'dresscode' && '👔'}
                    {module.icon === 'registry' && '🎁'}
                  </span>
                  <span className="quick-link-name">{module.name}</span>
                </div>
              ))}
            </div>
            <button className="modal-save-btn" onClick={() => toggleModal('showCustomizeModal')}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
