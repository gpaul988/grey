/**
 * Shared Grey InfoTech email signature — the SAME signature used by the AI
 * estimator auto-response (see pages/api/submit-form.ts). Centralised so every
 * transactional email (contact, partnership, etc.) renders an identical,
 * on-brand footer.
 */

export const GREY_SIGNATURE_HTML = `
  <div style="margin-top:20px; padding-top:15px; font-size:10px; color:#555;">
    <strong style="font-size:16px; color:#14b8a6;">Grey InfoTech Team</strong><br/><br/>
    <a href="mailto:hello@greyinfotech.com.ng" style="color:#0072c6;">hello@greyinfotech.com.ng</a><br/>
    9 Godfery Tata Close, Rumuewhara New Layout, Off Eneka - Igwuruta Road,<br/>
    Port Harcourt, Rivers State, Nigeria<br/>
    +234 802 809 5571<br/>
    <a href="https://www.greyinfotech.com.ng" style="color:#0072c6;">www.greyinfotech.com.ng</a>
    <br/><br/>
    <span>Follow us:</span>
    <a href="https://facebook.com/greyinfotechltd" style="margin:0 8px;">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" width="20" height="20" style="vertical-align:middle;"/>
    </a>
    <a href="https://twitter.com/greyinfoechltd" style="margin:0 8px;">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" width="20" height="20" style="vertical-align:middle;"/>
    </a>
    <a href="https://instagram.com/greyinfotechltd" style="margin:0 8px;">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" width="20" height="20" style="vertical-align:middle;"/>
    </a>
    <a href="https://linkedin.com/company/greyinfotechltd" style="margin:0 8px;">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="20" height="20" style="vertical-align:middle;"/>
    </a>
  </div>
`;

export const GREY_SIGNATURE_TEXT = `
Grey InfoTech Team

hello@greyinfotech.com.ng
9 Godfery Tata Close, Rumuewhara New Layout, Off Eneka - Igwuruta Road, Port Harcourt, Rivers State, Nigeria
+234 802 809 5571
www.greyinfotech.com.ng

Follow us:
Facebook: https://facebook.com/greyinfotechltd
Twitter: https://twitter.com/greyinfoechltd
Instagram: https://instagram.com/greyinfotechltd
LinkedIn: https://linkedin.com/company/greyinfotechltd
`;
