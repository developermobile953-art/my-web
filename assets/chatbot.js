(function(){
  const panel=document.getElementById('mt-chat-panel');
  const launcher=document.getElementById('mt-chat-launcher');
  const close=document.getElementById('mt-chat-close');
  const messages=document.getElementById('mt-chat-messages');
  const form=document.getElementById('mt-chat-form');
  const input=document.getElementById('mt-chat-input');
  if(!panel||!launcher||!messages||!form||!input)return;
  const links={
    support:{label:'ICT Support',url:'services.html#ict-support',text:'Our ICT Support section covers computer and printer troubleshooting, network/Wi-Fi, software setup, backups and technical support.'},
    student:{label:'Student PHP/MySQL Projects',url:'services.html#student-projects',text:'We offer learning-focused support for PHP/MySQL student projects, database design, login/registration, dashboards, CRUD modules, reports, debugging and documentation.'},
    maps:{label:'Google Maps / Directions',url:'https://www.google.com/maps/dir/?api=1&destination=Nairobi+CBD%2C+Nairobi%2C+Kenya',text:'Open Google Maps for directions to Nairobi CBD. This is a location reference, not a confirmed walk-in office address; please contact us before visiting.'},
    whatsapp:{label:'WhatsApp',url:'https://wa.me/254798458270?text=Hello%20Maosa%20Tech%2C%20I%20need%20help%20with%20your%20services.',text:'Continue the conversation with our team on WhatsApp.'}
  };
  function toggle(open){panel.classList.toggle('is-open',open);panel.setAttribute('aria-hidden',String(!open));launcher.setAttribute('aria-expanded',String(open));if(open)input.focus();}
  function addMessage(text,who){const node=document.createElement('div');node.className='mt-chat-message'+(who==='user'?' user':'');node.textContent=text;messages.appendChild(node);messages.scrollTop=messages.scrollHeight;}
  function addLink(key){const item=links[key];if(!item)return;addMessage(item.label,'user');const node=document.createElement('div');node.className='mt-chat-message';node.appendChild(document.createTextNode(item.text+' '));const a=document.createElement('a');a.href=item.url;a.textContent=key==='maps'?'Open Google Maps':key==='whatsapp'?'Message us on WhatsApp':'View service details';if(key==='whatsapp'||key==='maps'){a.target='_blank';a.rel='noopener noreferrer';}node.appendChild(a);messages.appendChild(node);messages.scrollTop=messages.scrollHeight;if(key==='support'||key==='student'){window.location.href=item.url;}}
  function reply(message){const q=message.toLowerCase();if(/student|php|mysql|database project|school project|college project/.test(q)){addLink('student');return;}if(/ict|computer|printer|wifi|wi-fi|network|technical support|it support|software install/.test(q)){addLink('support');return;}if(/map|direction|location|where are you|visit/.test(q)){addLink('maps');return;}if(/whatsapp|human|person|contact|talk|call|phone|price|cost|quote/.test(q)){addMessage('For a specific quote or to speak to the team, WhatsApp is the quickest option.');addLink('whatsapp');return;}addMessage('I can guide you to ICT Support, student PHP/MySQL projects, Google Maps directions, or WhatsApp. Please choose one of the buttons below.');}
  launcher.addEventListener('click',()=>toggle(!panel.classList.contains('is-open')));close.addEventListener('click',()=>toggle(false));
  panel.querySelectorAll('[data-chat]').forEach(button=>button.addEventListener('click',()=>addLink(button.getAttribute('data-chat'))));
  form.addEventListener('submit',function(e){e.preventDefault();const value=input.value.trim();if(!value)return;addMessage(value,'user');input.value='';reply(value);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('is-open'))toggle(false);});
})();
