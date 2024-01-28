<p align="center">
<img src="https://github.com/c1b3rt00lk1t/shorten-link/blob/main/public/icon192.png?raw=true" width="20%" height="20%" >
</p>

# Shorten Link

### Basic description

TYPESCRIPT · NEXT · ANTD COMPONENTS · CSS MODULES · CYPRESS · TESTING LIBRARY  
Web app providing short links and QR code for an input URL. When the app is accessed with the short link, it redirects the user to the original URL. If the short link does not exist, the app displays a 404 page inviting the user to create a new short link.

### Available demo online

A working version of the mobile/desktop app can be found <a href='https://shorten-link-chi.vercel.app/'>here</a>.

### Basic usage

- After cloning the repo: <code>$ npm install</code>
- To run the app in local: <code>$ npm run dev</code>
- To run the e2e cypress tests in local: <code>$ npm run cypress:open</code>

### Cloc stats

![cloc stats](https://github.com/c1b3rt00lk1t/shorten-link/blob/main/images/cloc.png?raw=true)

### Key technical features

The app leverages on the following technical pillars:

- The app is written in <code>Typescript</code> and <code>TSX</code> using the <code>React</code> library, within the <code>Next.js</code> framework.
- The app is using the new <code>App router</code> feature from <code>Next.js</code>.
- Error handling with <code>try...catch</code> blocks and "Not found" handling with <code>not-found.tsx</code>.
- The app is build using the component library <code>Ant design</code>.
- End-to-end testing with <code>Cypress</code> and <code>Testing library plugin</code>.
- Optimized for performance, accessibility, best practices and SEO with <code>Lighthouse</code>.

### Code coverage

A +90% of code coverage is achieved by using an E2E test strategy with Cypress.

<p align="center">
<img src="https://github.com/c1b3rt00lk1t/shorten-link/blob/main/images/coverage.png?raw=true" width="75%" >
</p>

### Lighthouse score

The app is optimized for performance, accessibility, best practices and SEO.

<p align="center">
<img src="https://github.com/c1b3rt00lk1t/shorten-link/blob/main/images/lighthouse.png?raw=true" width="50%" >
</p>
