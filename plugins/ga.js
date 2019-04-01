/* eslint-disable */

export default ({ app }) => {
  // Only run on client-side and only in production mode
  if (process.env.NODE_ENV !== 'production') return

  // Include Google Analytics Script
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  // Load anti-flicker snippet. Css for it is loaded in layout
  (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
  h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
  (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
  })(window,document.documentElement,'async-hide','dataLayer',4000,
  {'OPT_CONTAINER_ID':true});

  // Set the current page
  ga('create', 'UA-54365170-1', 'auto');
  ga('require', 'GTM-MG2TDXS');

  // Every time the route changes (fired on initialization too)
  app.router.afterEach((to, from) => {
    // We tell Google Analytics to add a `pageview`
    ga('set', 'page', to.fullPath);
    ga('send', 'pageview');
  })
}
