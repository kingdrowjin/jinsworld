# Video Script (5-10 minutes)

## Intro (30 seconds)
"Hi! I'm going to walk you through my implementation of the Let's Hang event creation page. I built this using React with Vite, focusing on matching the Figma design while making smart technical decisions for future scalability."

## Demo the Features (2-3 minutes)

### Flyer Upload
"First, let me show you the flyer upload. Click this arrow button, and it opens the native file picker. When I select an image, it replaces the placeholder. This uses a hidden file input triggered by a ref."

### Background Change
"The 'Change background' button works similarly. Watch how the selected image becomes the page background with a gradient overlay to maintain text readability."

### Form Fields
"The form section has all the required fields - phone number to save drafts, date/time, location, and cost per person. Each field updates the state immediately."

### Module Buttons
"These module buttons open modals. Let me show Capacity - I can set max attendees. Photo Gallery lets me upload multiple images in a grid. Links allows adding custom URLs with titles."

### Customize Section
"The Customize button opens a modal with quick-link modules like RSVP, Schedule, Menu, Music. I can toggle each one on or off. These represent backend-defined modules that would render custom code on the event page."

### Go Live
"Finally, Go Live logs all the event data. In production, this would send everything to the backend."

## Technical Decisions (2-3 minutes)

### State Management
"I initially planned to use Recoil for state management, but ran into React 19 compatibility issues. I pivoted to React's built-in useState, which actually works perfectly for this scope. The key insight is that my `updateEvent` function is the single point where state changes happen - so connecting a real backend would only require adding one API call there."

### Code Structure
"I kept everything in a single App.jsx file intentionally. For a demo of this size, splitting into many components would add complexity without benefit. However, the code is organized logically - state at top, handlers in middle, JSX at bottom - making it easy to extract components later if needed."

### CSS Choices
"I used custom CSS rather than a framework like Tailwind. This gave me precise control over the glassmorphism effects and gradient backgrounds that match the Figma design. The backdrop-filter blur creates that frosted glass look on the cards."

### Mock Backend Architecture
"The state structure mirrors what a real API would expect. Each field is clearly defined, arrays for photos and links, simple objects throughout. Replacing the mock with real API calls would be a 1-2 line change per endpoint."

## Forward Thinking (1 minute)

"If I were to continue this project, I'd:
1. Add form validation before Go Live
2. Implement actual date/time pickers
3. Add drag-and-drop for photo reordering
4. Create a preview mode to see the final event page
5. Add authentication for the draft save feature

The architecture supports all of this without major refactoring."

## Closing (30 seconds)
"That's my implementation of the Let's Hang event creation page. I focused on matching the design, making smart technical trade-offs, and building with future scalability in mind. Thanks for watching!"

---

## Key Talking Points

1. **Design Accuracy**: "I matched the Figma closely - the gradient colors, glassmorphism cards, layout structure"

2. **Technical Trade-off**: "Recoil to useState - chose working solution over complex one"

3. **Backend Ready**: "One function to modify for real API integration"

4. **UX Decisions**: "Native file picker for familiar experience, modals for focused input"

5. **Code Quality**: "Clean code, no comments needed because names are self-documenting"
