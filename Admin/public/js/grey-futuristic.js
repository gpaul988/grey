/* ============================================================================
   GREY INFOTECH — FUTURISTIC ADMIN ENHANCER  (additive, dependency-free)
   - Command palette (Ctrl/Cmd + K)
   - Cursor spotlight (desktop, pointer: fine)
   - Magnetic ripple on primary buttons
   - Live-badge flash when SSE updates counters
   Respects prefers-reduced-motion. Never throws; fully guarded.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia &&
    window.matchMedia('(pointer: fine)').matches;

  var BASE = (window.__GREY_ADMIN_BASE__ || '/admin').replace(/\/$/, '');

  // ── Command palette destinations (kept generic so missing routes 302 nicely)
  var COMMANDS = [
    { icon: 'ri-dashboard-line',      label: 'Dashboard',        href: BASE + '/dashboard' },
    { icon: 'ri-mail-line',           label: 'Submissions',      href: BASE + '/submissions' },
    { icon: 'ri-customer-service-2-line', label: 'Tickets',      href: BASE + '/tickets' },
    { icon: 'ri-chat-3-line',         label: 'Messages',         href: BASE + '/messages' },
    { icon: 'ri-group-line',          label: 'Users',            href: BASE + '/users' },
    { icon: 'ri-shopping-bag-line',   label: 'Store · Products', href: BASE + '/store/products' },
    { icon: 'ri-file-list-3-line',    label: 'Store · Orders',   href: BASE + '/store/orders' },
    { icon: 'ri-settings-3-line',     label: 'Settings',         href: BASE + '/settings' },
    { icon: 'ri-user-settings-line',  label: 'My Profile',       href: BASE + '/profile' },
    { icon: 'ri-logout-box-r-line',   label: 'Log out',          href: '/logout' }
  ];

  /* ── Command palette ────────────────────────────────────────────────────── */
  function buildPalette() {
    var backdrop = document.createElement('div');
    backdrop.className = 'greyfx-cmdk-backdrop';
    backdrop.innerHTML =
      '<div class="greyfx-cmdk" role="dialog" aria-modal="true" aria-label="Command palette">' +
        '<input type="text" placeholder="Search admin…  (type a page name)" aria-label="Search admin">' +
        '<div class="greyfx-cmdk-list"></div>' +
        '<div class="greyfx-cmdk-hint"><span><span class="greyfx-kbd">↑↓</span> navigate</span>' +
        '<span><span class="greyfx-kbd">↵</span> open</span>' +
        '<span><span class="greyfx-kbd">esc</span> close</span></div>' +
      '</div>';
    document.body.appendChild(backdrop);

    var input = backdrop.querySelector('input');
    var list = backdrop.querySelector('.greyfx-cmdk-list');
    var active = 0, filtered = COMMANDS.slice();

    function render() {
      list.innerHTML = '';
      if (!filtered.length) {
        list.innerHTML = '<div class="greyfx-cmdk-empty">No matches</div>';
        return;
      }
      filtered.forEach(function (cmd, i) {
        var a = document.createElement('a');
        a.className = 'greyfx-cmdk-item' + (i === active ? ' active' : '');
        a.href = cmd.href;
        a.innerHTML = '<i class="' + cmd.icon + '"></i><span>' + cmd.label + '</span>';
        a.addEventListener('mouseenter', function () { active = i; paint(); });
        list.appendChild(a);
      });
    }
    function paint() {
      Array.prototype.forEach.call(list.children, function (el, i) {
        el.classList.toggle('active', i === active);
      });
      var el = list.children[active];
      if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
    }
    function filter() {
      var q = input.value.trim().toLowerCase();
      filtered = !q ? COMMANDS.slice() :
        COMMANDS.filter(function (c) { return c.label.toLowerCase().indexOf(q) > -1; });
      active = 0; render();
    }
    function open() {
      backdrop.classList.add('open');
      input.value = ''; filter(); input.focus();
      document.body.style.overflow = 'hidden';
    }
    function close() {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
    function go() {
      var cmd = filtered[active];
      if (cmd) window.location.href = cmd.href;
    }

    input.addEventListener('input', filter);
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });
    backdrop.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, filtered.length - 1); paint(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); paint(); }
      else if (e.key === 'Enter') { e.preventDefault(); go(); }
    });

    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        backdrop.classList.contains('open') ? close() : open();
      }
    });

    render();
    return { open: open };
  }

  /* ── Cursor spotlight ───────────────────────────────────────────────────── */
  function buildSpotlight() {
    if (!finePointer || reduceMotion) return;
    var dot = document.createElement('div');
    dot.className = 'greyfx-spotlight';
    document.body.appendChild(dot);
    var rx = 0, ry = 0, x = 0, y = 0, raf;
    window.addEventListener('pointermove', function (e) { rx = e.clientX; ry = e.clientY; });
    (function loop() {
      x += (rx - x) * 0.12; y += (ry - y) * 0.12;
      dot.style.setProperty('--gx', x + 'px');
      dot.style.setProperty('--gy', y + 'px');
      raf = requestAnimationFrame(loop);
    })();
  }

  /* ── Ripple on primary buttons ──────────────────────────────────────────── */
  function bindRipple() {
    if (reduceMotion) return;
    document.addEventListener('pointerdown', function (e) {
      var btn = e.target.closest('.btn-primary');
      if (!btn) return;
      var rect = btn.getBoundingClientRect();
      var span = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      span.style.cssText =
        'position:absolute;border-radius:50%;pointer-events:none;' +
        'width:' + size + 'px;height:' + size + 'px;' +
        'left:' + (e.clientX - rect.left - size / 2) + 'px;' +
        'top:' + (e.clientY - rect.top - size / 2) + 'px;' +
        'background:rgba(255,255,255,.35);transform:scale(0);opacity:.7;' +
        'transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .6s;';
      if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      btn.appendChild(span);
      requestAnimationFrame(function () { span.style.transform = 'scale(2.6)'; span.style.opacity = '0'; });
      setTimeout(function () { span.remove(); }, 650);
    });
  }

  /* ── Live-badge flash: watch SSE-updated counters & glow on change ──────── */
  function watchBadges() {
    if (reduceMotion) return;
    var nodes = document.querySelectorAll('[data-badge]');
    Array.prototype.forEach.call(nodes, function (node) {
      var last = node.textContent;
      var obs = new MutationObserver(function () {
        if (node.textContent !== last) {
          last = node.textContent;
          node.classList.remove('greyfx-flash');
          void node.offsetWidth;          // reflow to restart animation
          node.classList.add('greyfx-flash');
        }
      });
      obs.observe(node, { childList: true, characterData: true, subtree: true });
    });
  }

  function init() {
    try { buildPalette(); } catch (e) {}
    try { buildSpotlight(); } catch (e) {}
    try { bindRipple(); } catch (e) {}
    try { watchBadges(); } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
