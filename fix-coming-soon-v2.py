import pathlib

# Approach: Add a script tag to the Coming Soon page that hides header/footer
p = pathlib.Path('app/(frontend)/page.tsx')
old = p.read_text()

# Replace the opening div to add an id we can target
old_str = "export default async function ComingSoonPage() {\n  return ("
new_str = """export default async function ComingSoonPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .site-header, .footer, nav { display: none !important; }
      `}} />"""

old_close = """        <p style={{
          fontSize: '13px',
          color: 'var(--text-on-dark-tertiary)',
          marginTop: '4rem',
        }}>© 2026 The Financial Brief. All rights reserved.</p>
      </div>
    </div>
  )
}"""

new_close = """        <p style={{
          fontSize: '13px',
          color: 'var(--text-on-dark-tertiary)',
          marginTop: '4rem',
        }}>© 2026 The Financial Brief. All rights reserved.</p>
      </div>
    </div>
    </>
  )
}"""

content = old.replace(old_str, new_str).replace(old_close, new_close)
p.write_text(content)
print('page.tsx updated with inline style to hide header/footer')
