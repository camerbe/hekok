export default `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8"/>
    <title>nghekok</title>
   
    <base href="/"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="robots" content="index, follow">
    <meta name="google-adsense-account" content="ca-pub-8638642715460968">
    <link rel="icon" type="image/x-icon" href="hekok.ico"/>
    <link rel="dns-prefetch" href="//partner.googleadservices.com">
    <link rel="dns-prefetch" href="//tpc.googlesyndication.com">
    <link rel="dns-prefetch" href="//pagead2.googlesyndication.com">
    <link rel="dns-prefetch" href="//www.googletagmanager.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="preload" as="script" href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
    <!-- Rss -->
     
  <link rel="stylesheet" href="styles-UUS4PSCM.css"></head>
  <body><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script>
    <app-root></app-root>
    
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 500
      });
      gtag('js', new Date());
    </script>

    <!-- ✅ Scripts externes chargés avec defer pour meilleure performance -->
    <script defer="" src="https://www.googletagmanager.com/gtag/js?id=G-K905N6XENX"></script>
    <script defer="">
      gtag('config', 'G-K905N6XENX', {
        'page_path': window.location.pathname,
        'anonymize_ip': true
      });
    </script>

    <!-- ✅ AdSense avec async -->
    <script async="" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8638642715460968" crossorigin="anonymous"></script>

    <!-- ✅ reCAPTCHA avec defer -->
    <script defer="" src="https://www.google.com/recaptcha/enterprise.js"></script>

    <!-- ✅ Twitter widgets avec defer -->
    <script defer="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <!-- InMobi Choice. Consent Manager Tag v3.0 (for TCF 2.3) -->
  <script type="text/javascript" async="true">
  (function() {
    var host = "www.themoneytizer.com";
    var element = document.createElement('script');
    var firstScript = document.getElementsByTagName('script')[0];
    var url = 'https://cmp.inmobi.com'
      .concat('/choice/', '6Fv0cGNfc_bw8', '/', host, '/choice.js?tag_version=V3');
    var uspTries = 0;
    var uspTriesLimit = 3;
    element.async = true;
    element.type = 'text/javascript';
    element.src = url;

    firstScript.parentNode.insertBefore(element, firstScript);

    function makeStub() {
      var TCF_LOCATOR_NAME = '__tcfapiLocator';
      var queue = [];
      var win = window;
      var cmpFrame;

      function addFrame() {
        var doc = win.document;
        var otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);

        if (!otherCMP) {
          if (doc.body) {
            var iframe = doc.createElement('iframe');

            iframe.style.cssText = 'display:none';
            iframe.name = TCF_LOCATOR_NAME;
            doc.body.appendChild(iframe);
          } else {
            setTimeout(addFrame, 5);
          }
        }
        return !otherCMP;
      }

      function tcfAPIHandler() {
        var gdprApplies;
        var args = arguments;

        if (!args.length) {
          return queue;
        } else if (args[0] === 'setGdprApplies') {
          if (
            args.length > 3 &&
            args[2] === 2 &&
            typeof args[3] === 'boolean'
          ) {
            gdprApplies = args[3];
            if (typeof args[2] === 'function') {
              args[2]('set', true);
            }
          }
        } else if (args[0] === 'ping') {
          var retr = {
            gdprApplies: gdprApplies,
            cmpLoaded: false,
            cmpStatus: 'stub'
          };

          if (typeof args[2] === 'function') {
            args[2](retr);
          }
        } else {
          if(args[0] === 'init' && typeof args[3] === 'object') {
            args[3] = Object.assign(args[3], { tag_version: 'V3' });
          }
          queue.push(args);
        }
      }

      function postMessageEventHandler(event) {
        var msgIsString = typeof event.data === 'string';
        var json = {};

        try {
          if (msgIsString) {
            json = JSON.parse(event.data);
          } else {
            json = event.data;
          }
        } catch (ignore) {}

        var payload = json.__tcfapiCall;

        if (payload) {
          window.__tcfapi(
            payload.command,
            payload.version,
            function(retValue, success) {
              var returnMsg = {
                __tcfapiReturn: {
                  returnValue: retValue,
                  success: success,
                  callId: payload.callId
                }
              };
              if (msgIsString) {
                returnMsg = JSON.stringify(returnMsg);
              }
              if (event && event.source && event.source.postMessage) {
                event.source.postMessage(returnMsg, '*');
              }
            },
            payload.parameter
          );
        }
      }

      while (win) {
        try {
          if (win.frames[TCF_LOCATOR_NAME]) {
            cmpFrame = win;
            break;
          }
        } catch (ignore) {}

        if (win === window.top) {
          break;
        }
        win = win.parent;
      }
      if (!cmpFrame) {
        addFrame();
        win.__tcfapi = tcfAPIHandler;
        win.addEventListener('message', postMessageEventHandler, false);
      }
    };

    makeStub();

    var uspStubFunction = function() {
      var arg = arguments;
      if (typeof window.__uspapi !== uspStubFunction) {
        setTimeout(function() {
          if (typeof window.__uspapi !== 'undefined') {
            window.__uspapi.apply(window.__uspapi, arg);
          }
        }, 500);
      }
    };

    var checkIfUspIsReady = function() {
      uspTries++;
      if (window.__uspapi === uspStubFunction && uspTries < uspTriesLimit) {
        console.warn('USP is not accessible');
      } else {
        clearInterval(uspInterval);
      }
    };

    if (typeof window.__uspapi === 'undefined') {
      window.__uspapi = uspStubFunction;
      var uspInterval = setInterval(checkIfUspIsReady, 6000);
    }
  })();
  </script>
  <!-- End InMobi Choice. Consent Manager Tag v3.0 (for TCF 2.3) -->
  <link rel="modulepreload" href="chunk-VISF5JXG.js"><link rel="modulepreload" href="chunk-RTAMUV3J.js"><script src="main-PS7ZX3JY.js" type="module"></script></body>
</html>
`;