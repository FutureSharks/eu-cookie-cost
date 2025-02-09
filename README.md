# eu-cookie-cost

This is the source code for the site [cookiecost.eu](https://cookiecost.eu/), which is a live counter of the money wasted by EU citizens clicking cookie consent popups. Essentially, in 2018, the boomer bureaucrats in Brussels created [a policy](https://eur-lex.europa.eu/content/news/general-data-protection-regulation-GDPR-applies-from-25-May-2018.html) that requires websites to obtain "consent" from visitors to use cookies. This "consent" is currently implemented in the form of an annoying popup on almost every website. This counter estimates the amount of time EU citizens have wasted clicking these popups since the policy started and assigns a monetary value to their time. The calculation is based on an [article from Legiscope](https://legiscope.com/blog/hidden-productivity-drain-cookie-banners.html).

If you want to see the formula used to make the calculation, or make a pull request to improve it, it's here: [site/assets/js/calculations.js](site/assets/js/calculations.js)

Thanks for the authors of these tools that I used for this project:

- [html5up paradigm-shift](https://html5up.net/uploads/demos/paradigm-shift/)
- [number-to-words](https://github.com/marlun78/number-to-words)
