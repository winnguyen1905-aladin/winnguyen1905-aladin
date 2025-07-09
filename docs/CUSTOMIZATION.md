# Customization Guide

## 🎨 Personalizing Your Profile

### Changing Colors and Themes

#### GitHub Stats Theme Options
\`\`\`markdown
<!-- Available themes -->
- default
- dark
- radical
- merko
- gruvbox
- tokyonight
- onedark
- cobalt
- synthwave
- highcontrast
- dracula
\`\`\`

#### Snake Animation Colors
\`\`\`yaml
# In snake.yml workflow
outputs: |
  dist/github-snake-dark.svg?palette=github-dark
  dist/custom.gif?color_snake=orange&color_dots=#bfd6f6,#8dbdff,#64a1f4,#4b91f1,#3c7dd9
\`\`\`

### Adding New Sections

#### Skills Section
\`\`\`markdown
<td align="center" width="96">
  <img src="https://techstack-generator.vercel.app/[TECH]-icon.svg" alt="[TECH]" width="48" height="48" />
  <br><strong>[TECH]</strong>
</td>
\`\`\`

#### Badge Templates
\`\`\`markdown
![Badge](https://img.shields.io/badge/[TEXT]-[COLOR]?style=for-the-badge&logo=[LOGO]&logoColor=white)
\`\`\`

### Animation and GIFs

#### Recommended Sources
- [Giphy](https://giphy.com) - For animated GIFs
- [LottieFiles](https://lottiefiles.com) - For Lottie animations
- [Techstack Generator](https://techstack-generator.vercel.app) - For tech icons

### Performance Tips

1. **Optimize Images**: Use appropriate sizes (48x48 for icons)
2. **Cache Workflows**: Set appropriate cron schedules
3. **Minimize API Calls**: Use efficient workflow triggers
4. **Compress Assets**: Keep file sizes reasonable
