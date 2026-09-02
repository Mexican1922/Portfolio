"""Generate Valentine-Azolibe-CV.pdf.

    python scripts/generate_cv.py [-o public/Valentine-Azolibe-CV.pdf]

Everything that changes lives in the CONFIG block below, so adding a
certification or a role is an edit there rather than surgery on a binary.

Contact links render as brand marks instead of spelled-out URLs: the header
used to read "github.com/Mexican1922 - valentinecodes.vercel.app - ..." which
ate a full line. Marks are drawn as vector paths, so they stay sharp at any
zoom and add no image weight.
"""
import argparse
import math
import re

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

# ---------------------------------------------------------------- config ----

INK = '#111827'      # body text
ACCENT = '#7c3aed'   # violet, matching the portfolio's --theme-accent family
MUTED = '#4b5563'    # dates, locations
RULE = '#d1d5db'     # section underlines

NAME = 'Valentine Azolibe'
TITLE = 'Full-Stack Developer · React & Django · Co-Founder of Collan'
LOCATION = 'Lagos, Nigeria'
PHONE = '+234 704 949 5832'

# (icon, url, tooltip). Order is the order they appear.
LINKS = [
    ('email', 'mailto:valentine@collan.dev', 'valentine@collan.dev'),
    ('globe', 'https://valentine-azolibe.vercel.app', 'Portfolio'),
    ('github', 'https://github.com/Mexican1922', 'GitHub'),
    ('linkedin', 'https://www.linkedin.com/in/valentine-azolibe-45578b323', 'LinkedIn'),
    ('x', 'https://x.com/Vibe_with_val', 'X'),
]

SUMMARY = (
    'Full-stack developer and co-founder of Collan (collan.dev). 3+ years building production web '
    'applications for clients and startups: React and TypeScript on the frontend, Python and Django on '
    'the backend. Shipped e-commerce, fintech, and streaming products, including client sites live in '
    'production across Nigeria. Open to full-time remote opportunities.'
)

EXPERIENCE = [
    {
        'role': 'Co-Founder & Full-Stack Developer · Collan',
        'meta': 'Remote · November 2025 – Present · ',
        'meta_link': ('collan.dev', 'https://collan.dev'),
        'bullets': [
            [('Co-founded a social networking platform for techies with a community feed, project '
              'marketplace, live sessions, and real-time chat. Launched V1 in March 2026, crossed 1,000 '
              'users in the first two months, and is approaching 2,000; V2 and a mobile app are in '
              'development.', None)],
        ],
    },
    {
        'role': 'Full-Stack Developer (Freelance) · Self-Employed',
        'meta': 'Remote · January 2023 – Present',
        'meta_link': None,
        'bullets': [
            [('Built and shipped ', None),
             ('Fredan Textiles', 'https://fredantextiles.com'),
             (': a React + TypeScript storefront with a Django REST backend (products, orders, gallery, '
              'newsletter) that the owner runs entirely through the Django admin, live on a custom '
              'domain.', None)],
            [('Delivered production client sites including ', None),
             ('Kings Tech Solutions', 'https://kingstechsolutions.org'),
             (' (smart energy and security company operating across 12+ states) and ', None),
             ('Apex TechHub', 'https://apex-techhub.com'),
             (' (EdTech platform with integrated payments).', None)],
            [('Delivered a complete Squarespace site for ', None),
             ('Crestforge Construction', 'https://crestforgeconstruction.org'),
             (' in one weekend: hired on Friday with no prior platform experience, live by Sunday.', None)],
        ],
    },
    {
        'role': 'Frontend Developer Intern · Ibs Golden',
        'meta': 'Ikeja, Lagos · January 2025 – December 2025',
        'meta_link': None,
        'bullets': [
            [('Built frontend interfaces with a development team using modern React and '
              'component-driven architecture.', None)],
        ],
    },
]

PROJECTS = [
    [('UDA, music streaming platform', 'bold'),
     (' (2026): React + TypeScript frontend with a Django REST backend covering accounts, library, '
      'listening history, and a recommendation engine; full auth lifecycle with email verification; '
      'installable PWA. ', None),
     ('uda-obi.vercel.app', 'https://uda-obi.vercel.app')],
    [('PadiPay, fintech wallet PWA', 'bold'),
     (' (2026): mobile-first digital wallet covering money transfers, airtime, data, and bill payments '
      'across 14 typed screens with a dedicated service layer. ', None),
     ('naija-padipay.vercel.app', 'https://naija-padipay.vercel.app')],
    [('MeterMate, household energy dashboard', 'bold'),
     (' (2026): Next.js 15 + Supabase with real-time sync, household management, and payment '
      'approvals. ', None),
     ('naija-metermate.vercel.app', 'https://naija-metermate.vercel.app')],
    [('StockFlow, inventory SaaS', 'bold'),
     (' (2026): role-based access control, Firebase auth with Google sign-in, live Firestore sync, and '
      'English/Portuguese support. ', None),
     ('products-inventory-mgmt.vercel.app', 'https://products-inventory-mgmt.vercel.app')],
]

SKILLS = [
    ('Frontend:', ' React, TypeScript, Next.js, Vue.js, Tailwind CSS, Framer Motion'),
    ('Backend:', ' Python, Django, Django REST Framework, PostgreSQL, REST API design, '
                 'authentication & permissions'),
    ('Tools & platforms:', ' Git & GitHub, Vercel, Render, Firebase, Supabase, PWA, payment '
                           'integration, SEO'),
]

CERTIFICATIONS = [
    'The Complete React Course: React, Next.js, Redux and More · Udemy · 2025',
    'Fullstack Development · Aptech Academy · 2024',
]

# ----------------------------------------------------------------- icons ----
# 24x24 viewBox paths. SVG's y axis points down and the PDF's points up, so the
# renderer flips y while scaling.

ICONS = {
    'github': (
        'M12 .3C5.37.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61'
        '-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83'
        ' 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3'
        '-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24'
        ' 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22'
        '.7.83.58C20.56 22.09 24 17.59 24 12.3 24 5.67 18.63.3 12 .3Z'
    ),
    'linkedin': (
        'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h'
        '.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 110-4.13 2.06 '
        '2.06 0 010 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 '
        '1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z'
    ),
    'x': (
        'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 '
        '6.23ZM17.08 19.77h1.83L7.08 4.13H5.12Z'
    ),
    # A globe for the portfolio: outline plus one meridian and the equator.
    'globe': (
        'M12 1.5A10.5 10.5 0 1012 22.5 10.5 10.5 0 0012 1.5ZM12 3.3c1.9 0 3.7 3.6 3.7 8.7s-1.8 8.7-3.7 8.7'
        '-3.7-3.6-3.7-8.7S10.1 3.3 12 3.3ZM2.4 12h19.2M12 1.5v21'
    ),
    'email': (
        'M2 4.5h20c.55 0 1 .45 1 1v13c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1v-13c0-.55.45-1 1-1ZM1.6 5.4 12 13.2'
        ' 22.4 5.4'
    ),
}

# Marks that read best filled; the rest are stroked outlines.
FILLED = {'github', 'linkedin', 'x'}

_CMD = re.compile(r'[MmLlHhVvCcSsQqTtAaZz]')
_NUM = re.compile(r'[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?')
# Arc flags may be written without separators ("...0 110-4.13" is rot=0,
# large=1, sweep=1, x=0, y=-4.13), so arcs get their own scanner rather than a
# generic number split.
_ARC = re.compile(
    r'([-+]?[\d.]+)[,\s]*([-+]?[\d.]+)[,\s]*([-+]?[\d.]+)[,\s]*'
    r'([01])[,\s]*([01])[,\s]*([-+]?[\d.]+)[,\s]*([-+]?[\d.]+)'
)


def _arc_to_curves(x0, y0, rx, ry, rot, large, sweep, x1, y1):
    """SVG elliptical arc -> cubic bezier segments (endpoint parameterisation)."""
    if rx == 0 or ry == 0 or (x0 == x1 and y0 == y1):
        return [('L', x1, y1)]
    rx, ry = abs(rx), abs(ry)
    phi = math.radians(rot % 360)
    cos_p, sin_p = math.cos(phi), math.sin(phi)

    dx2, dy2 = (x0 - x1) / 2.0, (y0 - y1) / 2.0
    x1p = cos_p * dx2 + sin_p * dy2
    y1p = -sin_p * dx2 + cos_p * dy2

    # scale the radii up if they are too small to span the endpoints
    lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry)
    if lam > 1:
        s = math.sqrt(lam)
        rx, ry = rx * s, ry * s

    num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p
    den = rx * rx * y1p * y1p + ry * ry * x1p * x1p
    co = math.sqrt(max(num / den, 0))
    if large == sweep:
        co = -co
    cxp = co * rx * y1p / ry
    cyp = -co * ry * x1p / rx
    cx = cos_p * cxp - sin_p * cyp + (x0 + x1) / 2.0
    cy = sin_p * cxp + cos_p * cyp + (y0 + y1) / 2.0

    def angle(ux, uy, vx, vy):
        d = (math.hypot(ux, uy) * math.hypot(vx, vy))
        if d == 0:
            return 0.0
        c = max(-1.0, min(1.0, (ux * vx + uy * vy) / d))
        a = math.acos(c)
        return -a if (ux * vy - uy * vx) < 0 else a

    th0 = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry)
    dth = angle((x1p - cxp) / rx, (y1p - cyp) / ry,
                (-x1p - cxp) / rx, (-y1p - cyp) / ry)
    if not sweep and dth > 0:
        dth -= 2 * math.pi
    elif sweep and dth < 0:
        dth += 2 * math.pi

    segs = max(1, int(math.ceil(abs(dth) / (math.pi / 2))))
    out, step = [], dth / segs
    k = 4.0 / 3.0 * math.tan(step / 4.0)
    th = th0
    px, py = x0, y0
    for _ in range(segs):
        th1 = th + step
        cos0, sin0 = math.cos(th), math.sin(th)
        cos1, sin1 = math.cos(th1), math.sin(th1)

        def to_user(cs, sn):
            return (cos_p * rx * cs - sin_p * ry * sn + cx,
                    sin_p * rx * cs + cos_p * ry * sn + cy)

        ex, ey = to_user(cos1, sin1)
        d0x, d0y = (cos_p * -rx * sin0 - sin_p * ry * cos0,
                    sin_p * -rx * sin0 + cos_p * ry * cos0)
        d1x, d1y = (cos_p * -rx * sin1 - sin_p * ry * cos1,
                    sin_p * -rx * sin1 + cos_p * ry * cos1)
        out.append(('C', px + k * d0x, py + k * d0y,
                    ex - k * d1x, ey - k * d1y, ex, ey))
        px, py, th = ex, ey, th1
    return out


def parse_path(d):
    """Yield absolute ('M'|'L'|'C'|'Z', *coords) segments from SVG path data."""
    i, n = 0, len(d)
    cur = start = (0.0, 0.0)
    prev_c = None
    cmd = None
    while i < n:
        m = _CMD.match(d, i)
        if m:
            cmd = m.group(0)
            i = m.end()
            if cmd in 'Zz':
                yield ('Z',)
                cur = start
                prev_c = None
                continue
        if cmd is None:
            i += 1
            continue

        rel = cmd.islower()
        up = cmd.upper()

        if up == 'A':
            am = _ARC.match(d, i) or _ARC.search(d, i)
            if not am or am.start() > i + 2:
                i += 1
                continue
            i = am.end()
            rx, ry, rot = float(am.group(1)), float(am.group(2)), float(am.group(3))
            large, sweep = int(am.group(4)), int(am.group(5))
            ax, ay = float(am.group(6)), float(am.group(7))
            if rel:
                ax, ay = cur[0] + ax, cur[1] + ay
            for seg in _arc_to_curves(cur[0], cur[1], rx, ry, rot, large, sweep, ax, ay):
                yield seg
            cur, prev_c = (ax, ay), None
            continue

        need = {'M': 2, 'L': 2, 'H': 1, 'V': 1, 'C': 6, 'S': 4, 'Q': 4, 'T': 2}[up]
        vals = []
        while len(vals) < need:
            nm = _NUM.match(d, i)
            if not nm:
                break
            vals.append(float(nm.group(0)))
            i = nm.end()
            while i < n and d[i] in ', \t\r\n':
                i += 1
        if len(vals) < need:
            break

        if up == 'M':
            x, y = (cur[0] + vals[0], cur[1] + vals[1]) if rel else (vals[0], vals[1])
            yield ('M', x, y)
            cur = start = (x, y)
            cmd = 'l' if rel else 'L'   # subsequent pairs are implicit lineTos
        elif up == 'L':
            x, y = (cur[0] + vals[0], cur[1] + vals[1]) if rel else (vals[0], vals[1])
            yield ('L', x, y)
            cur = (x, y)
        elif up == 'H':
            x = cur[0] + vals[0] if rel else vals[0]
            yield ('L', x, cur[1])
            cur = (x, cur[1])
        elif up == 'V':
            y = cur[1] + vals[0] if rel else vals[0]
            yield ('L', cur[0], y)
            cur = (cur[0], y)
        elif up == 'C':
            a = [vals[j] + (cur[j % 2] if rel else 0) for j in range(6)]
            yield ('C', *a)
            prev_c = (a[2], a[3])
            cur = (a[4], a[5])
        elif up == 'S':
            a = [vals[j] + (cur[j % 2] if rel else 0) for j in range(4)]
            c1 = ((2 * cur[0] - prev_c[0], 2 * cur[1] - prev_c[1]) if prev_c else cur)
            yield ('C', c1[0], c1[1], a[0], a[1], a[2], a[3])
            prev_c = (a[0], a[1])
            cur = (a[2], a[3])
        if up not in 'CS':
            prev_c = None


def draw_icon(c, name, x, y, size, color):
    """Render a 24x24 icon path with its bottom-left corner at (x, y)."""
    s = size / 24.0
    path = c.beginPath()

    def pt(px, py):
        # SVG's y axis points down, the PDF's points up
        return x + px * s, y + (24 - py) * s

    for seg in parse_path(ICONS[name]):
        if seg[0] == 'M':
            path.moveTo(*pt(seg[1], seg[2]))
        elif seg[0] == 'L':
            path.lineTo(*pt(seg[1], seg[2]))
        elif seg[0] == 'C':
            path.curveTo(*pt(seg[1], seg[2]), *pt(seg[3], seg[4]), *pt(seg[5], seg[6]))
        elif seg[0] == 'Z':
            path.close()

    c.saveState()
    if name in FILLED:
        c.setFillColor(HexColor(color))
        c.drawPath(path, stroke=0, fill=1)
    else:
        c.setStrokeColor(HexColor(color))
        c.setLineWidth(1.6 * s)
        c.setLineJoin(1)
        c.setLineCap(1)
        c.drawPath(path, stroke=1, fill=0)
    c.restoreState()


# ---------------------------------------------------------------- layout ----

PAGE_W, PAGE_H = A4
MARGIN = 42
BODY_W = PAGE_W - 2 * MARGIN


def wrap(text, font, size, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        trial = f'{cur} {w}'.strip()
        if stringWidth(trial, font, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


class CV:
    def __init__(self, path):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.c.setTitle('Valentine Azolibe - CV')
        self.c.setAuthor(NAME)
        self.y = PAGE_H - MARGIN

    def text(self, s, font, size, color, x=MARGIN, leading=None):
        self.c.setFont(font, size)
        self.c.setFillColor(HexColor(color))
        self.c.drawString(x, self.y, s)
        self.y -= leading if leading is not None else size + 3

    def rule_heading(self, label):
        self.y -= 8
        self.c.setFont('Helvetica-Bold', 10.5)
        self.c.setFillColor(HexColor(ACCENT))
        self.c.drawString(MARGIN, self.y, label)
        self.y -= 4
        self.c.setStrokeColor(HexColor(RULE))
        self.c.setLineWidth(0.6)
        self.c.line(MARGIN, self.y, PAGE_W - MARGIN, self.y)
        self.y -= 11

    def rich(self, runs, x, width, size=9.5, leading=11.6):
        """Draw mixed plain/bold/linked runs, wrapping across lines."""
        cx, first = x, True
        for text, kind in runs:
            font = 'Helvetica-Bold' if kind == 'bold' else 'Helvetica'
            url = kind if kind and kind != 'bold' else None
            color = ACCENT if url else INK
            for word in re.findall(r'\S+\s*|\s+', text):
                w = stringWidth(word, font, size)
                if cx + w > x + width and not first and word.strip():
                    self.y -= leading
                    cx = x
                self.c.setFont(font, size)
                self.c.setFillColor(HexColor(color))
                self.c.drawString(cx, self.y, word)
                if url:
                    self.c.linkURL(url, (cx, self.y - 2, cx + w, self.y + size - 2),
                                   relative=0, thickness=0)
                cx += w
                first = False
        self.y -= leading

    def bullet(self, runs):
        self.c.setFont('Helvetica', 10)
        self.c.setFillColor(HexColor(INK))
        self.c.drawString(MARGIN, self.y, '–')
        self.rich(runs, MARGIN + 10, BODY_W - 10)

    def header(self):
        self.text(NAME, 'Helvetica-Bold', 21, INK, leading=24)
        self.text(TITLE, 'Helvetica-Bold', 11, ACCENT, leading=16)

        line = f'{LOCATION} · {PHONE}'
        self.c.setFont('Helvetica', 8.8)
        self.c.setFillColor(HexColor(MUTED))
        self.c.drawString(MARGIN, self.y, line)

        icon = 11.0
        gap = 9.0
        x = MARGIN + stringWidth(line, 'Helvetica', 8.8) + 12
        for name, url, tip in LINKS:
            draw_icon(self.c, name, x, self.y - 1.5, icon, ACCENT)
            self.c.linkURL(url, (x, self.y - 2, x + icon, self.y + icon - 2),
                           relative=0, thickness=0)
            x += icon + gap
        self.y -= 16

        self.c.setStrokeColor(HexColor(RULE))
        self.c.setLineWidth(0.8)
        self.c.line(MARGIN, self.y, PAGE_W - MARGIN, self.y)
        self.y -= 6

    def build(self):
        self.header()

        self.rule_heading('Summary')
        for ln in wrap(SUMMARY, 'Helvetica', 9.5, BODY_W):
            self.text(ln, 'Helvetica', 9.5, INK, leading=11.6)

        self.rule_heading('Experience')
        for job in EXPERIENCE:
            self.text(job['role'], 'Helvetica-Bold', 10, INK, leading=12)
            self.c.setFont('Helvetica', 8.8)
            self.c.setFillColor(HexColor(MUTED))
            self.c.drawString(MARGIN, self.y, job['meta'])
            if job['meta_link']:
                label, url = job['meta_link']
                mx = MARGIN + stringWidth(job['meta'], 'Helvetica', 8.8)
                self.c.setFillColor(HexColor(ACCENT))
                self.c.drawString(mx, self.y, label)
                self.c.linkURL(url, (mx, self.y - 2, mx + stringWidth(label, 'Helvetica', 8.8),
                                     self.y + 7), relative=0, thickness=0)
            self.y -= 12
            for b in job['bullets']:
                self.bullet(b)
            self.y -= 3

        self.rule_heading('Selected Projects')
        for p in PROJECTS:
            self.bullet(p)
            self.y -= 1

        self.rule_heading('Skills')
        for label, rest in SKILLS:
            self.rich([(label, 'bold'), (rest, None)], MARGIN, BODY_W)

        self.rule_heading('Certifications')
        for line in CERTIFICATIONS:
            self.text(line, 'Helvetica', 9.5, INK, leading=12)

        self.c.showPage()
        self.c.save()


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('-o', '--out', default='public/Valentine-Azolibe-CV.pdf')
    args = ap.parse_args()
    CV(args.out).build()
    print('wrote', args.out)
