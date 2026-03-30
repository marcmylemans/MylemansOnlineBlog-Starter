---
layout: post
title: "Theme Features Showcase"
date: 2024-02-01 09:00:00 +0000
categories: [Demo]
tags: [demo, features, theme]
description: "A showcase of all the features built into this Jekyll starter theme — dark mode, TOC, progress bar, and more."
toc: true
howto: true
howto_steps:
  - "Copy the _config.yml settings you need"
  - "Replace placeholder values with your own"
  - "Run bundle exec jekyll serve to preview"
---

This post demos every feature of the starter theme in one place.

## Dark / Light Theme

The toggle is in the top navigation bar. Your preference is saved so it persists across page loads. On first visit, it matches your OS preference (`prefers-color-scheme`).

## Reading Progress Bar

Scroll down and watch the thin bar at the very top of the page fill as you read. It resets when you navigate away.

## Back to Top

After scrolling more than ~400px, a button appears in the bottom-right corner. Click it for a smooth scroll back to the top.

## Table of Contents

This sidebar is auto-generated from the headings in the post. On desktop it sticks as you scroll. On mobile it collapses to save space. Set `toc: false` in the post front matter to hide it.

## Related Posts

At the bottom of every post, the theme surfaces up to 3 posts that share at least one tag with the current post. No configuration needed — it's fully automatic.

## Featured Post

On the homepage, the most recent post gets a large hero card. All other posts appear in the card grid below it.

## Author Bio Card

The bio card under each post is 100% config-driven. Set these fields in `_config.yml`:

```yaml
author:
  name: "Your Name"
  bio: "One or two sentences about yourself."
  avatar: "/assets/img/avatar.jpg"
  links:
    - label: "GitHub"
      url: "https://github.com/yourusername"
    - label: "LinkedIn"
      url: "https://linkedin.com/in/yourprofile"
```

## HowTo Schema

This post has `howto: true` in its front matter, which injects a `HowTo` JSON-LD schema into the page `<head>`. Google may use this to show rich results for step-by-step content. Provide steps via `howto_steps:`.

## Comments

Comments are powered by [Giscus](https://giscus.app/) — a GitHub Discussions-based comment system with no ads and no tracking. Enable it in `_config.yml`:

```yaml
comments:
  provider: giscus
  giscus:
    repo: "owner/repo"
    repo_id: "R_..."
    category: "Announcements"
    category_id: "DIC_..."
```

Then generate your IDs at [giscus.app](https://giscus.app/).

## Google Analytics

Add your Measurement ID to enable:

```yaml
google_analytics:
  id: "G-XXXXXXXXXX"
```

## Pagination

The homepage paginates automatically. Set the number of posts per page:

```yaml
paginate: 8
```
