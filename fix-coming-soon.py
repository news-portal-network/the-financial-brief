import pathlib

# 1. Update page.tsx — add coming-soon-page class
p = pathlib.Path('app/(frontend)/page.tsx')
old = p.read_text()
new = old.replace(
    'className={`${playfair.variable} ${dmSans.variable}`}',
    'className={`coming-soon-page ${playfair.variable} ${dmSans.variable}`}'
)
p.write_text(new)
print('page.tsx updated')

# 2. Update styles.css — hide header/footer on coming soon page
s = pathlib.Path('app/(frontend)/styles.css')
css = s.read_text()
css += """

/* Coming Soon page — hide header, nav, footer */
body:has(.coming-soon-page) header,
body:has(.coming-soon-page) nav,
body:has(.coming-soon-page) footer {
  display: none !important;
}
"""
s.write_text(css)
print('styles.css updated')
