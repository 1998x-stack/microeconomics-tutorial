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
print("PASS: elasticity, tax incidence, consumer optimum, Hicks/Slutsky numerical identities.")
