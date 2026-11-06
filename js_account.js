/* Who is signed in, and how far they got. Kept in this browser only (no database):
   the X handle from sign in, and which whitelist steps they finished. */

const get = k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export const getUser = () => { const u = get('gk_x'); return u && u.handle ? u : null; };
export const setUser = u => set('gk_x', u);
export const clearUser = () => set('gk_x', null);
export const getSteps = handle => get('gk_steps_' + handle.toLowerCase()) || {};
export const setSteps = (handle, s) => set('gk_steps_' + handle.toLowerCase(), s);

// whitelisted = every step done, the reply included; the card shows once the repost is done
export const isListed = s => ['follow', 'like', 'rt', 'card', 'reply'].every(k => s[k] === 'done');
export const hasCard = s => ['follow', 'like', 'rt'].every(k => s[k] === 'done');

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

// round picture: the X profile photo when we have one, else the first letter
export const avatar = (u, size) => u.pfp
  ? `<img class="av" src="${esc(u.pfp)}" alt="" width="${size}" height="${size}" referrerpolicy="no-referrer">`
  : `<span class="av" style="width:${size}px;height:${size}px;font-size:${Math.round(size * .42)}px">${esc(u.handle[0].toUpperCase())}</span>`;

// top right: picture and handle of whoever is signed in, links to their profile page;
// once they are whitelisted the "Join the whitelist" button goes away
export function mountChip() {
  const acts = document.querySelector('.top .acts'); if (!acts) return;
  acts.querySelector('.mechip')?.remove();
  const u = getUser();
  const join = acts.querySelector('a.btn.solid[href$="whitelist.html"]');
  if (join) join.style.display = u && isListed(getSteps(u.handle)) ? 'none' : '';
  if (!u) return;
  const a = document.createElement('a');
  a.className = 'mechip'; a.href = 'profile.html'; a.title = 'Your profile';
  a.innerHTML = `${avatar(u, 30)}<span>@${esc(u.handle)}</span>`;
  acts.appendChild(a);
}
