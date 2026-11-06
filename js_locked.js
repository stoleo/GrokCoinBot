/* Menu items that open at launch (Tokens, MCP): hovering shows a pill next to the cursor,
   same as the feature pill on the home page. They are not clickable. */

const pill = document.createElement('div');
pill.setAttribute('aria-hidden', 'true');
pill.style.cssText = 'position:fixed;z-index:40;left:0;top:0;display:flex;align-items:center;gap:7px;padding:7px 13px 7px 11px;border-radius:9999px;background:#fff;color:#0a0a0a;'
  + "font:600 13px 'Geist',system-ui,sans-serif;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .16s;box-shadow:0 8px 24px rgba(0,0,0,.35)";
pill.innerHTML = '<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="#0a0a0a" stroke-width="1.8" stroke-linecap="round"/><rect x="3" y="7" width="10" height="7.5" rx="2" fill="#0a0a0a"/></svg>'
  + 'Opens at launch <span style="font-weight:400;color:#55575c">· Join the whitelist to be first</span>';
document.body.appendChild(pill);

for (const a of document.querySelectorAll('a.lock')) {
  a.addEventListener('pointermove', e => {
    // keep the pill inside the window near the right edge
    const x = Math.min(e.clientX + 16, innerWidth - pill.offsetWidth - 8);
    pill.style.transform = `translate(${x}px,${e.clientY + 18}px)`;
    pill.style.opacity = 1;
  });
  a.addEventListener('pointerleave', () => { pill.style.opacity = 0; });
}
