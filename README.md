# 微观经济学：从选择到市场

以 **28 篇中文章节**为主体的开放微观经济学教程，从机会成本、比较优势，到供需均衡、市场结构和现代议题。

**[在线阅读（GitHub Pages）](https://1998x-stack.github.io/microeconomics-tutorial/)** · [章节目录](docs/index.html) · [贡献与校验规范](AGENTS.md)

## 当前进度

- **01–10**：两轮深度重构，篇篇独立成文；共 20 张原创 SVG、MathML、可检查的数值实例、10 份证据记录，以及第 03–10 章的确定性交互实验。
- **11–26**：已按 01–10 的规范重写（语义结构、MathML、每章两张原创 SVG、确定性实验与 `evidence/11.json`…`evidence/26.json`），但复核编号仍停在 01–10，等待人工确认后再提升状态。
- **16–28**：保留原版 HTML 及导航，尚未完成同等深度的经济学和网页审查。
- 推荐路线：稀缺与边际选择 → 比较优势 → 需求与供给 → 弹性与政策 → 效用与无差异曲线 → 收入与替代效应。
- 每个教学模型使用明确声明的假设参数，允许读者独立核算，不能当作真实观测数据。

## 项目结构

```text
.
├── docs/
│   ├── index.html                  # GitHub Pages 课程首页
│   ├── chapters/
│   │   ├── 01.html … 10.html       # 两批精修，每篇有两张SVG
│   │   ├── 11.html … 26.html       # 已按同等规范重写（未提升复核编号）
│   │   ├── 16.html … 28.html       # 原始课程兼容迁移
│   │   ├── index.html              # 旧版章节返回目录链接兼容
│   │   └── theme.css               # 旧章节样式兼容
│   ├── assets/
│   │   ├── css/site.css
│   │   ├── js/lab.js
│   │   └── figures/*.svg
│   └── evidence/01.json … 26.json
├── scripts/validate_site.py
├── scripts/browser_check.py
├── scripts/test_models.py
├── .github/workflows/quality.yml
├── .github/workflows/pages.yml
├── courses.json
├── AGENTS.md
├── README.md
├── index.html                     # 旧首页跳转到 docs/
├── 01.html … 26.html              # 旧章节稳定跳转到新路径
└── 16.html … 28.html              # 旧地址兼容保留
```

## 本地阅读与测试

无需编译和外部 CDN；在仓库根目录运行：

```bash
python3 -m http.server 8000
# 在浏览器中访问 http://localhost:8000/docs/
python3 scripts/validate_site.py
python3 scripts/test_models.py
# 首次安装 Playwright 后可运行浏览器验收
python3 scripts/browser_check.py
```

这里的“构建”采用 **源目录 + 静态站点产物** 结构，不引入 Node/Vite 包装静态文件。GitHub Actions 的 Pages 工作流发布 `docs/` 目录；仓库的 Pages 设置需要选择 **GitHub Actions** 作为发布源。是否成功上线以 Actions 部署记录和网站可访问性为准。

## 内容和证据

前十章的模型数据均是教学示例，不是现实市场的统计。图解均为独立绘制，不使用 OpenStax 或 CORE Econ 的受版权保护图形。引述参考：

- [OpenStax, *Principles of Microeconomics 3e*, Chapter 2](https://openstax.org/books/principles-microeconomics-3e/pages/2-introduction-to-choice-in-a-world-of-scarcity)
- [OpenStax, *Principles of Microeconomics 3e*, Chapter 3](https://openstax.org/books/principles-microeconomics-3e/pages/3-introduction-to-demand-and-supply)
- [OpenStax, *Principles of Microeconomics 3e*, Chapter 5 · Elasticity](https://openstax.org/books/principles-microeconomics-3e/pages/5-introduction-to-elasticity)
- [OpenStax, *Principles of Microeconomics 3e*, Chapter 6 · Consumption](https://openstax.org/books/principles-microeconomics-3e/pages/6-introduction-to-consumer-choices)
- [Jensen & Miller (2008), Giffen Behavior and Subsistence Consumption](https://www.aeaweb.org/articles?id=10.1257/aer.98.4.1553)
- [CORE Econ, *The Economy 2.0: Microeconomics*, Unit 8](https://books.core-econ.org/the-economy/microeconomics/08-supply-demand-02-buying-and-selling.html)
- 制作方法参考：[Olah-style-posts](https://github.com/1998x-stack/Olah-style-posts)

欢迎通过 GitHub Issues 报告公式、案例、SVG 解释与可访问性问题。
