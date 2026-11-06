/* Presence beacon: this tab tells the worker it is open, with a random id for the tab and the page path, nothing about the person.
   The worker answers with how long to wait before the next hello (60 s when the site is quiet, up to 10 minutes when it is
   packed), so a crowd of 100k tabs stays cheap. The first hello of a session counts as a visit. */

const store = (k, v) => { try { if (v !== undefined) sessionStorage.setItem(k, v); return sessionStorage.getItem(k); } catch { return null; } };
const sid = store('gk_sid') || store('gk_sid', crypto.randomUUID().replace(/-/g, '').slice(0, 24)) || Math.random().toString(36).slice(2, 14);
let first = !store('gk_seen'); store('gk_seen', '1');
let next = 60, timer = 0, last = 0;

const ping = async () => {
  clearTimeout(timer);
  if (document.hidden) return;
  last = Date.now();
  try {
    const r = await fetch('/api/ping', {method: 'POST', keepalive: true, headers: {'content-type': 'application/json'}, body: JSON.stringify({sid, page: location.pathname, new: first})});
    first = false;
    const d = r.ok ? await r.json().catch(() => null) : null;
    if (d && d.next >= 30) next = Math.min(d.next, 900);
  } catch {}
  timer = setTimeout(ping, next * 1000);
};
ping();
// a tab coming back to the front says hello again if its wait is mostly over
addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - last > next * 500) ping(); });
