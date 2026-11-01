# Section Transition Design

## Context

`PageContainer` currently renders two empty transition blocks with unrelated names:
`transitionSection1` after page content and `transitionSection2` before `Footer`.
Each block owns a fixed height, gradient, and top border. Together they create a
large pale band before the dark Footer, as shown in the supplied screenshot.

The page shell has no Contact section between these blocks anymore, so two
independent transition regions no longer represent the actual layout.

## Goal

Create one reusable, semantic transition component that visually connects page
content to the dark Footer while preserving the site's light blue brand language.

Success criteria:

- No large opaque or muddy band above Footer.
- One clear component owns spacing and transition decoration.
- Desktop and mobile spacing remain proportional.
- Decorative animation respects `prefers-reduced-motion`.
- Existing page content, Footer behavior, navigation, and route structure remain unchanged.

## Design

### Component boundary

Add `components/SectionTransition/index.tsx` with a matching CSS module.
The component accepts no business data and renders only decorative layout:

```tsx
<SectionTransition />
```

It uses a semantic `section` with `aria-hidden="true"`, because the element
does not communicate content or provide interaction.

### Page composition

Update `PageContainer` to:

1. Remove `transitionSection1` from inside `main`.
2. Render one `SectionTransition` after `main` and before `Footer`.
3. Remove both legacy transition class names and their CSS.

Result:

```text
Navigator
  -> main/page content
  -> SectionTransition
  -> Footer
```

### Visual behavior

The component is a breathing band, not a panel:

- Transparent base lets the current page background continue naturally.
- Total component height stays around `72px` desktop and `48px` mobile;
  vertical padding controls the breathing space.
- A centered, max-width brand line provides the only strong visual seam.
- A low-opacity radial glow sits around the line.
- A subtle bottom gradient darkens toward Footer without creating a hard strip.
- Border, shadow, and glow use existing primary/neutral design tokens.

The component must not add SVG waves, particles, opaque white fills, or layout
dependent absolute positioning.

### Motion and accessibility

Use a small fade/scale-in for the brand line only. Do not animate the whole
layout or alter document flow. Disable motion under
`@media (prefers-reduced-motion: reduce)`.

### Responsive behavior

- Desktop: `padding-block: clamp(2rem, 3vw, 2.75rem)`.
- Mobile: reduce padding to `1.5rem 1rem`.
- Keep line width fluid with a max width so it does not touch viewport edges.
- Preserve Footer's own responsive grid and visual treatment.

## Error handling and compatibility

No runtime data or asynchronous behavior is introduced. The component has no
failure state. Existing `PageContainer` HOC props, metadata, scroll progress,
back-to-top button, and Footer interactions stay unchanged.

## Verification

- Run `npm run lint`.
- Run `npm run build` if lint passes.
- Inspect desktop and mobile layouts around the content/Footer boundary.
- Verify reduced-motion mode has no transition animation.
- Verify no references to `transitionSection1` or `transitionSection2` remain in
  executable component/style files.

## Non-goals

- Redesign Footer content or Footer color palette.
- Change Navigator, route behavior, or page-specific layouts.
- Add a Contact section back into the shared shell.
- Introduce a new animation system or design-token set.
