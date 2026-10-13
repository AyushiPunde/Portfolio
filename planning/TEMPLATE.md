# Portfolio Website Template - 2D Animator & Motion Designer Portfolio

Playful dark navy portfolio for a 2D animator, motion designer and video editor (Emily) with a dotted-grid background, glowing purple and lime blobs, twinkling star sparkles and bold rounded headings. Features an animated 'Hey, I'm EMILY' hero with Watch Showreel and View Projects buttons, a showreel section with a taped-on retro synthwave city video frame, Featured Work cards (2D Animation, Motion Graphics, Animated Short, Music Video), a software Toolkit strip, an About Me block with stats and a nav for Home, Projects, About, Blog and Contact. Fully phone responsive.

> Generated from this template's own files. Read THIS instead of exploring the tree — it already says where everything is.

## Where the copy lives

This template has **no content module** — the copy is inline in the section components below. Read the sections you will rewrite in **one parallel batch** (several `Read` calls in the same turn cost one round trip), then edit them. Do not read them one per turn, and skip any section the brief does not change.

## Imagery — 8 file(s) shipped

### Photos of a person — ASK before you do anything with these

These show the template's sample model, not the user. "Reuse the imagery" does NOT apply to a face: a portfolio or personal brand site showing someone else is the one place silent reuse fails them. Ask **once** (AskUser) whether to:

1. use their own photo — they can attach it in the chat (recommended)
2. generate a portrait for them
3. keep the template's photo

Do not silently keep someone else's face, and do not silently generate one.

- `public/img/hero-character-cutout.png`

### All other imagery

These ARE the design the user picked. **Reuse them.** Generating a replacement set is the most expensive thing in this workflow and makes the result look nothing like the preview they chose. Generate at most 2, only when the brief names a subject the existing art plainly cannot show, and keep the filename.

Never `Read` an image: it returns base64 and tells you nothing the filename does not.

| file | bytes |
| --- | --- |
| `public/favicon.svg` | 338 |
| `public/img/hero-character-cutout.png` | 3,897,264 |
| `public/img/project-1.png` | 422,436 |
| `public/img/project-2.png` | 357,291 |
| `public/img/project-3.png` | 545,254 |
| `public/img/project-4.png` | 497,024 |
| `public/img/showreel-poster.png` | 379,714 |
| `public/og-image.jpg` | 74,758 |

## Sections (11)

Open only what you change.

- `src/components/CornerMarks.tsx` (1,109 B)
- `src/components/Cursor.tsx` (1,787 B)
- `src/components/Doodles.tsx` (4,187 B)
- `src/components/MagneticButton.tsx` (1,191 B)
- `src/sections/About.tsx` (7,014 B)
- `src/sections/Footer.tsx` (4,472 B)
- `src/sections/Hero.tsx` (6,209 B)
- `src/sections/Nav.tsx` (1,700 B)
- `src/sections/Projects.tsx` (11,514 B)
- `src/sections/Showreel.tsx` (4,755 B)
- `src/sections/Skills.tsx` (3,404 B)

## Placeholder brand: "Emily Carter" — 16 occurrence(s) in 5 file(s)

It is hardcoded outside the content module too, in several spellings:

- `Emily Carter` ×9
- `emilycarter` ×2
- `EMILY` ×2
- `Emily` ×3

Replace **every spelling in ONE command** (fill each `<…>`; order matters — longest first), then confirm with the grep, which must print nothing:

```
grep -rlE 'Emily Carter|emilycarter|EMILY|Emily' src index.html | xargs sed -i -e 's/Emily Carter/<Full Name>/g' -e 's/emilycarter/<fullname, lowercase, no spaces>/g' -e 's/EMILY/<FIRST NAME, UPPERCASE>/g' -e 's/Emily/<First name>/g'
grep -rniE 'emily|carter' src index.html
```

Never replace it occurrence by occurrence, or one spelling per turn — that is a tool call each.

- `index.html` ×16
- `src/sections/Footer.tsx` ×4
- `src/sections/Hero.tsx` ×2
- `src/sections/About.tsx` ×2
- `src/sections/Nav.tsx` ×1

## How to edit

- **One change per file per turn.** Rewrite a section with ONE Edit covering all its copy, or `Write` the whole file — these are small.
- Several Edits to the **same** file in one turn conflict: the first lands, the rest fail as "modified since last read" and must be retried.
- Editing **different** files in parallel is fine, and the fast way.

## Keep

- The palette, type scale, spacing and layout — that is what was chosen.
- The shipped imagery and its framing.

## Replace

- Every visible string: names, headings, body copy, stats, contact details.
- The placeholder brand this template was built around — a site still carrying it has failed.
- `index.html` title/description and `public/og-image.*` so the page does not advertise the template's own subject.