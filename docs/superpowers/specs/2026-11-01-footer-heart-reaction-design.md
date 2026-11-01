# Footer Heart Reaction Design

## Goal

Make the footer's existing "Made with love" badge respond meaningfully to clicks with a lightweight, livestream-style floating-heart effect. This is decorative feedback only, not a business likes feature.

## Current Behavior

The badge is a non-interactive `motion.div` with a hover scale effect. Its heart emoji continuously pulses, but clicking the badge has no behavior.

## Proposed Behavior

- Render the badge as a semantic button that supports pointer, Enter, and Space activation.
- Each activation creates exactly one heart near the button. It floats upward, drifts slightly sideways, and fades out, then is removed from the DOM.
- Do not show, increment, store, or transmit a like count.
- Keep the existing label and footer layout. Treat the heart emoji in the label as decorative for assistive technology.
- Respect `prefers-reduced-motion`: replace the travel animation with a brief, non-spatial visual acknowledgment.

## Implementation Boundary

Keep the interaction local to `components/Footer`. Use transient component state for active heart particles and CSS/Framer Motion already present in the project. Do not add a dependency, backend endpoint, analytics event, or persistent storage.

## Verification

- Click and keyboard activation each create one floating heart and remove it after the animation.
- Repeated clicks can animate independently without changing the footer's layout or creating a visible count.
- Reduced-motion preference avoids upward travel.
- Footer remains usable at narrow widths and the button has a visible focus style.
