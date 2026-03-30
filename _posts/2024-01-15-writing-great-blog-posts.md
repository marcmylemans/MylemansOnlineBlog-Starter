---
layout: post
title: "A Guide to Writing Great Blog Posts"
date: 2024-01-15 10:00:00 +0000
categories: [Writing]
tags: [writing, blogging, tips, markdown]
description: "Practical tips for writing engaging, well-structured blog posts that readers actually finish."
toc: true
---

Good blog posts are clear, focused, and easy to scan. Here are the principles that help the most.

## Start with One Clear Idea

Every post should answer one question or explain one concept. If you find yourself writing two separate things, split it into two posts. A tight focus makes posts easier to read and easier to rank in search.

## Structure for Scanning

Most readers scan before they read. Use:

- **Headings** (H2, H3) to break up content and signal what each section covers
- **Short paragraphs** — 2–4 sentences each
- **Code blocks** for anything technical
- **Bullet lists** for steps or features — but don't overdo it

## Write a Useful Introduction

Skip the filler. Open with the problem the post solves, or the thing the reader will know by the end. One or two sentences is enough.

## Use Code Blocks for Technical Content

Wrap commands, config snippets, and file contents in fenced code blocks with the language specified:

````
```yaml
key: value
another_key: true
```
````

Renders as:

```yaml
key: value
another_key: true
```

## Front Matter Cheat Sheet

| Field | Required | Description |
|---|---|---|
| `layout` | Yes | Use `post` for all blog posts |
| `title` | Yes | The post title |
| `date` | Yes | Publication date |
| `description` | Recommended | Meta description (up to 160 chars) |
| `image` | Recommended | Hero image + OG image |
| `categories` | Optional | Shown as chips in the post header |
| `tags` | Optional | Used for related posts + tag pages |
| `toc` | Optional | Set `false` to hide the TOC |
| `comments` | Optional | Set `false` to disable comments |

## Add Images

Place images in `assets/img/posts/` and reference them with:

```markdown
![Alt text](/assets/img/posts/my-image.jpg)
```

For the hero image and OG preview, set `image:` in the front matter.

## Keep Going

Consistency matters more than perfection. A post published is infinitely better than a post in draft.
