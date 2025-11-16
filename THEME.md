# TEDxPantami Theme Documentation

This document describes the design system and theme configuration for the TEDxPantami website.

## Colors

### Primary Color
The primary color is **TEDx Red** (`#E62B1E`), which is the signature color of TEDx events.

**Usage:**
```jsx
// Background
<div className="bg-primary-500">Primary background</div>

// Text
<p className="text-primary-500">Primary text</p>

// Border
<div className="border-primary-500">Primary border</div>
```

**Color Scale:**
- `primary-50` to `primary-950`: Full color scale from lightest to darkest
- `primary-500`: Main primary color (`#E62B1E`)

### Secondary Colors
Secondary colors are grayscale colors used for text, backgrounds, and borders.

**Usage:**
```jsx
// Text colors
<p className="text-secondary-600">Body text</p>
<p className="text-secondary-400">Muted text</p>

// Backgrounds
<div className="bg-secondary-50">Light background</div>
<div className="bg-secondary-900">Dark background</div>
```

**Color Scale:**
- `secondary-50`: Lightest gray (#f9fafb)
- `secondary-500`: Medium gray (#6b7280)
- `secondary-900`: Darkest gray (#111827)

### Accent Colors
Accent colors are used for status indicators, highlights, and special elements.

**Blue Accent:**
```jsx
<div className="bg-accent-blue-500">Info/Blue accent</div>
```

**Green Accent:**
```jsx
<div className="bg-accent-green-500">Success/Green accent</div>
```

**Yellow Accent:**
```jsx
<div className="bg-accent-yellow-500">Warning/Highlight</div>
```

## Typography

### Font Families

**Primary Sans:**
- `font-sans`: Inter, Poppins, Roboto, sans-serif (default)
- `font-display`: Poppins, Inter, sans-serif (for headings)
- `font-body`: Inter, sans-serif (for body text)

**Usage:**
```jsx
<h1 className="font-display">Heading with Poppins</h1>
<p className="font-body">Body text with Inter</p>
```

### Font Sizes
The theme includes a comprehensive font size scale from `text-xs` to `text-9xl`.

**Common Sizes:**
- `text-xs`: 0.75rem (12px)
- `text-sm`: 0.875rem (14px)
- `text-base`: 1rem (16px) - default
- `text-lg`: 1.125rem (18px)
- `text-xl`: 1.25rem (20px)
- `text-2xl`: 1.5rem (24px)
- `text-3xl`: 1.875rem (30px)
- `text-4xl`: 2.25rem (36px)
- `text-5xl`: 3rem (48px)

## Components

### Buttons

**Primary Button:**
```jsx
<button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
  Primary Button
</button>
```

**Secondary Button:**
```jsx
<button className="bg-secondary-100 text-secondary-700 px-6 py-3 rounded-lg font-medium hover:bg-secondary-200 transition-colors">
  Secondary Button
</button>
```

**Outline Button:**
```jsx
<button className="border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
  Outline Button
</button>
```

### Cards

```jsx
<div className="bg-white rounded-lg shadow-soft p-6">
  <h3 className="text-xl font-display font-semibold mb-2">Card Title</h3>
  <p className="text-secondary-600">Card content</p>
</div>
```

## Shadows

The theme includes custom shadow utilities:

- `shadow-soft`: Subtle shadow for cards
- `shadow-medium`: Medium shadow for elevated elements
- `shadow-large`: Large shadow for modals/popovers

**Usage:**
```jsx
<div className="shadow-soft">Soft shadow</div>
<div className="shadow-medium">Medium shadow</div>
<div className="shadow-large">Large shadow</div>
```

## Gradients

**Primary Gradient:**
```jsx
<div className="bg-gradient-primary">Gradient background</div>
```

**Secondary Gradient:**
```jsx
<div className="bg-gradient-secondary">Dark gradient background</div>
```

## Spacing

Extended spacing scale:
- `space-18`: 4.5rem (72px)
- `space-88`: 22rem (352px)
- `space-128`: 32rem (512px)

## Border Radius

Extended border radius:
- `rounded-4xl`: 2rem (32px)

## Examples

### Hero Section
```jsx
<section className="bg-gradient-primary text-white py-20">
  <div className="container mx-auto px-4">
    <h1 className="font-display text-5xl font-bold mb-4">
      TEDxPantami
    </h1>
    <p className="text-xl mb-8">
      Redefining Possibilities
    </p>
    <button className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-secondary-50 transition-colors">
      Join the Hackathon
    </button>
  </div>
</section>
```

### Navigation Bar
```jsx
<nav className="bg-white/95 backdrop-blur-sm shadow-soft fixed top-0 w-full z-50">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    <a href="/" className="font-display text-2xl font-bold text-primary-500">
      TEDxPantami
    </a>
    <div className="space-x-6">
      <a href="#about" className="text-secondary-700 hover:text-primary-500 transition-colors">
        About
      </a>
      <a href="#programs" className="text-secondary-700 hover:text-primary-500 transition-colors">
        Programs
      </a>
      <a href="#hackathon" className="text-secondary-700 hover:text-primary-500 transition-colors">
        Hackathon
      </a>
    </div>
  </div>
</nav>
```

### Event Card
```jsx
<div className="bg-white rounded-xl shadow-soft overflow-hidden">
  <img src="/event-image.jpg" alt="Event" className="w-full h-48 object-cover" />
  <div className="p-6">
    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
      Registration Open
    </span>
    <h3 className="font-display text-2xl font-semibold mb-2">
      TEDxPantami 2025
    </h3>
    <p className="text-secondary-600 mb-4">
      Our flagship event featuring inspiring talks on innovation, technology, and social change.
    </p>
    <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">
      Register Now
    </button>
  </div>
</div>
```

## Best Practices

1. **Use Primary Color Sparingly**: The primary red should be used for CTAs, links, and important elements, not as the main background.

2. **Maintain Contrast**: Ensure text has sufficient contrast against backgrounds. Use `text-secondary-900` on light backgrounds and `text-white` on dark backgrounds.

3. **Consistent Typography**: Use `font-display` for headings and `font-body` for body text.

4. **Subtle Shadows**: Prefer `shadow-soft` for most cards and elevated elements.

5. **Responsive Design**: Always test components across different screen sizes.

6. **Accessibility**: Ensure interactive elements have proper hover states and focus indicators.

## Color Reference Table

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary 500 | #E62B1E | Main TEDx red, buttons, links |
| Primary 100 | #fecaca | Light backgrounds, badges |
| Secondary 50 | #f9fafb | Light backgrounds |
| Secondary 600 | #4b5563 | Body text |
| Secondary 700 | #374151 | Dark text, headings |
| Accent Blue 500 | #2563eb | Info, links |
| Accent Green 500 | #16a34a | Success states |
| Accent Yellow 400 | #facc15 | Highlights, warnings |

---

*Last updated: 2025*

