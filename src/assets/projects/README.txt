Media folders — one per project (folder name = URL slug).

Drop images/videos in and they appear automatically on that project's page:

  cover.png (or cover.jpg / cover.mp4 ...)  -> full-width hero image
                                               right under the animated motif
  anything-else.png                         -> Gallery section
                                               (filename becomes the caption;
                                               dashes/underscores -> spaces)

Supported: png jpg jpeg webp gif svg mp4 webm
Sorted alphabetically. Empty folder = no gallery, nothing breaks.

NOTE: files are bundled at build time — after adding media, commit + push
(Vercel rebuilds) for it to appear on the live site. Local dev picks new
files up automatically.

Folders:
  bloom/ contextrot/ devtrack/ imc-prosperity/ keeptrack/ lumin-ai/
  lunar-ice/ mzhub/ sentinel/ solv-ai/ spectra-scan/ tokenscope/
