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
 const l=root.querySelector('[data-labor]'),k=root.querySelector('[data-capital]'),v=root.querySelector('[data-result]');
 const update=()=>{const L=+l.value,K=+k.value,Q=2*Math.pow(L*K,2/3),mpl=(4/3)*Math.pow(L,-1/3)*Math.pow(K,2/3),mpk=(4/3)*Math.pow(K,-1/3)*Math.pow(L,2/3);out(root,'labor',L);out(root,'capital',K);v.textContent='L='+L+'人，K='+K+'台：Q='+n(Q,3)+'，MP_L='+n(mpl,3)+'，MP_K='+n(mpk,3)+'。两种投入同时翻倍，Q变为原来的 '+n(Math.pow(2,4/3),3)+' 倍。';};
 hook(root,[l,k],update);
});
document.querySelectorAll('[data-lab="costs"]').forEach(root=>{
 const q=root.querySelector('[data-output]'),v=root.querySelector('[data-result]');
 const update=()=>{const x=+q.value,fc=32,vc=x**3-6*x*x+15*x,tc=fc+vc,avc=vc/x,afc=fc/x,atc=tc/x,mc=3*x*x-12*x+15;out(root,'output',x);v.textContent='q='+n(x,2)+'，FC='+fc+'，VC='+n(vc,2)+'，TC='+n(tc,2)+'；AVC='+n(avc,2)+'，AFC='+n(afc,2)+'，ATC='+n(atc,2)+'，MC='+n(mc,2)+'。';};
 hook(root,[q],update);
});
document.querySelectorAll('[data-lab="competition"]').forEach(root=>{
 const p=root.querySelector('[data-firm-price]'),v=root.querySelector('[data-result]');
 const update=()=>{const P=+p.value;out(root,'firm-price',P);if(P<6){v.textContent='P='+P+'，低于最低AVC=6：短期停产 q=0，仍承担固定成本32，利润=-32。';return;}const q=2+Math.sqrt((P-3)/3),vc=q**3-6*q*q+15*q,tc=32+vc,pi=P*q-tc,atc=tc/q;let state=P===6?'关停临界点':P<15?'继续生产但经济亏损':P===15?'零经济利润':'获得正经济利润';v.textContent='P='+P+'，最优q='+n(q,3)+'，ATC='+n(atc,3)+'，利润π='+n(pi,3)+'；'+state+'。';};
 hook(root,[p],update);
});
document.querySelectorAll('[data-lab="entry"]').forEach(root=>{
 const a=root.querySelector('[data-demand-intercept]'),v=root.querySelector('[data-result]');
 const update=()=>{const A=+a.value,P=15,Q=A-4*P,qFirm=4,N=Q/qFirm;out(root,'demand-intercept',A);v.textContent='长期价格P='+P+'，总需求Q='+Q+'，每家企业生产'+qFirm+'批，行业需要'+N+'家企业。相对A=100，需求增加'+(A-100)+'，长期进入'+(N-10)+'家。';};
 hook(root,[a],update);
});
document.querySelectorAll('[data-lab="monopoly"]').forEach(root=>{
 const c=root.querySelector('[data-monopoly-mc]'),v=root.querySelector('[data-result]');
 const update=()=>{const mc=+c.value,qm=(100-mc)/2,pm=(100+mc)/2,qc=100-mc,cs=.5*qm*(100-pm),ps=(pm-mc)*qm,ts=cs+ps,dwl=.5*(pm-mc)*(qc-qm);out(root,'monopoly-mc',mc);v.textContent='垄断：Q='+n(qm,2)+'、P='+n(pm,2)+'；竞争：Q='+n(qc,2)+'、P='+mc+'；CS='+n(cs,2)+'，PS='+n(ps,2)+'，总剩余='+n(ts,2)+'，DWL='+n(dwl,2)+'。';};
 hook(root,[c],update);
});
document.querySelectorAll('[data-lab="discrimination"]').forEach(root=>{
 const mode=root.querySelector('[data-pricing]'),v=root.querySelector('[data-result]');
 const update=()=>{if(mode.value==='segment'){v.textContent='分组定价：A组Q=30、P=50；B组Q=40、P=40；总销量70，收入3100，消费者剩余850，生产者剩余1700，总剩余2550。';}else{v.textContent='统一价格：两组P=43.33，A组Q=36.67、B组Q=33.33，总销量70，收入3033.33，消费者剩余950，生产者剩余1633.33，总剩余2583.33。';}};
 hook(root,[mode],update);
});

})();
