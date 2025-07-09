# Profile Setup Guide

## 🚀 Getting Started

This repository contains my GitHub profile with automated workflows and dynamic content generation.

### Prerequisites

- GitHub account with Actions enabled
- Personal Access Token with appropriate permissions

### Setup Instructions

1. **Fork this repository** to your GitHub account
2. **Update configuration** in `assets/config/profile-config.json`
3. **Modify README.md** with your personal information
4. **Set up GitHub Secrets** (if needed for private workflows)

### Workflows

#### 🐍 Snake Animation
- **File**: `.github/workflows/snake.yml`
- **Schedule**: Daily at midnight UTC
- **Purpose**: Generates contribution snake animation

#### 📊 Metrics Generation  
- **File**: `.github/workflows/metrics.yml`
- **Schedule**: Daily at midnight UTC
- **Purpose**: Creates detailed GitHub metrics

#### 📈 Profile Summary
- **File**: `.github/workflows/profile-summary.yml`
- **Schedule**: Daily at midnight UTC
- **Purpose**: Generates profile summary cards

### Customization

#### Updating Personal Information
1. Edit `assets/config/profile-config.json`
2. Update contact links in README.md
3. Modify skill badges and descriptions

#### Adding New Workflows
1. Create new workflow file in `.github/workflows/`
2. Follow existing patterns for scheduling and permissions
3. Test with `workflow_dispatch` trigger first

### Troubleshooting

#### Common Issues
- **Workflow not running**: Check repository permissions and secrets
- **Images not displaying**: Verify output branch exists and is accessible
- **Outdated content**: Manually trigger workflows via Actions tab

#### Debug Steps
1. Check Actions tab for workflow runs
2. Review workflow logs for errors
3. Verify file paths and permissions
4. Test with manual triggers first
