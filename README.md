# 微观经济学：从选择到市场

以 **28 篇中文章节**为主体的开放微观经济学教程，从机会成本、比较优势，到供需均衡、市场结构和现代议题。

**[阅读入口（GitHub Pages，部署后访问）](https://1998x-stack.github.io/microeconomics-tutorial/)** · [章节目录](docs/index.html) · [贡献与校验规范](AGENTS.md)

## 当前进度

- **01–05**：第一轮深度改写；独立成篇，配套 MathML、可检查的数值案例、原创 SVG、互动实验（03–05）及证据记录。
- **06–28**：保留原版 HTML，保证课程完整性；尚未经过同等深度的经济学事实审查。
- 学习顺序：稀缺与边际选择 → PPF 与比较优势 → 需求 → 供给 → 价格均衡。

## 项目结构

```text
.
├── docs/
│   ├── index.html                  # GitHub Pages 课程首页
│   ├── chapters/
│   │   ├── 01.html … 05.html       # 第一批精修
│   │   ├── 06.html … 28.html       # 原始课程兼容迁移
│   │   ├── index.html              # 旧版章节返回目录链接兼容
│   │   └── theme.css               # 旧章节样式兼容
│   ├── assets/
│   │   ├── css/site.css
│   │   ├── js/lab.js
│   │   └── figures/*.svg
│   └── evidence/01.json … 05.json
├── scripts/validate_site.py
├── .github/workflows/quality.yml
├── .github/workflows/pages.yml
├── courses.json
├── AGENTS.md
├── README.md
├── index.html                     # 旧首页跳转到 docs/
├── 01.html … 05.html              # 旧章节稳定跳转到新路径
└── 06.html … 28.html              # 旧地址兼容保留
```

## 本地阅读与测试

无需编译和外部 CDN；在仓库根目录运行：

```bash
python3 -m http.server 8000
# 在浏览器中访问 http://localhost:8000/docs/
python3 scripts/validate_site.py
```

这里的“构建”采用 **源目录 + 静态站点产物** 结构，不引入 Node/Vite 包装静态文件。GitHub Actions 的 Pages 工作流发布 `docs/` 目录；仓库的 Pages 设置需要选择 **GitHub Actions** 作为发布源。是否成功上线以 Actions 部署记录和网站可访问性为准。

## 内容和证据

首五章的模型数据均是教学示例，不是现实市场的统计。图解均为独立绘制，不使用 OpenStax 或 CORE Econ 的受版权保护图形。引述参考：

- [OpenStax, *Principles of Microeconomics 3e*, Chapter 2](https://openstax.org/books/principles-microeconomics-3e/pages/2-introduction-to-choice-in-a-world-of-scarcity)
- [OpenStax, *Principles of Microeconomics 3e*, Chapter 3](https://openstax.org/books/principles-microeconomics-3e/pages/3-introduction-to-demand-and-supply)
- [CORE Econ, *The Economy 2.0: Microeconomics*, Unit 8](https://books.core-econ.org/the-economy/microeconomics/08-supply-demand-02-buying-and-selling.html)
- 制作方法参考：[Olah-style-posts](https://github.com/1998x-stack/Olah-style-posts)

欢迎通过 GitHub Issues 报告公式、案例、SVG 解释与可访问性问题。
