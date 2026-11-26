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
document.querySelectorAll('[data-lab="cournot"]').forEach(root=>{
 const N=root.querySelector('[data-firms]'),v=root.querySelector('[data-result]');
 const update=()=>{const nf=+N.value,q=120/(nf+1),Q=120*nf/(nf+1),p=120/(nf+1);out(root,'firms',nf);v.textContent='厂商数 n='+nf+'：每家 q='+n(q,1)+'，总产量 Q='+n(Q,1)+'，价格 P='+n(p,1)+'，行业总利润='+n(p*Q,0)+'。'+(nf===1?'（垄断）':nf===2?'（古诺双头）':'')+(nf>=5?'厂商越多，结果越趋近竞争：P→0、Q→120。':'');};
 hook(root,[N],update);
});
document.querySelectorAll('[data-lab="repeated"]').forEach(root=>{
 const D=root.querySelector('[data-discount]'),v=root.querySelector('[data-result]');
 const update=()=>{const d=+D.value/100,coop=10/(1-d),dev=12+4*d/(1-d);out(root,'discount',D.value);v.textContent='贴现因子 δ='+n(d,2)+'：坚持合作现值='+n(coop,1)+'，背叛现值='+n(dev,1)+'；临界值 δ*=(12−10)/(12−4)=0.25，当前'+(d>=0.25?'δ≥δ*，触发策略能使合作维持。':'δ<δ*，短期诱惑压倒长期合作，合作难以维持。')+'。';};
 hook(root,[D],update);
});
document.querySelectorAll('[data-lab="externality"]').forEach(root=>{
 const T=root.querySelector('[data-tax]'),v=root.querySelector('[data-result]');
 const update=()=>{const t=+T.value,q=(80-t)/2,p=100-q,rev=t*q,dwl=(t-20)*(t-20)/4;out(root,'tax',t);v.textContent='税率 t='+t+'：成交 Q='+n(q,1)+'，买方价 P='+n(p,1)+'，税收收入='+n(rev,1)+'，无谓损失='+n(dwl,1)+'；'+(t<20?'税率低于外部成本 20，产量仍高于社会最优 30。':t>20?'税率高于外部成本 20，产量低于社会最优 30。':'恰好等于单位外部成本 20，产量回到社会最优 30，无谓损失为 0。')};
 hook(root,[T],update);
});
document.querySelectorAll('[data-lab="publicgood"]').forEach(root=>{
 const M=root.querySelector('[data-mc]'),v=root.querySelector('[data-result]');
 const update=()=>{const mc=+M.value,eff=(20-mc)/2,priv=Math.max(0,12-mc),gap=eff-priv;out(root,'mc',mc);v.textContent='边际成本 MC='+mc+'：有效数量 x*='+n(eff,1)+'，私人供给 x='+n(priv,1)+'，缺口='+n(gap,1)+'。'+(gap>0?'私人供给低于有效水平，存在自由搭车导致的供给不足。':'两者一致。')};
 hook(root,[M],update);
});
document.querySelectorAll('[data-lab="lemons"]').forEach(root=>{
 const F=root.querySelector('[data-plum]'),v=root.querySelector('[data-result]');
 const update=()=>{const f=+F.value/100,pooled=100+140*f,plums=pooled>=200;out(root,'plum',F.value);v.textContent='好车占比 '+F.value+'%：买方愿出的期望价 =100+140×'+n(f,2)+'='+n(pooled,1)+'；'+(plums?'高于好车卖方保留价 200，两类车都成交。':'低于好车卖方保留价 200（临界值约 71.4%），好车退出，市场只剩差车（逆向选择）。')};
 hook(root,[F],update);
});
document.querySelectorAll('[data-lab="redistribution"]').forEach(root=>{
 const T=root.querySelector('[data-tax]'),v=root.querySelector('[data-result]');
 const update=()=>{const t=+T.value,q=40-t/2,rev=40*t-t*t/2,eb=t*t/4;out(root,'tax',t);v.textContent='税率 t='+t+'：成交 Q='+n(q,1)+'，税收收入='+n(rev,1)+'，超额负担='+n(eb,1)+'；'+(t<40?'收入仍随税率上升，超额负担缓慢增加。':t>40?'税率已过峰值 40，收入反而下降，但超额负担继续加速上升。':'收入达到峰值 800，超额负担为 400。')};
 hook(root,[T],update);
});
document.querySelectorAll('[data-lab="labor"]').forEach(root=>{
 const A=root.querySelector('[data-productivity]'),v=root.querySelector('[data-result]');
 const update=()=>{const a=+A.value,L=(a-40)/20,w=(a+40)/2;out(root,'productivity',a);v.textContent='生产率参数 A='+a+'：劳动需求 VMPL='+a+'−10L，均衡就业 L='+n(L,1)+'，工资 w='+n(w,1)+'；'+(a>100?'生产率提高使劳动需求上移，就业与工资同向上升。':a<100?'生产率下降使劳动需求下移，就业与工资同向下降。':'对应正文的教学示例。')};
 hook(root,[A],update);
});
document.querySelectorAll('[data-lab="prospect"]').forEach(root=>{
 const X=root.querySelector('[data-outcome]'),L=root.querySelector('[data-lambda]'),v=root.querySelector('[data-result]');
 const update=()=>{const x=+X.value,l=+L.value,g=Math.pow(x,0.88),loss=-l*g;out(root,'outcome',x);out(root,'lambda',l);v.textContent='x='+x+'，λ='+n(l,2)+'：收益价值 v('+x+')='+n(g,1)+'，损失价值 v(−'+x+')='+n(loss,1)+'；损失约为收益的 '+n(l,2)+' 倍。'+(l>1?'损失厌恶：损失一侧更陡。':l===1?'损失与收益对称：损失厌恶消失。':'')};
 hook(root,[X,L],update);
});
document.querySelectorAll('[data-lab="insurance"]').forEach(root=>{
 const P=root.querySelector('[data-prob]'),v=root.querySelector('[data-result]');
 const update=()=>{const p=+P.value/100,W=100,L=50,eu=(1-p)*Math.sqrt(W)+p*Math.sqrt(W-L),ce=eu*eu,fair=p*L,rp=(W-p*L)-ce,maxp=W-ce;out(root,'prob',P.value);v.textContent='p='+P.value+'%：公平保费 '+n(fair,2)+' 万元，E[U]='+n(eu,3)+'，确定等价 CE='+n(ce,3)+' 万元，风险溢价≈'+n(rp,3)+' 万元，最大可接受保费≈'+n(maxp,3)+' 万元。'};
 hook(root,[P],update);
});
document.querySelectorAll('[data-lab="platform"]').forEach(root=>{
 const S=root.querySelector('[data-split]'),v=root.querySelector('[data-result]');
 const al=60,aA=5,aB=8,eA=0.6,eB=0.3,det=1-eA*eB,T=12;
 const sides=pa=>{const pb=T-pa,NA=(al-aA*pa+eA*(al-aB*pb))/det,NB=(al-aB*pb+eB*(al-aA*pa))/det;return{pb:pb,NA:NA,NB:NB,profit:pa*NA+pb*NB}};
 let best=null;for(let x=0;x<=T;x+=0.25){const r=sides(x);if(!best||r.profit>best.profit)best={pa:x,pb:r.pb,NA:r.NA,NB:r.NB,profit:r.profit}}
 const update=()=>{const s=+S.value,r=sides(s);out(root,'split',s);v.textContent='P_A='+s+'，P_B='+r.pb+'：买方参与 N_A≈'+n(r.NA,1)+'，卖方参与 N_B≈'+n(r.NB,1)+'，平台利润≈'+n(r.profit,1)+'。利润最高的分配：P_A≈'+n(best.pa,2)+'、P_B≈'+n(best.pb,2)+'，利润≈'+n(best.profit,1)+'。'};
 hook(root,[S],update);
});
document.querySelectorAll('[data-lab="personalized"]').forEach(root=>{
 const G=root.querySelector('[data-groups]'),v=root.querySelector('[data-result]');
 const w=[12,11,10,9,8,7,6,5,4,3,2,1];
 const stats=g=>{const n=w.length;let profit=0,units=0,wtp=0;for(let k=0;k<g;k++){const lo=Math.floor(k*n/g),hi=Math.floor((k+1)*n/g);const s=w.slice(lo,hi);let bp=0,bc=0;for(const p of s){const c=s.filter(x=>x>=p).length;if(p*c>bp){bp=p*c;bc=c}}profit+=bp;units+=bc;wtp+=s.slice(0,bc).reduce((a,b)=>a+b,0)}return{profit:profit,units:units,cs:wtp-profit}};
 const update=()=>{const g=+G.value,r=stats(g);out(root,'groups',g);v.textContent='组数 g='+g+'：企业利润='+r.profit+'，售出 '+r.units+' 件，消费者剩余='+n(r.cs,1)+'。'+(g===1?'（单一统一价）':g===12?'（完全个性化：总剩余几乎全被攫取）':'')};
 hook(root,[G],update);
});
document.querySelectorAll('[data-lab="welfare"]').forEach(root=>{
 const T=root.querySelector('[data-tax]'),v=root.querySelector('[data-result]');
 const update=()=>{const t=+T.value,pc=20+0.6*t,pp=20-0.4*t,q=80-1.2*t,cs=0.5*(60-pc)*q,ps=0.5*(pp+20/3)*q,rev=t*q,dwl=0.6*t*t,tot=cs+ps+rev;out(root,'tax',t);v.textContent='t='+t+'：买方价 Pc='+n(pc,1)+'，卖方净价 Pp='+n(pp,1)+'，成交 Q='+n(q,1)+'；CS='+n(cs,1)+'，PS='+n(ps,1)+'，税收='+n(rev,1)+'，无谓损失='+n(dwl,1)+'，CS+PS+税收='+n(tot,1)+'。'};
 hook(root,[T],update);
});
document.querySelectorAll('[data-lab="marginal"]').forEach(root=>{
 const U=root.querySelector('[data-units]'),v=root.querySelector('[data-result]'),mb=[90,70,50,30],mc=[25,35,45,55];
 const update=()=>{const u=+U.value;let cum=0;for(let i=0;i<u;i++)cum+=mb[i]-mc[i];out(root,'units',u);let s='投入 '+u+' 单位：累计净收益 '+cum+' 元';if(u>0)s+='，第 '+u+' 单位的边际净收益 '+(mb[u-1]-mc[u-1])+' 元';if(u<4){const x=mb[u]-mc[u];s+='；下一单位边际净收益 '+(x>0?'+':'')+x+' 元，'+(x>0?'仍值得追加。':'已不值得追加。')}else s+='；第四单位起累计净收益转为下降，应停在 3 单位。';v.textContent=s};
 hook(root,[U],update);
});
document.querySelectorAll('[data-lab="ppf"]').forEach(root=>{
 const A=root.querySelector('[data-food]'),v=root.querySelector('[data-result]'),B=a=>10-0.1*a*a;
 const update=()=>{const a=+A.value;out(root,'food',a);let s='食物 A='+a+'：设备最多 '+n(B(a),1);if(a<10)s+='；再增产 1 单位食物需放弃 '+n(B(a)-B(a+1),1)+' 单位设备。';else s+='；已到食物产量上界，继续增产将超出当前资源与技术。';v.textContent=s};
 hook(root,[A],update);
});
})();