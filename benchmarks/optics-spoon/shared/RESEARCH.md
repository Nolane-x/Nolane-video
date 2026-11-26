# Research and Claim Ledger — The Spoon That Bends

**Snapshot:** 2026-11-26  
**Status:** primary textbook sources identified; scene-level review still required.

## Claims

### C1 — Refraction changes the direction of light at a boundary

When light passes from one transparent medium into another, its propagation direction generally changes if it crosses the interface at an oblique angle and the refractive indices differ.

Source: OpenStax Physics, 16.2 Refraction  
https://openstax.org/books/physics/pages/16-2-refraction

### C2 — Snell's law relates the angles to the refractive indices

n1 sin(theta1) = n2 sin(theta2), with each angle measured from the normal to the interface.

Source: OpenStax College Physics, 25.3 The Law of Refraction  
https://openstax.org/books/college-physics/pages/25-3-the-law-of-refraction

### C3 — Water and air indices for a representative visible-light example

OpenStax lists fresh water at 20°C as n = 1.333 and air at 0°C, 1 atm as n = 1.000293. These are representative values, not universal constants for every wavelength and condition.

Source: OpenStax College Physics, 25.3, Table 25.1  
https://openstax.org/books/college-physics/pages/25-3-the-law-of-refraction

For the diagram, use approximate rounded labels n_water ≈ 1.333 and n_air ≈ 1.0003.

### C4 — The ray exiting water bends away from the normal

Because n_water > n_air, Snell's law gives a larger refracted angle in air than the incident angle in water for a ray that exits obliquely.

Calculation for the example:
- theta_water = 40°
- sin(theta_air) = (1.333 / 1.0003) × sin(40°)
- theta_air ≈ 58.9°

The ray remains on the correct side of the normal and is not in the total-internal-reflection case.

### C5 — An underwater object appears closer to the surface

At a plane refracting interface, the image of a submerged object appears closer to the surface than the actual object position. A straight rod partially submerged in water can therefore appear bent at the surface.

Source: OpenStax University Physics Volume 3, 2.3 Images Formed by Refraction  
https://openstax.org/books/university-physics-volume-3/pages/2-3-images-formed-by-refraction

## Visual correctness rules

1. Draw the water-air boundary horizontal for the canonical diagram.
2. Draw the normal perpendicular to the boundary at the point of incidence.
3. Draw the incident ray inside water and the refracted ray in air.
4. Label theta_water = 40° and theta_air ≈ 58.9° from the normal.
5. Add the backward extension only after the outgoing ray exists. Use dashed styling to distinguish it from a physical light path.
6. Put the apparent point closer to the surface than the actual underwater point.
7. In the real scene, the spoon remains physically straight. Only its apparent submerged part is displaced.

## Remaining research

- Verify the selected ray/eye geometry in every renderer against the OpenStax diagram.
- Ensure the chosen exact ray geometry is visually consistent with the apparent spoon alignment.
- If narration discusses a particular color/wavelength, record that explicitly; otherwise do not overstate the precision of refractive-index values.
- Add further authoritative references only when the benchmark script introduces a new claim.
