# MylemansOnlineBlog Starter

A clean, modern Jekyll blog starter with dark/light theme, reading progress bar, sticky TOC, related posts, author bio, and full SEO schema support. Zero personal branding — everything is config-driven via `_config.yml`.

---

## Quick Start

### 1. Prerequisites

- Ruby 3.1+ and Bundler installed
- Git

### 2. Clone and install

```bash
git clone https://github.com/yourusername/MylemansOnlineBlog-Starter.git my-blog
cd my-blog
bundle install
```

### 3. Configure

Open `_config.yml` and replace every value marked `← CHANGE THIS`. At minimum:

| Field | Description |
|---|---|
| `title` | Your blog name |
| `description` | One-line site description |
| `url` | Your live domain, e.g. `https://blog.example.com` |
| `author.name` | Your name |
| `author.bio` | One or two sentences about yourself |
| `author.avatar` | Path to your avatar image (see Assets below) |
| `author.links` | Your social links |

### 4. Add your avatar

Place a square photo at `assets/img/avatar.jpg`. Recommended size: 200×200px or larger.

Place a 1200×630 fallback OG image at `assets/img/default-og.jpg`.

### 5. Preview locally

```bash
bundle exec jekyll serve --livereload
```

Open [http://localhost:4000](http://localhost:4000).

### 6. Deploy to GitHub Pages

Push to a `gh-pages` branch or configure the `main` branch as your Pages source. The included `/.github/workflows/pages.yml` handles the build automatically.

---

## Configuration Reference

All settings live in `_config.yml`. Here is a full explanation of every option.

### Site identity

```yaml
title: "My Blog"
tagline: "Thoughts, tutorials, and more"
description: "A description used in meta tags and the footer."
url: "https://blog.example.com"
baseurl: ""            # Leave empty unless hosting in a subdirectory
lang: "en"
timezone: "Europe/Brussels"   # IANA timezone string
```

### Author

```yaml
author:
  name: "Your Name"
  bio: >-
    Brief description of who you are and what this blog covers.
  avatar: "/assets/img/avatar.jpg"
  links:
    - label: "GitHub"
      url: "https://github.com/yourusername"
    - label: "LinkedIn"
      url: "https://linkedin.com/in/yourprofile"
    - label: "YouTube"
      url: "https://youtube.com/@yourchannel"
    - label: "Bluesky"
      url: "https://bsky.app/profile/you.bsky.social"
```

`links` is a list — add or remove entries freely. Each entry needs `label` and `url`. These are used in the author bio card on every post and in the site footer.

### SEO

```yaml
social:
  name: "Your Name"
  links:
    - "https://github.com/yourusername"

google_site_verification: ""   # Google Search Console verification string
default_image: "/assets/img/default-og.jpg"
```

`jekyll-seo-tag` reads `social:` to populate JSON-LD. `default_image` is used as the OG image for posts that don't have their own `image:` front matter.

### Google Analytics

```yaml
google_analytics:
  id: "G-XXXXXXXXXX"   # Your GA4 Measurement ID
```

Leave blank or remove to disable.

### Comments (Giscus)

[Giscus](https://giscus.app/) uses GitHub Discussions as a comment backend — no ads, no tracking, privacy-friendly.

```yaml
comments:
  provider: giscus
  giscus:
    repo: "owner/repo"
    repo_id: "R_xxxxxxxxxx"
    category: "Announcements"
    category_id: "DIC_xxxxxxxxxx"
    mapping: "pathname"
    reactions_enabled: "1"
    emit_metadata: "0"
    theme: "preferred_color_scheme"
    lang: "en"
```

Generate your `repo_id` and `category_id` at [giscus.app](https://giscus.app/).

To disable comments on a specific post, add `comments: false` to its front matter.

### Pagination

```yaml
paginate: 8            # Posts per page on the homepage
paginate_path: "/page/:num/"
```

### Navigation links

```yaml
nav_links:
  - label: "Home"
    url: "/"
  - label: "About"
    url: "/about/"
  - label: "Categories"
    url: "/categories/"
  - label: "Tags"
    url: "/tags/"
  - label: "Archives"
    url: "/archives/"
```

Add or remove nav items without touching any HTML.

### Plugins

```yaml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-paginate
  - jekyll-archives
  - jekyll-last-modified-at
```

All plugins are listed in the `Gemfile` and installed by `bundle install`.

---

## Writing Posts

### File naming

```
_posts/YYYY-MM-DD-your-post-slug.md
```

Example: `_posts/2024-06-15-proxmox-upgrade-guide.md`

### Front matter options

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-06-15 10:00:00 +0000

# Optional but recommended
description: "SEO meta description — keep under 160 characters."
image: /assets/img/posts/my-post-hero.jpg   # hero banner + OG image

# Organisation
categories: [Category1]       # shown as chips in the post header
tags: [tag1, tag2, tag3]       # drives related posts + tag archive pages

# Features
toc: false                     # set false to hide the table of contents
comments: false                # set false to disable comments on this post

# HowTo schema (optional — for step-by-step tutorials)
howto: true
howto_steps:
  - "Step one description"
  - "Step two description"
  - "Step three description"

# Last-modified date (used in schema and shown in the post header)
last_modified_at: 2024-07-01
---
```

### Images in posts

Place post images in `assets/img/posts/` and reference them in Markdown:

```markdown
![Descriptive alt text](/assets/img/posts/my-image.jpg)
```

Recommended dimensions for hero/OG images: **1200 × 630 px**.

---

## Theme Features

### Dark / Light mode

The toggle in the navbar switches between dark and light themes. The preference is stored in `localStorage` and applied before the page renders to avoid a flash. On first visit, the OS preference (`prefers-color-scheme`) is used.

### Reading progress bar

A thin bar at the top of the viewport fills as the reader scrolls through a post. It is implemented in `assets/js/blog.js` and styled in `assets/css/blog.css`.

### Back to top

A floating button appears in the bottom-right corner after scrolling more than ~400px. It smooth-scrolls back to the top on click.

### Sticky table of contents

The TOC is auto-generated from the headings in a post. On desktop it sticks in a sidebar as you scroll. On mobile it collapses. The current heading is highlighted as you scroll. Set `toc: false` in a post's front matter to disable it for that post.

### Related posts

At the bottom of every post, up to 3 posts that share at least one tag are shown automatically.

### Featured post

The most recent post gets a large hero card at the top of the homepage. All other posts appear in the card grid below.

### Author bio card

After each post body, a card showing the author's avatar, name, bio, and social links is rendered. All values come from `_config.yml` — no code changes needed.

### Prev / Next navigation

Links to the previous and next post by date appear at the bottom of every post.

---

## Structured Data (SEO)

The theme injects JSON-LD automatically. No setup required beyond filling in `_config.yml`.

| Schema | When applied |
|---|---|
| `Organization` + `Person` + `WebSite` | Homepage only |
| `TechArticle` | Every post |
| `BreadcrumbList` | Every post |
| `HowTo` | Posts with `howto: true` in front matter |

Test your pages with [Google's Rich Results Test](https://search.google.com/test/rich-results).

---

## Sitemap and robots.txt

`jekyll-sitemap` generates `/sitemap.xml` automatically.

`robots.txt` disallows tag, category, and archive listing pages from indexation (these are thin pages that dilute crawl budget):

```
User-agent: *
Allow: /
Disallow: /tags/
Disallow: /categories/
Disallow: /archives/
Sitemap: https://yourdomain.com/sitemap.xml
```

Update the `Sitemap:` line in `robots.txt` to match your domain.

---

## Customising the CSS

All styles are in `assets/css/blog.css`. CSS custom properties (variables) at the top of the file control colours, fonts, and spacing for both themes:

```css
:root {
  --bg: #ffffff;
  --text: #1a1a2e;
  --accent: #3b82f6;
  /* ... */
}
[data-theme="dark"] {
  --bg: #020617;
  --text: #e2e8f0;
  /* ... */
}
```

Change the accent colour, font stack, or any other variable without hunting through hundreds of CSS rules.

---

## Upgrading

This is a starter — you own the code. There is no upstream to pull from. If you want improvements, make them directly in your repo.

---

## License

[MIT](LICENSE) — use freely for personal or commercial projects.
