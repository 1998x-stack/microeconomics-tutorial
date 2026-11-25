(()=>{'use strict';
const out=(root,key,v)=>root.querySelectorAll('[data-out="'+key+'"]').forEach(el=>{el.textContent=String(v)});
const n=(x,d=2)=>Number(x.toFixed(d)).toString();
const hook=(root,controls,update)=>{controls.forEach(c=>c.addEventListener('input',update));controls.forEach(c=>c.addEventListener('change',update));update()};
document.querySelectorAll('[data-lab="market"]').forEach(root=>{
 const p=root.querySelector('[data-price]'),d=root.querySelector('[data-demand]'),s=root.querySelector('[data-supply]'),v=root.querySelector('[data-result]');
 const update=()=>{let P=+p.value,D=+d.value,S=+s.value,qd=Math.max(0,120+D-2*P),qs=Math.max(0,20+S+3*P),pe=(100+D-S)/5,qe=120+D-2*pe;root.querySelectorAll('[data-output]').forEach(e=>{e.textContent=({price:P,demand:D,supply:S})[e.dataset.output]});let gap=qs-qd;v.textContent='价格'+P+'：需求'+qd+'，供给'+qs+'；'+(gap>0?'过剩'+gap:gap<0?'短缺'+(-gap):'恰好出清')+'。均衡 P*='+n(pe,1)+'，Q*='+n(qe,1)+'。'};
 hook(root,[p,d,s],update);
});
document.querySelectorAll('[data-lab="elasticity"]').forEach(root=>{
 const p=root.querySelector('[data-price]'),v=root.querySelector('[data-result]');
 const update=()=>{const P=+p.value,Q=120-2*P,e=2*P/Q,rev=P*Q;out(root,'price',P);v.textContent='P='+P+'元，Q='+Q+'件，需求点弹性绝对值 |ε|='+n(e,3)+'（'+(e<1?'缺乏弹性':e>1?'富有弹性':'单位弹性')+'），TR='+rev+'元。'};
 hook(root,[p],update);
});
document.querySelectorAll('[data-lab="tax"]').forEach(root=>{
 const t=root.querySelector('[data-tax]'),v=root.querySelector('[data-result]');
 const update=()=>{const a=+t.value,pc=20+.6*a,pp=20-.4*a,q=80-1.2*a,rev=a*q,dwl=.6*a*a;out(root,'tax',a);v.textContent='税率 t='+a+'元，买方价 Pc='+n(pc,2)+'，卖方净价 Pp='+n(pp,2)+'，成交 Q='+n(q,2)+'，税收收入='+n(rev,2)+'，无谓损失='+n(dwl,2)+'。'};
 hook(root,[t],update);
});
document.querySelectorAll('[data-lab="utility"]').forEach(root=>{
 const p=root.querySelector('[data-px]'),v=root.querySelector('[data-result]');
 const update=()=>{const price=+p.value,x=6/price,y=6;out(root,'px',price);v.textContent='Px='+price+'元，最优 x='+n(x,3)+'、y='+y+'，总支出='+n(price*x+y,2)+'，U=√(xy)='+n(Math.sqrt(x*y),3)+'。'};
 hook(root,[p],update);
});
document.querySelectorAll('[data-lab="indifference"]').forEach(root=>{
 const input=root.querySelector('[data-income]'),v=root.querySelector('[data-result]');
 const update=()=>{const I=+input.value,x=I/4,y=I/2;out(root,'income',I);v.textContent='预算 I='+I+'元，最优 x='+n(x,3)+'、y='+n(y,3)+'，U=√(xy)='+n(Math.sqrt(x*y),3)+'，预算支出='+I+'。'};
 hook(root,[input],update);
});
document.querySelectorAll('[data-lab="decomposition"]').forEach(root=>{
 const price=root.querySelector('[data-new-price]'),method=root.querySelector('[data-method]'),v=root.querySelector('[data-result]');
 const update=()=>{const p=+price.value,old=3,final=6/p,u=Math.sqrt(18),h=method.value==='hicks';const middle=h?Math.sqrt(18/p):(3*p+6)/(2*p);const budget=h?2*Math.sqrt(18*p):3*p+6;out(root,'new-price',p);v.textContent=(h?'Hicks 希克斯':'Slutsky 斯勒茨基')+'：A_x=3，B_x='+n(middle,3)+'，C_x='+n(final,3)+'；替代效应 '+(middle-old>=0?'+':'')+n(middle-old,3)+'，收入效应 '+(final-middle>=0?'+':'')+n(final-middle,3)+'，总效应 '+(final-old>=0?'+':'')+n(final-old,3)+'；虚拟补偿预算='+n(budget,3)+'元。'};
 hook(root,[price,method],update);
});
document.querySelectorAll('[data-lab="production"]').forEach(root=>{
 const L=root.querySelector('[data-labor]'),v=root.querySelector('[data-result]');
 const update=()=>{const l=+L.value,q=3*l*l-0.1*l*l*l,ap=l?q/l:0,mp=6*l-0.3*l*l;out(root,'labor',l);const stage=l===0?'尚无投入，产量为 0':(mp>ap?'MP>AP，AP 仍在上升':mp<ap?'MP<AP，AP 已在下降':'MP=AP，AP 达到最高');v.textContent='L='+l+'：Q='+n(q,2)+'，AP='+n(ap,2)+'，MP='+n(mp,2)+'；'+stage+'。'+(mp<0?'已进入负边际报酬，总产量下降。':'');};
 hook(root,[L],update);
});
document.querySelectorAll('[data-lab="cost"]').forEach(root=>{
 const Q=root.querySelector('[data-qty]'),v=root.querySelector('[data-result]');
 const update=()=>{const q=+Q.value,tvc=20*q-3*q*q+0.5*q*q*q,tc=100+tvc,mc=20-6*q+1.5*q*q,atc=tc/q,avc=tvc/q;out(root,'qty',q);const rel=mc<atc?'MC<ATC，ATC 仍在下降':mc>atc?'MC>ATC，ATC 已上升':'MC=ATC，ATC 到最低点';const relv=mc<avc?'AVC 仍在下降':mc>avc?'AVC 已上升':'AVC 到最低点';v.textContent='Q='+n(q,1)+'：TC='+n(tc,1)+'，MC='+n(mc,1)+'，ATC='+n(atc,1)+'，AVC='+n(avc,1)+'；'+rel+'；'+relv+'。';};
 hook(root,[Q],update);
});
document.querySelectorAll('[data-lab="firm"]').forEach(root=>{
 const P=root.querySelector('[data-price]'),v=root.querySelector('[data-result]');
 const update=()=>{const p=+P.value;out(root,'price',p);let txt;if(p<=20){txt='P='+p+'：Q*=0（P ≤ AVC 最低点 20），利润=-200，短期应停产。';}else{const q=(p-20)/10,tc=200+20*q+5*q*q,profit=p*q-tc,atc=tc/q,avc=20+5*q;txt='P='+p+'：Q*='+n(q,2)+'，AVC='+n(avc,1)+'，ATC='+n(atc,1)+'，利润='+n(profit,0)+'；'+(profit>=0?'盈利，继续生产。':'亏损但 P>AVC，继续生产。');}v.textContent=txt;};
 hook(root,[P],update);
});
document.querySelectorAll('[data-lab="surplus"]').forEach(root=>{
 const A=root.querySelector('[data-demand]'),v=root.querySelector('[data-result]');
 const update=()=>{const a=+A.value,p=(a+20)/2,q=(a-20)/2,cs=0.5*(a-p)*q,ps=0.5*(p-20)*q;out(root,'a',a);v.textContent='均衡 Q*='+n(q,1)+'，P*='+n(p,1)+'；CS='+n(cs,0)+'，PS='+n(ps,0)+'，总剩余='+n(cs+ps,0)+'。';};
 hook(root,[A],update);
});
document.querySelectorAll('[data-lab="monopoly"]').forEach(root=>{
 const M=root.querySelector('[data-mc]'),v=root.querySelector('[data-result]');
 const update=()=>{const mc=+M.value,qm=(100-mc)/2,pm=(100+mc)/2,profit=(pm-mc)*qm,qc=100-mc,dwl=0.5*(pm-mc)*(qc-qm);out(root,'mc',mc);v.textContent='Qm='+n(qm,1)+'，Pm='+n(pm,1)+'，利润='+n(profit,0)+'；竞争产量 Qc='+n(qc,1)+'，无谓损失='+n(dwl,0)+'。';};
 hook(root,[M],update);
});
document.querySelectorAll('[data-lab="monopolistic"]').forEach(root=>{
 const A=root.querySelector('[data-demand]'),v=root.querySelector('[data-result]');
 const update=()=>{const a=+A.value,q=(a-8)/8,p=a-3*q,tc=64+8*q+q*q,profit=p*q-tc;out(root,'a',a);v.textContent='需求截距 A='+a+'：短期 q='+n(q,2)+'，P='+n(p,2)+'，ATC='+n(tc/q,2)+'，经济利润='+n(profit,1)+'；'+(a>40?'正利润吸引新企业进入。':a<40?'亏损促使企业退出。':'与长期均衡一致（利润为零）。')+'长期：q=4，P=28。';};
 hook(root,[A],update);
});
})();