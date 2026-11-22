#!/usr/bin/env python3
"""Exact assertions for hypothetical microeconomic teaching models. No dependencies."""
from math import isclose, sqrt

def eq(a,b): assert isclose(a,b,abs_tol=1e-10,rel_tol=1e-10), (a,b)
def Qd(p): return 120-2*p
def Qs(p): return 20+3*p

# Chapters 03–06: demand, supply, midpoint elasticity and revenue.
eq(Qd(20),80); eq(Qs(20),80)
for p,q,elasticity,revenue in [(20,80,.5,1600),(30,60,1,1800),(40,40,2,1600)]:
    eq(Qd(p),q); eq(2*p/q,elasticity); eq(p*q,revenue)
arc=((-20)/70)/(10/25)
eq(arc,-5/7)

# Chapter 07: binding price constraints, tax incidence, receipts, DWL.
assert Qd(15)-Qs(15)==25
assert Qs(25)-Qd(25)==25
for t,pc,pp,q,rev,dwl in [(0,20,20,80,0,0),(5,23,18,74,370,15),(10,26,16,68,680,60)]:
    eq(pc,20+.6*t); eq(pp,20-.4*t); eq(q,80-1.2*t)
    eq(Qd(pc),q); eq(Qs(pp),q); eq(pc-pp,t)
    eq(rev,t*q); eq(dwl,.5*t*(80-q))

# Chapter 08: discrete TU and a separate two-good Cobb–Douglas model.
tu=lambda x:12*x-x*x
assert [tu(i)-tu(i-1) for i in range(1,7)]==[11,9,7,5,3,1]
def marshall(p,I=12): return I/(2*p),I/2
eq(marshall(2)[0],3); eq(marshall(2)[1],6); eq(sqrt(3*6),sqrt(18))
eq(marshall(1)[0],6); eq(marshall(1)[1],6)

# Chapter 09: budget tangency, MRS, and parallel income expansion.
eq(6/3,2)
eq(2*3+6,12)
eq(marshall(2,16)[0],4)
eq(marshall(2,16)[1],8)

# Chapter 10: Hicks / Slutsky compensation and differential equation.
u=sqrt(18)
xh=yh=u
xs=ys=4.5
eq(xh*yh,18)
eq(xh+yh,2*u)
eq(xs+ys,9)
eq((xh-3)+(6-xh),3)
eq((xs-3)+(6-xs),3)
eq(-1.5,-.75-3*.25)
for p in [1,1.25,1.5,1.75,2]:
    xc=6/p
    xh=sqrt(18/p)
    xs=(3*p+6)/(2*p)
    eq((xh-3)+(xc-xh),xc-3)
    eq((xs-3)+(xc-xs),xc-3)
    eq(xh*sqrt(18*p),18)
    eq((xs*p)+(3*p+6)/2,3*p+6)

# Chapter 11: production function, marginal products, isoquant and returns to scale.
def production(L,K): return 2*(L*K)**(2/3)
def mpl(L,K): return (4/3)*L**(-1/3)*K**(2/3)
def mpk(L,K): return (4/3)*K**(-1/3)*L**(2/3)
eq(production(8,8),32)
eq(mpl(8,8),8/3); eq(mpk(8,8),8/3)
eq(production(16,8)/production(8,8),2**(2/3))
eq(production(16,16)/production(8,8),2**(4/3))
eq((64/2)**(1.5),64)  # Q=32 isoquant: L*K=64.
assert mpl(16,8)<mpl(8,8)<mpl(4,8)

# Chapter 12: cost accounting and the shared short-run cost function.
def vc(q): return q**3-6*q*q+15*q
def tc(q): return 32+vc(q)
def mc(q): return 3*q*q-12*q+15
def avc(q): return vc(q)/q
def atc(q): return tc(q)/q
eq(1200-850,350)                # accounting profit, model currency units/year
eq(1200-850-250-150,-50)        # economic profit
eq(avc(3),6); eq(mc(3),6)
eq(atc(4),15); eq(mc(4),15)
eq(tc(4),60); eq(vc(4),28)
eq(mc(2),3)

# Chapter 13: competitive firm's upward-MC supply and shutdown decision.
def comp_choice(price):
    if price<6: return 0.0, -32.0
    q=2+sqrt((price-3)/3)
    return q, price*q-tc(q)
q,profit=comp_choice(5); eq(q,0); eq(profit,-32)
q,profit=comp_choice(6); eq(q,3); eq(profit,-32)
q,profit=comp_choice(8); eq(q,2+sqrt(5/3)); eq(profit,-25.69668517088065)
q,profit=comp_choice(15); eq(q,4); eq(profit,0)
q,profit=comp_choice(18); eq(q,2+sqrt(5)); eq(profit,12.360679774997877)
assert comp_choice(8)[1] > comp_choice(5)[1]  # operating loss is smaller than shutdown loss.

# Chapter 14: constant-cost industry endpoint and competitive surplus example.
for A,quantity,firms in [(100,40,10),(120,60,15)]:
    eq(A-4*15,quantity); eq(quantity/4,firms)
eq(80-40,20+0.5*40)
eq(.5*40*(80-40),800)            # consumer surplus
eq(.5*40*(40-20),400)            # producer surplus
eq(800+400,1200)

# Chapter 15: single-price monopoly, Lerner index, welfare and third-degree prices.
qm=(100-20)/2; pm=100-qm; qc=100-20
eq(qm,40); eq(pm,60); eq(qc,80)
eq((pm-20)/pm,2/3); eq(1/(pm/qm),2/3)
eq(.5*qm*(100-pm),800)           # monopoly consumer surplus
eq((pm-20)*qm,1600)              # monopoly producer surplus
eq(.5*(pm-20)*(qc-qm),800)       # monopoly deadweight loss
eq(.5*qc*(100-20),3200)          # competitive total surplus
# Uniform-price two-segment benchmark.
pu=130/3; qau=80-pu; qbu=120-2*pu
eq(qau+qbu,70)
reu=pu*70
csu=.5*qau*(80-pu)+.5*qbu*(60-pu)
psu=reu-20*70
eq(reu,9100/3); eq(csu,950); eq(psu,4900/3)
# Third-degree discrimination: MR_A=MR_B=MC=20.
qa=(80-20)/2; pa=80-qa
qb=(60-20)/1; pb=60-.5*qb
eq(qa,30); eq(pa,50); eq(qb,40); eq(pb,40)
red=pa*qa+pb*qb; csd=.5*qa*(80-pa)+.5*qb*(60-pb); psd=red-20*(qa+qb)
eq(red,3100); eq(csd,850); eq(psd,1700)
eq((csd+psd)-(csu+psu),-100/3)

print("PASS: elasticity, tax, consumer and producer theory, competition, welfare, monopoly and discrimination identities.")
