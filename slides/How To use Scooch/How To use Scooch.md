# Scooch

Scooch is a presenter application for creating slides like KeyNote and PowerPoint but then for the browser.

Everybody has a browser
---
# How To Use

The whole idea of scooch is to make creating presentations easy

This howto will explain the following:

* General information
* Your own scooch folder
* Your own templates
* Your own themes
* Docker compose

---
# General information

Scooch will scan the `/slides` folder at startup.  
So if you do nothing you will get the slides I provided.    
The same goes for the `/templates` and `/themes` folders.  
--
scooch will work out of the box but then it will not give you much to work with.

The whole idea is to make it available for you

In the following slides this will all be explained.
---
## Your own scooch folder

To get scooch to work with your own files you will have to extend the command line:

```bash
docker run -i -t --rm -p 3000:3000 -v /Users/ivonet/slides:/slides ivonet/scooch
```

You of course have to point the `/Users/ivonet/slides` to a folder of your own and make sure that markdown files are in there.
When adding new slides you need to restart scooch because at startup it scans the `/slides` folder.
---
## Your own templates

If you also want access to the templates folder for creating your own templates you need to add another volume to the docker command.

```bash
docker run -i -t --rm -p 3000:3000 -v /Users/ivonet/slides:/slides -v /Users/ivonet/.scooch/templates:/templates ivonet/scooch
```

In this example I placed my templates in my home folder under `.scooch/templates`. You need to change this
--
## Example template


```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Scooch</title>
    <link rel="stylesheet" href="/node_modules/reveal.js/css/reveal.css">
    <link rel="stylesheet" href="/themes/ivonet.css" id="theme">
    <link rel="stylesheet" href="/node_modules/reveal.js/lib/css/zenburn.css">
    <script src="/app/querystring.js"></script>
    <script>
        document.write('<link rel="stylesheet" href="/node_modules/reveal.js/css/print/' +
                       ( window.location.search.match(/print-pdf/gi) ? 'pdf' : 'paper' ) +
                       '.css" type="text/css" media="print">');
        document.getElementById('theme').setAttribute('href', QueryString.theme);
        document.title = QueryString.title;
    </script>
    <!--[if lt IE 9]>
    <script src="/node_modules/reveal.js/lib/js/html5shiv.js"></script>
    <![endif]-->
</head>
<body>
<div class="reveal">
    <img src="/templates/wolf-logo-left-white-sm.svg" style="float: right">
    <div class="slides" id="ivonet-slides">
        <script>
            document.write('<section data-markdown="' + QueryString.slideshow +
                           '" data-separator="^---$" data-separator-vertical="^--$" data-separator-notes="^Note:"></section>')
        </script>
    </div>
</div>
<script src="/node_modules/jquery/dist/jquery.min.js"></script>
<script src="/node_modules/reveal.js/lib/js/head.min.js"></script>
<script src="/node_modules/reveal.js/js/reveal.js"></script>
<script src="/app/ivonet-reveal.js"></script>
</body>
</html>
```
you can edit stuff withing the `<div class="reveal">` tag but not in the `<div class="slides" id="ivonet-slides">` tag.
--
## More about templates

* Templates are often used but created only once.
* Templates take a bit more work to work :-)
* Make sure that the important stuff stays in there.
---
## Your own themes

Themes are CSS files and are put in the `/themes` volume. This volume can also be mounted in the same way as the above examples
--
### Example theme

Copy and adjust :-)

```css
section.has-light-background, section.has-light-background h1, section.has-light-background h2, section.has-light-background h3, section.has-light-background h4, section.has-light-background h5, section.has-light-background h6 {
  color: #222; }

/*********************************************
 * GLOBAL STYLES
 *********************************************/
body {
  background: url("/img/pattern.png");
  background-repeat: repeat;
  background-color: #000; }

.reveal {
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  font-size: 32px;
  font-weight: normal;
  color: #33dd33; }

::selection {
  color: #fff;
  background: #d33682;
  text-shadow: none; }

.reveal .slides > section,
.reveal .slides > section > section {
  line-height: 1.3;
  font-weight: inherit; }

/*********************************************
 * HEADERS
 *********************************************/
.reveal h1,
.reveal h2,
.reveal h3,
.reveal h4,
.reveal h5,
.reveal h6 {
  margin: 0 0 20px 0;
  color: #00C0F7;
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  font-weight: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-transform: uppercase;
  text-shadow: none;
  word-wrap: break-word; }

.reveal h1 {
  font-size: 2em; }

.reveal h2 {
  font-size: 1.6em; }

.reveal h3 {
  font-size: 1.3em; }

.reveal h4 {
  font-size: 1em; }

.reveal h1 {
  text-shadow: none; }

/*********************************************
 * OTHER
 *********************************************/
.reveal p {
  margin: 20px 0;
  line-height: 1.3; }

/* Ensure certain elements are never larger than the slide itself */
.reveal img,
.reveal video,
.reveal iframe {
  max-width: 95%;
  max-height: 95%; }

.reveal strong,
.reveal b {
  font-weight: bold; }

.reveal em {
  font-style: italic; }

.reveal ol,
.reveal dl,
.reveal ul {
  display: inline-block;
  text-align: left;
  margin: 0 0 0 1em; }

.reveal ol {
  list-style-type: decimal; }

.reveal ul {
  list-style-type: disc; }

.reveal ul ul {
  list-style-type: square; }

.reveal ul ul ul {
  list-style-type: circle; }

.reveal ul ul,
.reveal ul ol,
.reveal ol ol,
.reveal ol ul {
  display: block;
  margin-left: 40px; }

.reveal dt {
  font-weight: bold; }

.reveal dd {
  margin-left: 40px; }

.reveal q,
.reveal blockquote {
  quotes: none; }

.reveal blockquote {
  display: block;
  position: relative;
  width: 70%;
  margin: 20px auto;
  padding: 5px;
  font-style: italic;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2); }

.reveal blockquote p:first-child,
.reveal blockquote p:last-child {
  display: inline-block; }

.reveal q {
  font-style: italic; }

.reveal pre {
  display: block;
  position: relative;
  width: 90%;
  margin: 20px auto;
  text-align: left;
  font-size: 0.55em;
  font-family: monospace;
  line-height: 1.2em;
  word-wrap: break-word;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3); }

.reveal code {
  font-family: monospace; }

.reveal pre code {
  display: block;
  padding: 5px;
  overflow: auto;
  max-height: 400px;
  word-wrap: normal; }

.reveal table {
  margin: auto;
  border-collapse: collapse;
  border-spacing: 0; }

.reveal table th {
  font-weight: bold; }

.reveal table th,
.reveal table td {
  text-align: left;
  padding: 0.2em 0.5em 0.2em 0.5em;
  border-bottom: 1px solid; }

.reveal table th[align="center"],
.reveal table td[align="center"] {
  text-align: center; }

.reveal table th[align="right"],
.reveal table td[align="right"] {
  text-align: right; }

.reveal table tr:last-child td {
  border-bottom: none; }

.reveal sup {
  vertical-align: super; }

.reveal sub {
  vertical-align: sub; }

.reveal small {
  display: inline-block;
  font-size: 0.6em;
  line-height: 1.2em;
  vertical-align: top; }

.reveal small * {
  vertical-align: top; }

/*********************************************
 * LINKS
 *********************************************/
.reveal a {
  color: #00C0F7;
  text-decoration: none;
  -webkit-transition: color .15s ease;
  -moz-transition: color .15s ease;
  transition: color .15s ease; }

.reveal a:hover {
  color: #5edbff;
  text-shadow: none;
  border: none; }

.reveal .roll span:after {
  color: #fff;
  background: #0085ab; }

/*********************************************
 * IMAGES
 *********************************************/
.reveal section img {
  margin: 15px 0px;
  background: rgba(255, 255, 255, 0.12);
  border: 4px solid #33dd33;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); }

.reveal section img.plain {
  border: 0;
  box-shadow: none; }

.reveal a img {
  -webkit-transition: all .15s linear;
  -moz-transition: all .15s linear;
  transition: all .15s linear; }

.reveal a:hover img {
  background: rgba(255, 255, 255, 0.2);
  border-color: #00C0F7;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.55); }

/*********************************************
 * NAVIGATION CONTROLS
 *********************************************/
.reveal .controls .navigate-left,
.reveal .controls .navigate-left.enabled {
  border-right-color: #00C0F7; }

.reveal .controls .navigate-right,
.reveal .controls .navigate-right.enabled {
  border-left-color: #00C0F7; }

.reveal .controls .navigate-up,
.reveal .controls .navigate-up.enabled {
  border-bottom-color: #00C0F7; }

.reveal .controls .navigate-down,
.reveal .controls .navigate-down.enabled {
  border-top-color: #00C0F7; }

.reveal .controls .navigate-left.enabled:hover {
  border-right-color: #5edbff; }

.reveal .controls .navigate-right.enabled:hover {
  border-left-color: #5edbff; }

.reveal .controls .navigate-up.enabled:hover {
  border-bottom-color: #5edbff; }

.reveal .controls .navigate-down.enabled:hover {
  border-top-color: #5edbff; }

/*********************************************
 * PROGRESS BAR
 *********************************************/
.reveal .progress {
  background: rgba(0, 0, 0, 0.2); }

.reveal .progress span {
  background: #00C0F7;
  -webkit-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);
  -moz-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);
  transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }

.hljs {
  font-size: 1.1em; }

```
---
## Docker compose

The commanline for docker can be a bitch so it is also possible to do this with docker-compose to automate some of this for you

```text
scooch:
  image: ivonet/scooch
  container_name: scooch
  ports:
  - "10080:3000"
  volumes:
  - ./slides:/slides
  - ./themes:/themes
  - ./templates:/templates
```

* This example will search for the mountable folders relative to the folder where this file is placed.  
* Removing a volume entry will revert to the default.
* Start with:

```bash
docker-compose up
```

or for detached mode

```bash
docker-compose up -d
```
--
## docker-compose extra

in the folder with the docher-compose file
stop the app:
```bash
docker-compose stop 
```

remove the image
```bash
docker-compose down
```

---
# More to learn

Please look at the other included presentation to learn how to use Markdown as the presentation language
 
`How to use Markdown`
 
---
# Thanks

for all the fish :-)

[Ivo Woltring](http://www.ivonet.nl)