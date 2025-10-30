# Design Guidelines: 3D Wireframe Architectural Drawing Generator

## Design Approach

**Selected Approach**: Design System (Material Design) + CAD Tool References
**Justification**: This is a utility-focused technical application where efficiency, precision, and usability are paramount. Drawing inspiration from professional 3D modeling tools (Blender, SketchUp, Tinkercad) while maintaining web-native accessibility.

**Core Principles**:
- Viewport-First: The 3D canvas is the hero element, occupying maximum screen real estate
- Technical Clarity: Interface should feel professional and CAD-inspired
- Minimal Distraction: UI elements support the creative process without competing for attention
- Precision Controls: All interactions should feel precise and intentional

## Typography System

**Font Stack**: 
- Primary: 'Inter' from Google Fonts - for UI elements, labels, buttons
- Monospace: 'JetBrains Mono' - for technical readouts, coordinates, measurements

**Hierarchy**:
- H1 (App Title): text-2xl font-semibold (24px, 600 weight)
- H2 (Section Headers): text-lg font-medium (18px, 500 weight)
- H3 (Panel Titles): text-base font-medium (16px, 500 weight)
- Body Text: text-sm font-normal (14px, 400 weight)
- Labels/Captions: text-xs font-medium (12px, 500 weight)
- Technical Data: text-xs font-mono (12px, monospace)

## Layout System

**Spacing Primitives**: We will use Tailwind units of 2, 3, 4, 6, 8, and 12
- Micro spacing (2, 3): Between related elements, icon-text pairs
- Standard spacing (4, 6): Component padding, form field gaps
- Section spacing (8, 12): Panel sections, major separations

**Grid Architecture**:
```
Desktop Layout (1440px+):
- Left Sidebar: w-80 (320px) - Input & Controls
- Center Viewport: flex-1 - 3D Canvas
- Right Sidebar: w-64 (256px) - Settings & Tools (collapsible)

Tablet (768px - 1439px):
- Top Panel: h-auto - Collapsible input
- Main Viewport: flex-1 - 3D Canvas
- Bottom Drawer: Slide-up controls

Mobile (< 768px):
- Full-screen viewport priority
- Bottom sheet for controls
- Hamburger menu for settings
```

## Component Library

### Navigation & Header
**App Bar** (h-16, fixed top):
- Logo/Title (left-aligned with p-4)
- Quick action buttons (right-aligned): Help, Download, Share
- Subtle border-bottom for definition
- z-50 for layering above panels

### Input Panel (Left Sidebar - Desktop)
**Text Input Section**:
- Textarea: min-h-32, p-4, rounded-lg border
- Character counter: text-xs, right-aligned, mt-2
- Example Prompts: Grid of 2 columns with gap-3
  - Each prompt card: p-3, rounded-md, cursor-pointer, text-sm
  - Hover state: subtle scale transform

**Generate Button**:
- Full width (w-full), h-12, rounded-lg
- Prominent positioning with mt-6
- Loading state with spinner and disabled styling

**Recent Generations** (scrollable):
- Thumbnail grid: grid-cols-2, gap-3, mt-8
- Each thumbnail: aspect-square, rounded-md, cursor-pointer
- Hover: border highlight

### 3D Viewport (Center)
**Canvas Container**:
- Full available height and width (w-full h-full)
- Subtle inset border for depth
- Canvas background: architectural grid pattern

**Viewport Controls** (floating overlay):
- Position: Bottom-right, mr-4 mb-4
- Control cluster: flex gap-2, p-2, rounded-lg, backdrop-blur
- Icon buttons: w-10 h-10, rounded-md
- Icons: Reset View, Zoom In, Zoom Out, Fit to Screen, Toggle Grid

**View Indicator** (top-left overlay):
- Position: ml-4 mt-4
- Display: Current camera angle, zoom level
- Text: font-mono text-xs, p-2, rounded backdrop-blur

### Settings Panel (Right Sidebar - Desktop)
**Wireframe Controls**:
- Section header with pb-4
- Slider controls with labels:
  - Line Thickness: 1-5px range
  - Point Size: 2-8px range
  - Each slider: w-full with value display
  - Spacing between sliders: space-y-4

**Style Options**:
- Toggle switches (gap-3):
  - Show Grid Overlay
  - Show Axis Helpers  
  - Show Measurements
  - Anti-aliasing
- Each toggle: flex justify-between items-center, h-10

**Export Section** (mt-8):
- Download format selector: Segmented control (PNG, SVG, OBJ)
- Resolution selector: Dropdown, w-full
- Export button: w-full, h-10, mt-4

### Architectural Shapes Library
**Quick Insert Toolbar** (top of viewport, optional toggle):
- Horizontal icon strip: flex gap-2, p-3
- Shape buttons: w-12 h-12, rounded-md
- Shapes: Wall, Floor, Roof, Column, Window, Door, Stairs
- Tooltip on hover with shape name

### Status & Feedback
**Toast Notifications**:
- Position: top-4 right-4, fixed
- Max-width: max-w-sm
- Auto-dismiss after 4s
- Types: Success (generation complete), Error, Info

**Loading Overlay**:
- Full viewport coverage when generating
- Centered spinner with status text below
- Backdrop: backdrop-blur-sm
- Content: flex flex-col items-center gap-4

## Interaction Patterns

**3D Viewport Interactions**:
- Left-click drag: Orbit camera
- Right-click drag: Pan camera  
- Scroll: Zoom in/out
- Double-click: Focus on object
- All interactions should feel smooth with requestAnimationFrame

**Responsive Breakpoints**:
- Use Tailwind's responsive prefixes consistently
- Mobile-first approach: base styles are mobile, enhance with md:, lg:, xl:
- Sidebars collapse into drawers below lg: breakpoint

**Focus States**:
- All interactive elements must have visible focus rings
- Use ring-2 ring-offset-2 for keyboard navigation
- Focus visible on tab, hidden on click

## Animation Guidelines

**Essential Only**:
- Panel slide-ins/outs: duration-300 ease-in-out
- Button hover: Subtle scale or opacity change, no transform
- Tooltip appearances: duration-150
- **NO** scroll-triggered animations, parallax, or decorative motion
- 3D viewport transitions should be smooth but not eased (linear camera movements)

## Accessibility

**Keyboard Navigation**:
- All controls accessible via Tab
- Viewport navigation: Arrow keys for camera rotation, +/- for zoom
- Esc to close panels/modals
- Enter to generate from text input

**Screen Readers**:
- Descriptive ARIA labels for all icon buttons
- Live region announcements for generation status
- Alt text for example prompt thumbnails

**Contrast & Readability**:
- All text meets WCAG AA standards minimum
- Icon buttons have minimum 44x44px touch targets
- Form inputs have associated labels (not just placeholders)

## Images

**No hero image required** - This is a tool-focused application where the 3D viewport IS the visual centerpiece.

**Icon Library**: Use Heroicons (outline style) via CDN for all UI icons - maintain consistent stroke-width throughout.

**Example Thumbnails**: Use placeholder architectural wireframe previews in the "Recent Generations" section - these should be actual rendered outputs, not static images.

---

**Final Notes**: This design prioritizes the 3D workspace as the primary interface element. All supporting UI should feel professional, unobtrusive, and enable rapid iteration. The interface should feel at home alongside professional CAD tools while remaining accessible as a web application.