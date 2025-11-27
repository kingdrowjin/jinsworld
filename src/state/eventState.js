import { atom } from 'recoil';

// Main event state - easy to replace with real backend
export const eventState = atom({
  key: 'eventState',
  default: {
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
    customModules: [],
  },
});

// UI state for modals and loading states
export const uiState = atom({
  key: 'uiState',
  default: {
    isLoading: false,
    showCapacityModal: false,
    showPhotoGalleryModal: false,
    showLinksModal: false,
    showCustomizeModal: false,
  },
});

// Available quick-link modules that can be added
export const availableModulesState = atom({
  key: 'availableModulesState',
  default: [
    { id: 'rsvp', name: 'RSVP', icon: 'rsvp', enabled: false },
    { id: 'schedule', name: 'Schedule', icon: 'schedule', enabled: false },
    { id: 'menu', name: 'Menu', icon: 'menu', enabled: false },
    { id: 'music', name: 'Music', icon: 'music', enabled: false },
    { id: 'dress-code', name: 'Dress Code', icon: 'dresscode', enabled: false },
    { id: 'registry', name: 'Registry', icon: 'registry', enabled: false },
  ],
});
