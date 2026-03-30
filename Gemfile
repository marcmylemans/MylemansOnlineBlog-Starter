# frozen_string_literal: true

source "https://rubygems.org"

gem "jekyll", "~> 4.4"

group :test do
  gem "html-proofer", "~> 5.0"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
  gem "jekyll-archives"
  gem "jekyll-redirect-from"
  gem "jekyll-last-modified-at"
end

gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
