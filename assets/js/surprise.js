document.addEventListener('DOMContentLoaded',function(){var WM=window.WM,$=function(i){return document.getElementById(i)},cfg=WM.readLink(),stages=document.querySelectorAll('.stage');
function show(id){stages.forEach(function(s){var on=s.id===id;s.hidden=!on;s.classList.toggle('show',on)});scrollTo(0,0);var h=$(id).querySelector('h1,h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
if(!cfg){document.body.dataset.theme='party';show('st-error');return}
var th=WM.theme(document.body,cfg.theme),cols=th.colors,fx=new WM.Fx($('fx')),url=location.href;
document.title='A birthday surprise for '+cfg.to+' \u2013 WishMagic';WM.deco($('deco'),cfg.theme,cfg.anims,1);
$('w-hi').textContent='Hi '+cfg.to+'!';$('w-from').textContent=cfg.from+' made a birthday surprise just for you.';
$('msg').textContent=cfg.msg||'Wishing you a day filled with joy, laughter and everything you love.';$('msg-from').textContent='With love, '+cfg.from;
$('date').textContent=cfg.date?'\uD83C\uDF82 '+WM.fmtDate(cfg.date):'';$('wa').href=WM.waUrl(cfg.to,url);
function reveal(){var n=$('name');n.replaceChildren();n.setAttribute('aria-label',cfg.to);Array.from(cfg.to).forEach(function(ch,i){var s=WM.el('span','ltr',ch===' '?'\u00a0':ch);s.setAttribute('aria-hidden','true');s.style.animationDelay=i*70+'ms';n.appendChild(s)});
 if(cfg.anims.indexOf('confetti')>-1)fx.confetti(cols,110);if(cfg.anims.indexOf('fireworks')>-1)fx.fireworks(cols,5);if(th.deco==='hearts')fx.hearts(18)}
function reset(){$('giftbtn').classList.remove('open');$('cakewrap').classList.remove('out');$('msgbox').hidden=false;$('wishbox').hidden=true;$('actions').hidden=true;$('wished').textContent='';fx.clear()}
function start(){reset();show('st-welcome')}
var target=cfg.schedule?new Date(+cfg.date.slice(0,4),+cfg.date.slice(5,7)-1,+cfg.date.slice(8,10)).getTime():0;
function tick(){var d=Math.max(0,target-Date.now());if(!d){clearInterval(tk);start();return}var p=function(n){return String(n).padStart(2,'0')};
 $('cd-d').textContent=Math.floor(d/864e5);$('cd-h').textContent=p(Math.floor(d%864e5/36e5));$('cd-m').textContent=p(Math.floor(d%36e5/6e4));$('cd-s').textContent=p(Math.floor(d%6e4/1e3))}
var tk;if(target&&Date.now()<target){$('wait-for').textContent='Opens at midnight on '+WM.fmtDate(cfg.date)+' (your device\u2019s local time).';show('st-wait');tick();tk=setInterval(tick,1000)}else start();
$('open').onclick=function(){show('st-gift')};
$('giftbtn').onclick=function(){var b=this;if(b.classList.contains('open'))return;b.classList.add('open');setTimeout(function(){show('st-name');reveal()},WM.reduced?200:1100)};
$('to-cake').onclick=function(){fx.clear();show('st-cake')};
$('wish').onclick=function(){$('msgbox').hidden=true;$('wishbox').hidden=false;$('blow').focus()};
$('blow').onclick=function(){$('cakewrap').classList.add('out');$('wishbox').hidden=true;$('wished').textContent='Your wish is sealed. Happy Birthday, '+cfg.to+'! \u2728';var r=$('cakewrap').getBoundingClientRect();fx.burst(r.left+r.width/2,r.top+r.height*.2,cols,60);fx.confetti(cols,80);$('actions').hidden=false};
$('replay').onclick=start;
$('copy').onclick=function(){WM.copy(url).then(function(ok){$('status').textContent=ok?'Link copied.':'Copy failed. Copy the address from your browser.'})};
var mb=$('music');if(cfg.music){mb.hidden=false;mb.onclick=function(){var ok=WM.Music.on?WM.Music.stop():WM.Music.start();if(!ok){$('status').textContent='Audio could not start on this device.';return}mb.setAttribute('aria-pressed',String(WM.Music.on));mb.textContent=WM.Music.on?'\u266A Music: on':'\u266A Music: off'}}});
