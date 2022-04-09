/* eslint no-useless-escape: "off" */
export function teamPageHtmlMock() {
  return `
<!DOCTYPE html>
<!--[if IE 8]>
<html class="no-js lt-ie9" lang="fi"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="fi">
  <!--<![endif]-->

  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-47390024-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'UA-47390024-1');
    </script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      property="og:description"
      content="Kilometrikisa on yritysten, työyhteisöjen, osastojen, yhdistysten, seurojen tai minkä tahansa joukkueiden välinen leikkimielinen kilpailu."
    />
    <meta property="og:image" content="/static/images/kmkisa/kmkisa-og-1200x630.jpg" />
    <meta property="og:site_name" content="www.kilometrikisa.fi" />
    <meta property="og:title" content="Ilmoittaudu Kilometrikisaan!" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.kilometrikisa.fi/teams/vincit-forza/" />
    <title>Joukkue - Vincit - Forza | Kilometrikisa</title>

    <link rel="stylesheet" href="/static/css/foundation.min.css" media="all" />
    <link rel="stylesheet" href="/static/css/font-awesome.min.css" media="screen" />
    <!--[if IE 7]>
      <link rel="stylesheet" href="/static/css/font-awesome-ie7.min.css" />
    <![endif]-->
    <link rel="stylesheet" href="/static/css/animate-custom.css" media="screen" />
    <link rel="stylesheet" href="/static/css/style-summer.css?v=k83hf2" media="all" />
    <script src="/static/js/vendor/custom.modernizr.js"></script>
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <link rel="stylesheet" href="/static/css/ie8-hack.css" />
    <![endif]-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>
      window.jQuery || document.write('<script src="/static/js/vendor/jquery.js"><\/script>');
    </script>
    <script src="/static/js/kmkisa/kmkisa.js"></script>

    <link
      rel="stylesheet"
      type="text/css"
      href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css"
    />
    <script src="https://cdn.usefathom.com/script.js" data-site="KMZIZWME" defer></script>

    <script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
    <script>
      window.addEventListener('load', function () {
        window.cookieconsent.initialise({
          palette: {
            popup: {
              background: '#aa0000',
              text: '#FFFFFF',
            },
            button: {
              background: '#f84000',
            },
          },
          position: 'bottom-left',
          content: {
            message:
              'Sivustomme käyttää evästeitä. Käyttämällä palvelua hyväksyt evästeiden käytön.',
            dismiss: 'Hyväksyn',
            link: 'Tietosuojaseloste',
            href: 'https://www.kilometrikisa.fi/privacy/',
          },
        });
      });
    </script>
  </head>
  <body>
    <!-- Start: Wrapper -->
    <!-- Start: Header -->
    <header id="header">
      <div class="row">
        <nav class="top-bar">
          <ul class="title-area">
            <li class="name">
              <h1>
                <a href="/" class="logo"><span>KILOMETRIKISA</span></a>
              </h1>
            </li>
            <li class="toggle-topbar">
              <a href="#"><i class="icon-reorder"></i></a>
            </li>
          </ul>
          <section class="top-bar-section">
            <ul class="right">
              <li><a href="/">Etusivu</a></li>

              <li class="has-dropdown">
                <a href="#">Tietoa</a>
                <ul class="dropdown">
                  <li><label>Kilometrikisa</label></li>
                  <li><a href="/faq/">Usein kysytyt kysymykset</a></li>
                  <li><a href="/about/">Palkinnot ja arvonnat</a></li>
                  <li><a href="/rules/">Säännöt ja ohjeet</a></li>
                  <li><a href="/ketjureaktio/">Ketjureaktio</a></li>
                  <li><a href="/polar-flow/">Polar Flow</a></li>
                </ul>
              </li>

              <li class="has-dropdown">
                <a href="#">Tulokset</a>
                <ul class="dropdown">
                  <li><a href="/contests/kilometrikisa-2022/teams/">Kilometrikisa 2022</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2022/teams/">Talvikilometrikisa 2022</a>
                  </li>
                  <li><a href="/contests/kilometrikisa-2021/teams/">Kilometrikisa 2021</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2021/teams/">Talvikilometrikisa 2021</a>
                  </li>
                  <li><a href="/contests/kilometrikisa-2020/teams/">Kilometrikisa 2020</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2020/teams/">Talvikilometrikisa 2020</a>
                  </li>
                  <li><a href="/contests/kilometrikisa-2019/teams/">Kilometrikisa 2019</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2019/teams/">Talvikilometrikisa 2019</a>
                  </li>
                  <li><a href="/contests/kilometrikisa-2018/teams/">Kilometrikisa 2018</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2018/teams/">Talvikilometrikisa 2018</a>
                  </li>
                  <li><a href="/contests/kilometrikisa-2017/teams/">Kilometrikisa 2017</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2017/teams/">Talvikilometrikisa 2017</a>
                  </li>
                  <li><a href="/contests/kilometrikisa-2016/teams/">Kilometrikisa 2016</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2016/teams/">Talvikilometrikisa 2016</a>
                  </li>
                  <li><a href="/contests/kilometrikisa-2015/teams/">Kilometrikisa 2015</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2015/teams/">Talvikilometrikisa 2015</a>
                  </li>
                  <li><a href="/contests/kilometrikisa-2014/teams/">Kilometrikisa 2014</a></li>
                  <li>
                    <a href="/contests/talvikilometrikisa-2014/teams/">Talvikilometrikisa 2014</a>
                  </li>
                </ul>
              </li>

              <li><a href="/teams/register/">Ilmoita joukkue</a></li>

              <li><a href="/accounts/register/">Rekisteröidy</a></li>

              <li class="divider"></li>

              <li><a href="/accounts/login/">Kirjaudu</a></li>
            </ul>
          </section>
        </nav>
      </div>
    </header>
    <!-- End: Header -->

    <div class="page-title summer-2022-1">
      <div class="row">
        <div class="small-12 large-8 column">
          <h1 class="animated flipInX">Vincit - Forza</h1>
        </div>
      </div>
    </div>

    <!-- Start: page content -->

    <div class="row" class="team-detail">
      <section class="small-12 large-3 column aligncenter">
        <ul class="team-contest-table">
          <li class="title">Kilometrikisa 2022</li>

          <li class="data-item emphasize">
            <div class="data-title">Piensarjan sijoitus</div>
            <strong> Tulossa! </strong>
          </li>

          <li class="data-item">
            <div class="data-title">Joukkueen keskiarvo</div>
            300,0 km/hlö
          </li>
          <li class="data-item">
            <div class="data-title">Kilometrit yhteensä</div>
            1234,7 km
          </li>
          <li class="data-item">
            <div class="data-title">Pyöräilypäivien keskiarvo</div>
            26,34 pv/hlö
          </li>
          <li class="data-item">
            <div class="data-title">Pyöräilypäivät yhteensä</div>
            358
          </li>
          <li class="data-item">
            <div class="data-title">Bensaa säästetty</div>
            256 litraa
          </li>
          <li class="data-item">
            <div class="data-title">CO<sub>2</sub> säästetty</div>
            98 kg
          </li>
        </ul>

        <div class="updated">Päivitetty: 09.04.2022 13:23</div>
      </section>
      <aside class="small-12 large-9 column">
        <div class="widget">
          <h4>Vincit - Forza</h4>

          <p>
            Ketterää softakehitystä ja ketterästi pyörällä töihin!<br /><br />Vincit - Forza on
            Vincitin Tampereen toimiston Forza-nimisen solun joukkue. Kisaamme ennen kaikkea
            Vincitin muita soluja vastaan, mutta katsotaan, mihin rahkeet riittää koko sarjassa!
          </p>

          <hr />
          <ul class="list-unstyled">
            <!-- <li><i class="icon-map-marker"></i>Paikkakunta: </li>-->

            <li><i class="icon-home"></i>Kunta: Tampere</li>
            <!--<li><i class="icon-info"></i>Perustettu: 22.03.2019</li>-->
            <!-- <li><i class="icon-tags"></i> Tagit: </li>-->
          </ul>
        </div>

        <div class="section-container auto" data-section data-options="deep_linking: true"></div>
      </aside>
    </div>
    <!-- End: Portfolio details -->

    <!-- End: page content -->

    <!-- Start:Footer-->
    <footer>
      <div class="row widgets-block">
        <div class="small-12 large-4 column widget">
          <iframe
            src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FKilometrikisa%2F122955181051432&amp;width=&amp;height=290&amp;colorscheme=dark&amp;show_faces=true&amp;header=true&amp;stream=false&amp;show_border=false&amp;"
            scrolling="no"
            frameborder="0"
            style="border: none; overflow: hidden; height: 290px"
            allowTransparency="true"
          ></iframe>
        </div>

        <div class="small-12 large-4 column widget">
          <h4 class="title">Tietoja</h4>
          <p>
            Kilometrikisa on kaikille osallistujille maksuton ja sen järjestäjä on
            <em
              ><a style="text-decoration: underline" href="http://www.poljin.fi" target="_blank"
                >Pyöräilykuntien verkosto ry</a
              ></em
            >.
          </p>

          <p>
            Palvelua koskeviin yhteydenottoihin vastaa <br />
            Pyöräilykuntien verkosto ry.<br />
            <i class="icon-envelope"></i>
            <a style="text-decoration: underline" href="/feedback/">Yhteydenottolomake</a>
            <br /><br />
            &raquo; <a href="/privacy/">Tietosuojaseloste</a>
          </p>
        </div>

        <div class="small-12 large-4 column widget text-center"></div>
      </div>

      <div id="social-links" class="aligncenter">
        <a href="" class="up-arrow"><i class="icon-angle-up"></i></a>

        <div class="copyrights">
          &copy; 2014–2022
          <a href="http://www.poljin.fi" target="_blank">Pyöräilykuntien verkosto ry</a>.
        </div>
      </div>
    </footer>
    <!-- End:Footer-->
    <!-- End: Wrapper -->

    <script src="/static/js/foundation.min.js"></script>
    <script src="/static/js/vendor/jquery.prettyPhoto.js"></script>
    <script src="/static/js/custom.js"></script>

    <script>
      $(document).foundation();

      (function trackOutbounds() {
        var hitCallbackHandler = function (url, win) {
          if (win) {
            window.open(url, win);
          } else {
            window.location.href = url;
          }
        };

        var addEvent = function (el, eventName, handler) {
          if (el.addEventListener) {
            el.addEventListener(eventName, handler);
          } else {
            el.attachEvent('on' + eventName, function () {
              handler.call(el);
            });
          }
        };

        if (document.getElementsByTagName) {
          var el = document.getElementsByTagName('a');
          var getDomain =
            document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0];
          for (var i = 0; i < el.length; i++) {
            var href =
              typeof el[i].getAttribute('href') == 'string' ? el[i].getAttribute('href') : '';
            var myDomain = href.match(getDomain);

            if ((href.match(/^(https?:|\/\/)/i) && !myDomain) || href.match(/^mailto\:/i)) {
              addEvent(el[i], 'click', function (e) {
                var url = this.getAttribute('href'),
                  win =
                    typeof this.getAttribute('target') == 'string'
                      ? this.getAttribute('target')
                      : '';

                console.log('add event', url);
                ga(
                  'send',
                  'event',
                  'outbound',
                  'click',
                  url,
                  { hitCallback: hitCallbackHandler(url, win) },
                  { nonInteraction: 1 }
                );
                e.preventDefault();
              });
            }
          }
        }
      })();
    </script>

    <div id="mainModal" class="reveal-modal medium"></div>
  </body>
</html>
`;
}
