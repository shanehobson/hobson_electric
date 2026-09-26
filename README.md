# Hobson Electric

A marketing website for Hobson Electric, Inc., an electrical contractor. It has pages for residential and commercial services, company background, and the service area, plus a contact form for requesting a free estimate.

**Live site:** https://d2rovogyqdtmn6.cloudfront.net

> Built in 2018, with small content updates through 2022. This project is not actively maintained.

## Features

- Four pages: Home, Residential, Commercial, and About
- A responsive layout built with Bootstrap 4 and Font Awesome icons
- A "Contact Us" form on every page that sends the visitor's name, phone number, email, and message to a separate Node.js/Express mailer service ([mailer_api](https://github.com/shanehobson/mailer_api)), which emails the request to the owner. The form shows an inline confirmation after it is submitted.

## Tech stack

- HTML, Sass, and vanilla JavaScript (ES2015, compiled with Babel)
- Bootstrap 4, jQuery, Popper.js, Font Awesome
- Gulp and BrowserSync for the build and live reload
- Express, which serves the static site

## Getting started

```bash
npm install

# Compile Sass and Babel, copy vendor assets into dist/, and serve with live reload
npx gulp

# Or serve the prebuilt dist/ folder with Express (defaults to port 3000)
npm start
```

`server.js` reads one environment variable, `PORT`, which is optional. The Gulp setup uses Gulp 3 and `gulp-sass` 4, so it needs an older Node.js release.

The contact form's endpoint is hard-coded in `src/js/script.js`. The Heroku app it points to is no longer running, so form submissions won't reach anyone until you point the form at a working mailer.

## Project structure

```
src/
  scss/style.scss   # Site styles
  js/script.js      # Contact form handling
dist/               # Built site: HTML pages, compiled CSS/JS, images, fonts
gulpfile.js         # sass, babel, js, fa, fonts, and serve tasks
server.js           # Express static server
```

The `main` branch also includes AWS CDK infrastructure (`infra/`) for hosting `dist/` on a private S3 bucket behind CloudFront.

## Related

- [mailer_api](https://github.com/shanehobson/mailer_api): the Express service behind the contact form
- Portfolio: https://www.shanehobson.me
