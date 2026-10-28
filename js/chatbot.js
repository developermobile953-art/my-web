/**
 * Maosa Tech — simple rule-based chatbot widget
 */
(function () {
  // Detect base path (root vs services/)
  const inServices = window.location.pathname.includes('/services/');
  const base = inServices ? '../' : '';

  const responses = {
    greeting: {
      text: 'Hello! Welcome to Maosa Tech. How can I help you today?',
      options: [
        { label: 'Web Development', key: 'webdev' },
        { label: 'SEO Services', key: 'seo' },
        { label: 'Web Design', key: 'design' },
        { label: 'ICT Support', key: 'ict' },
        { label: 'Student PHP/MySQL Projects', key: 'student' },
        { label: 'Pricing', key: 'pricing' },
        { label: 'Contact / Location', key: 'contact' }
      ]
    },
    webdev: {
      text: 'We build custom, fast and responsive websites and web applications for businesses in Kenya.',
      link: base + 'services/web-development.html',
      linkLabel: 'View Web Development →',
      options: [
        { label: 'ICT Support', key: 'ict' },
        { label: 'Student Projects', key: 'student' },
        { label: 'Contact us', key: 'contact' },
        { label: 'Main menu', key: 'greeting' }
      ]
    },
    seo: {
      text: 'Our SEO service helps your business appear on Google when people in Nairobi and Kenya search for what you offer.',
      link: base + 'services/seo.html',
      linkLabel: 'View SEO Services →',
      options: [
        { label: 'Web Development', key: 'webdev' },
        { label: 'Contact us', key: 'contact' },
        { label: 'Main menu', key: 'greeting' }
      ]
    },
    design: {
      text: 'We design clean, modern and mobile-friendly websites that look professional and are easy to use.',
      link: base + 'services/web-design.html',
      linkLabel: 'View Web Design →',
      options: [
        { label: 'Web Development', key: 'webdev' },
        { label: 'Contact us', key: 'contact' },
        { label: 'Main menu', key: 'greeting' }
      ]
    },
    ict: {
      text: 'ICT Support covers helpdesk, hardware & software, networking, Microsoft 365, backups and day-to-day systems assistance for businesses in Nairobi.',
      link: base + 'services/ict-support.html',
      linkLabel: 'Go to ICT Support →',
      options: [
        { label: 'Student Projects', key: 'student' },
        { label: 'Contact / WhatsApp', key: 'contact' },
        { label: 'Main menu', key: 'greeting' }
      ]
    },
    student: {
      text: 'We create custom PHP & MySQL student projects for college and university final-year work — with documentation and guidance for your presentation.',
      link: base + 'services/student-projects.html',
      linkLabel: 'View Student Projects →',
      options: [
        { label: 'ICT Support', key: 'ict' },
        { label: 'Contact us', key: 'contact' },
        { label: 'Main menu', key: 'greeting' }
      ]
    },
    pricing: {
      text: 'Starter websites from KES 25,000. Business websites from KES 55,000. ICT support from KES 3,000/visit. Student projects — custom quote. See full pricing on the homepage.',
      link: base + 'index.html#pricing',
      linkLabel: 'View Pricing →',
      options: [
        { label: 'Contact for quote', key: 'contact' },
        { label: 'Main menu', key: 'greeting' }
      ]
    },
    contact: {
      text: 'You can reach us by phone/WhatsApp: +254 798 458 270, email: benjaminmosweta@gmail.com, or visit the contact page. We are based in Nairobi, Kenya.',
      link: base + 'contact.html',
      linkLabel: 'Open Contact Page →',
      options: [
        { label: 'ICT Support', key: 'ict' },
        { label: 'Student Projects', key: 'student' },
        { label: 'Main menu', key: 'greeting' }
      ]
    }
  };

  function createWidget() {
    const style = document.createElement('style');
    style.textContent = `
      #mt-chat-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 9998;
        width: 56px; height: 56px; border-radius: 50%;
        background: #b45309; color: #fff; border: none; cursor: pointer;
        box-shadow: 0 4px 14px rgba(0,0,0,.35);
        display: flex; align-items: center; justify-content: center;
        transition: transform .2s, background .2s;
      }
      #mt-chat-btn:hover { background: #d97706; transform: scale(1.05); }
      #mt-chat-panel {
        position: fixed; bottom: 92px; right: 24px; z-index: 9999;
        width: 340px; max-width: calc(100vw - 32px); max-height: 480px;
        background: #0f172a; border: 1px solid #334155; border-radius: 12px;
        box-shadow: 0 12px 40px rgba(0,0,0,.45);
        display: none; flex-direction: column; overflow: hidden;
        font-family: Inter, system-ui, sans-serif;
      }
      #mt-chat-panel.open { display: flex; }
      #mt-chat-header {
        background: #1e293b; padding: 14px 16px; display: flex;
        align-items: center; justify-content: space-between;
        border-bottom: 1px solid #334155;
      }
      #mt-chat-header h3 { margin: 0; font-size: 14px; font-weight: 600; color: #fff; }
      #mt-chat-header span { font-size: 11px; color: #94a3b8; }
      #mt-chat-close {
        background: none; border: none; color: #94a3b8; cursor: pointer;
        font-size: 20px; line-height: 1; padding: 0 4px;
      }
      #mt-chat-close:hover { color: #fff; }
      #mt-chat-messages {
        flex: 1; overflow-y: auto; padding: 16px; display: flex;
        flex-direction: column; gap: 12px; min-height: 200px; max-height: 320px;
      }
      .mt-msg { max-width: 90%; padding: 10px 12px; border-radius: 10px; font-size: 13px; line-height: 1.45; }
      .mt-msg.bot { background: #1e293b; color: #e2e8f0; align-self: flex-start; }
      .mt-msg.user { background: #b45309; color: #fff; align-self: flex-end; }
      .mt-msg a { color: #fbbf24; text-decoration: underline; display: inline-block; margin-top: 6px; }
      .mt-options { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
      .mt-opt {
        background: #1e293b; border: 1px solid #475569; color: #e2e8f0;
        font-size: 12px; padding: 6px 10px; border-radius: 20px; cursor: pointer;
        transition: background .15s, border-color .15s;
      }
      .mt-opt:hover { background: #334155; border-color: #b45309; color: #fff; }
      #mt-chat-footer {
        padding: 10px 16px; border-top: 1px solid #334155;
        font-size: 11px; color: #64748b; text-align: center;
      }
      #mt-chat-footer a { color: #b45309; }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'mt-chat-btn';
    btn.setAttribute('aria-label', 'Open chat');
    btn.innerHTML = `<svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`;

    const panel = document.createElement('div');
    panel.id = 'mt-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Maosa Tech chat');
    panel.innerHTML = `
      <div id="mt-chat-header">
        <div>
          <h3>Maosa Tech Assistant</h3>
          <span>Usually replies instantly</span>
        </div>
        <button id="mt-chat-close" aria-label="Close chat">&times;</button>
      </div>
      <div id="mt-chat-messages"></div>
      <div id="mt-chat-footer">
        Prefer a person? <a href="https://wa.me/254798458270" target="_blank" rel="noopener">WhatsApp us</a>
      </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    const messages = panel.querySelector('#mt-chat-messages');

    function addBot(key) {
      const data = responses[key] || responses.greeting;
      const div = document.createElement('div');
      div.className = 'mt-msg bot';
      let html = data.text;
      if (data.link) {
        html += `<br><a href="${data.link}">${data.linkLabel || 'Learn more →'}</a>`;
      }
      if (data.options && data.options.length) {
        html += '<div class="mt-options">';
        data.options.forEach(opt => {
          html += `<button type="button" class="mt-opt" data-key="${opt.key}">${opt.label}</button>`;
        });
        html += '</div>';
      }
      div.innerHTML = html;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;

      div.querySelectorAll('.mt-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          const k = btn.getAttribute('data-key');
          addUser(btn.textContent);
          setTimeout(() => addBot(k), 300);
        });
      });
    }

    function addUser(text) {
      const div = document.createElement('div');
      div.className = 'mt-msg user';
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    btn.addEventListener('click', () => {
      panel.classList.toggle('open');
      if (panel.classList.contains('open') && messages.children.length === 0) {
        addBot('greeting');
      }
    });
    panel.querySelector('#mt-chat-close').addEventListener('click', () => {
      panel.classList.remove('open');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
