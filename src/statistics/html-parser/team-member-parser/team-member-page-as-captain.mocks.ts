/* eslint no-useless-escape: "off" */
export function teamMemberPageAsCaptainMock() {
  return `
<!DOCTYPE html>
<!--[if IE 8]>
<html class="no-js lt-ie9" lang="fi"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="fi"> <!--<![endif]-->

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
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta property="og:description" content="Kilometrikisa on yritysten, työyhteisöjen, osastojen, yhdistysten, seurojen tai minkä tahansa joukkueiden välinen leikkimielinen kilpailu." />
    <meta property="og:image" content="/static/images/kmkisa/kmkisa-og-1200x630.jpg" />
    <meta property="og:site_name" content="www.kilometrikisa.fi" />
    <meta property="og:title" content="Ilmoittaudu Kilometrikisaan!" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.kilometrikisa.fi/teams/vincit-forza/kilometrikisa-2021/" />
  <title>Joukkue - Vincit - Forza  | Kilometrikisa</title>
  
  <link rel="stylesheet" href="/static/css/foundation.min.css" media="all"/>
  <link rel="stylesheet" href="/static/css/font-awesome.min.css" media="screen">
  <!--[if IE 7]>
  <link rel="stylesheet" href="/static/css/font-awesome-ie7.min.css">
  <![endif]-->
  <link rel="stylesheet" href="/static/css/animate-custom.css" media="screen"/>
  <link rel="stylesheet" href="/static/css/style-summer.css?v=k83hf2" media="all"/>
  <script src="/static/js/vendor/custom.modernizr.js"></script>
  <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
  <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <link rel="stylesheet" href="/static/css/ie8-hack.css">
  <![endif]-->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script>
    window.jQuery || document.write('<script src="/static/js/vendor/jquery.js"><\/script>')
  </script>
  <script src="/static/js/kmkisa/kmkisa.js"></script>
  
  
    <script src="/static/js/vendor/jquery.cookie.js"></script>

    <script type="text/javascript">
      $(document).ready(function() {

        

        $('#id_team_type_0').click(function() {
          $("#ketjureaktio-company-name").show("slow");
        });

        $('#id_team_type_1').click(function() {
          $("#ketjureaktio-company-name").hide("slow");
        });

        $("#closeRemoveUserModal").click(function (e) {
          $('#removeUserModal').foundation('reveal', 'close');
        });

        $(".removeUserModalLink").click(function (e) {
          var $row = $(this).closest("tr");
          $('#removeMemberFullname').text($row.find("span.memberFullName").text());
          $('#removeMemberEmail').text($row.find("span.memberEmail").text());
          $('#remove_user_id').val($(this).attr("href").replace("#", ""));
          $('#removeUserModal').foundation('reveal', 'open');
        });

      });
    </script>
  


  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />
    <script src="https://cdn.usefathom.com/script.js" data-site="KMZIZWME" defer></script>

  <script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
  <script>
  window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#aa0000",
        "text": "#FFFFFF"
      },
      "button": {
        "background": "#f84000"
      }
    },
    "position": "bottom-left",
    "content": {
      "message": "Sivustomme käyttää evästeitä. Käyttämällä palvelua hyväksyt evästeiden käytön.",
      "dismiss": "Hyväksyn",
      "link": "Tietosuojaseloste",
      "href": "https://www.kilometrikisa.fi/privacy/"
    }
  })});
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
            <h1><a href="/" class="logo"><span>KILOMETRIKISA</span></a></h1>
          </li>
          <li class="toggle-topbar"><a href="#"><i class="icon-reorder"></i></a></li>
        </ul>
        <section class="top-bar-section">
          <ul class="right">
            <li><a href="/">Etusivu</a></li>

            <li class="has-dropdown"><a href="#">Tietoa</a>
              <ul class="dropdown">
                <li><label>Kilometrikisa</label></li>
                <li><a href="/faq/">Usein kysytyt kysymykset</a></li>
                <li><a href="/about/">Palkinnot ja arvonnat</a></li>
                <li><a href="/rules/">Säännöt ja ohjeet</a></li>
                                <li><a href="/ketjureaktio/">Ketjureaktio</a></li>
                                <li><a href="/polar-flow/">Polar Flow</a></li>
              </ul>
            </li>

            <li class="has-dropdown"><a href="#">Tulokset</a>
                <ul class="dropdown">
                                <li><a href="/contests/kilometrikisa-2022/teams/">Kilometrikisa 2022</a></li>
                                <li><a href="/contests/talvikilometrikisa-2022/teams/">Talvikilometrikisa 2022</a></li>
                                <li><a href="/contests/kilometrikisa-2021/teams/">Kilometrikisa 2021</a></li>
                                <li><a href="/contests/talvikilometrikisa-2021/teams/">Talvikilometrikisa 2021</a></li>
                                <li><a href="/contests/kilometrikisa-2020/teams/">Kilometrikisa 2020</a></li>
                                <li><a href="/contests/talvikilometrikisa-2020/teams/">Talvikilometrikisa 2020</a></li>
                  <li><a href="/contests/kilometrikisa-2019/teams/">Kilometrikisa 2019</a></li>
                  <li><a href="/contests/talvikilometrikisa-2019/teams/">Talvikilometrikisa 2019</a></li>
                  <li><a href="/contests/kilometrikisa-2018/teams/">Kilometrikisa 2018</a></li>
                  <li><a href="/contests/talvikilometrikisa-2018/teams/">Talvikilometrikisa 2018</a></li>
                  <li><a href="/contests/kilometrikisa-2017/teams/">Kilometrikisa 2017</a></li>
                  <li><a href="/contests/talvikilometrikisa-2017/teams/">Talvikilometrikisa 2017</a></li>
                  <li><a href="/contests/kilometrikisa-2016/teams/">Kilometrikisa 2016</a></li>
                  <li><a href="/contests/talvikilometrikisa-2016/teams/">Talvikilometrikisa 2016</a></li>
                  <li><a href="/contests/kilometrikisa-2015/teams/">Kilometrikisa 2015</a></li>
                  <li><a href="/contests/talvikilometrikisa-2015/teams/">Talvikilometrikisa 2015</a></li>
                  <li><a href="/contests/kilometrikisa-2014/teams/">Kilometrikisa 2014</a></li>
                  <li><a href="/contests/talvikilometrikisa-2014/teams/">Talvikilometrikisa 2014</a></li>
              </ul>
            </li>

            <li><a href="/teams/register/">Ilmoita joukkue</a></li>
            
              <li><a href="/teams/join/">Liity joukkueeseen</a></li>
            
            <li class="divider"></li>

            
              <li class="has-dropdown"><a href="#" class="user-name">tumetsu</a>
                <ul class="dropdown">
                  <li><a href="/accounts/index/">Oma sivu</a></li>
                  <li><a href="/contest/log/">Kirjaa kilometrisi</a></li>
                  <li><a href="/accounts/profile/">Omat tiedot</a></li>
                  <li><a href="/accounts/myteams/">Omat joukkueet</a></li>
                  <li><a href="/teams/favorites/">Suosikit</a></li>
                  <li><a href="/contest/challenge/">Lähetä haaste</a></li>
                                    <li><a href="/feedback/">Ota yhteyttä</a></li>
                  <li><a href="/accounts/logout/">Kirjaudu ulos</a></li>
                </ul>
              </li>
            


          </ul>
        </section>
      </nav>
    </div>
  </header>
  <!-- End: Header -->

  

<div class="page-title summer-2022-1">
  <div class="row">
    <div class="small-12 large-8 column">
      <h1 class="animated flipInX"> Vincit - Forza </h1>
    </div>
  </div>
</div>

  

<!-- Start: page content -->


  <div class="row" class="team-detail">
    <section class="small-12 large-3 column aligncenter">
            
                <ul class="team-contest-table">
                    <li class="title">Kilometrikisa 2021</li>
                    
                        <li class="data-item emphasize"><div class="data-title">Piensarjan sijoitus</div>
                            <strong>
                                
                                    1005
                                
                            </strong>
                        </li>
                    
                    <li class="data-item"><div class="data-title">Joukkueen keskiarvo</div>689,3 km/hlö</li>
                    <li class="data-item"><div class="data-title">Kilometrit yhteensä</div>8961,4 km</li>
                    <li class="data-item"><div class="data-title">Pyöräilypäivien keskiarvo</div>32,15 pv/hlö</li>
                    <li class="data-item"><div class="data-title">Pyöräilypäivät yhteensä</div>418</li>
                    <li class="data-item"><div class="data-title">Bensaa säästetty</div>627 litraa</li>
                    <li class="data-item"><div class="data-title">CO<sub>2</sub> säästetty</div>1567 kg</li>
                </ul>

                <div class="updated">Päivitetty: 12.10.2021 23:59</div>
            

            
                <br><br>
                <ul class="team-contest-table">
                    <li class="title">Kilometrikisa 2021</li>
                    <li class="data-item emphasize"><div class="data-title">Sähkösarjan sijoitus</div>
                        <strong>
                            
                                715
                            
                        </strong>
                    </li>
                    <li class="data-item"><div class="data-title">Joukkueen keskiarvo</div>244,1 km/hlö</li>
                    <li class="data-item"><div class="data-title">Kilometrit yhteensä</div>732,2 km</li>
                    <li class="data-item"><div class="data-title">Pyöräilypäivien keskiarvo</div>14,00 pv/hlö</li>
                    <li class="data-item"><div class="data-title">Pyöräilypäivät yhteensä</div>28</li>
                </ul>
                <div class="updated">Päivitetty: 12.10.2021 23:55</div>
            

      
        <div id="sidebar-comments">
          <div class="sidebar-comments">

            <h4>Joukkueen kisakeskustelu</h4>

            
              <p>
                Ei kommentteja.
                
              </p>
          
          </div>
        </div>
      

    </section>
    <aside class="small-12 large-9 column">
      <div class="widget">
        <h4>
          Vincit - Forza
        </h4>

        <p>
          Ketterää softakehitystä ja ketterästi pyörällä töihin!<br /><br />Vincit - Forza on Vincitin Tampereen toimiston Forza-nimisen solun joukkue. Kisaamme ennen kaikkea Vincitin muita soluja vastaan, mutta katsotaan, mihin rahkeet riittää koko sarjassa!
        </p>

        <hr>
        <ul class="list-unstyled">
          <!-- <li><i class="icon-map-marker"></i>Paikkakunta: </li>-->
          

          <li><i class="icon-home"></i>Kunta:
          Tampere
          </li>
          <!--<li><i class="icon-info"></i>Perustettu: 22.03.2019</li>-->
          <!-- <li><i class="icon-tags"></i> Tagit: </li>-->
        </ul>

      

      </div>

<div class="section-container auto" data-section data-options="deep_linking: true">

  
    <section>
      <p class="title" data-section-title><a href="#my-team">Kilometrikisa</a></p>

      <div class="content" data-section-content data-slug="my-team">

        <div class="widget">
          <h4>Polkijat <span style="color: #aaa"> &ndash; Kilometrikisa 2021</span></h4>

          <table width="100%">
            <thead>
            <tr>
              <th>#</th>
              <th>Nimi</th>
              
                <th>Sähköpostiosoite <span data-tooltip class="has-tip tip-right" title="Joukkueen jäsenten sähköpostiosoitteet näytetään vain joukkueen kapteenille.">(?)</span></th>
              
              <th>Km yht.</th>
              
                <th>Km (lihas)</th>
                <th>Km (sähkö)</th>
              

              <th>Ajopäivät</th>

              
            </tr>
            </thead>
            <tbody>
            
              <tr class="my-result-row">
                <td>1</td>
                <td>
                  
                    Testi Testersson
                    
                      &nbsp;<span class="gray">(<span class="memberFullName">Testi Testersson</span>)</span>
                    
                  
                </td>
                
                  <td>
                    <span class="gray memberEmail"><em>testi.testersson@example.com</em></span>
                  </td>
                
                <td>
                  1691,9
                </td>
                
                  <td>1691,9</td>
                  <td>0,0</td>
                
                <td>43</td>

                
              </tr>
            
              <tr>
                <td>2</td>
                <td>
                  
                    Paula Pyöräilijä
                    
                      &nbsp;<span class="gray">(<span class="memberFullName">Paula Pyöräilijä</span>)</span>
                    
                  
                </td>
                
                  <td>
                    <span class="gray memberEmail"><em>paula.pyorailija@example.com</em></span>
                  </td>
                
                <td>
                  1531,7
                </td>
                
                  <td>844,6</td>
                  <td>687,2</td>
                
                <td>55</td>

                
              </tr>
            
              <tr>
                <td>3</td>
                <td>
                  
                    Tsygä Tsygäilijä
                    
                      &nbsp;<span class="gray">(<span class="memberFullName">Tytti Fillarinen</span>)</span>
                    
                  
                </td>
                
                  <td>
                    <span class="gray memberEmail"><em>tsyga@example.com</em></span>
                  </td>
                
                <td>
                  1513,3
                </td>
                
                  <td>1513,3</td>
                  <td>0,0</td>
                
                <td>49</td>

                
              </tr>
            
              
            </tbody>
          </table>
        </div>

      </div>
    </section>
  

  
    <section>
      <p class="title" data-section-title><a href="#minute-contest">Minuuttikisa</a></p>

      <div class="content" data-section-content data-slug="minute-contest">

        <div class="widget">
          <h4>Polkijat <span style="color: #aaa"> &ndash; Minuuttikisa</span></h4>

          
            <table width="100%">
              <thead>
              <tr>
                <th>#</th>
                <th>Nimi</th>
                
                  <th>Sähköpostiosoite <span data-tooltip class="has-tip tip-right" title="Joukkueen jäsenten sähköpostiosoitteet näytetään vain joukkueen kapteenille.">(?)</span></th>
                
                <th>Aika (tunnit ja minuutit)</th>
                <th>Ajopäivät</th>
                
              </tr>
              </thead>
              <tbody>
              
                <tr class="my-result-row">
                  <td>1</td>
                  <td>
                    
                      Testi Testersson
                      
                        &nbsp;<span class="gray">(<span class="memberFullName">Testi Testersson</span>)</span>
                      
                    
                  </td>
                  
                    <td>
                      <span class="gray memberEmail"><em>testi.testersson@example.com</em></span>
                    </td>
                  
                  <td>79 h 43 min</td>
                  <td>42</td>
                </tr>
              
                <tr>
                  <td>2</td>
                  <td>
                    
                      Tsygä Tsygäilijä
                      
                        &nbsp;<span class="gray">(<span class="memberFullName">Tytti Fillarinen</span>)</span>
                      
                    
                  </td>
                  
                    <td>
                      <span class="gray memberEmail"><em>tsyga@example.com</em></span>
                    </td>
                  
                  <td>74 h 30 min</td>
                  <td>49</td>
                </tr>
              
                <tr>
                  <td>3</td>
                  <td>
                    
                      Paula Pyöräilijä
                      
                        &nbsp;<span class="gray">(<span class="memberFullName">Paula Pyöräilijä</span>)</span>
                      
                    
                  </td>
                  
                    <td>
                      <span class="gray memberEmail"><em>paula.pyorailija@example.com</em></span>
                    </td>
                  
                  <td>54 h 0 min</td>
                  <td>34</td>
                </tr>
              
              </tbody>
            </table>
          
        </div>

      </div>
    </section>
  

  
    <section>
      <p class="title" data-section-title><a href="#my-stats">Omat tilastot</a></p>

      <div class="content" data-section-content data-slug="my-stats">
        <div class="widget">
          <br>
          <h4>Kilometrit ja ajopäivät</h4>
          <p>
            <strong>Kilometrejä yhteensä:</strong> 1691,9 km (lihasvoimalla 1691,9 km, sähköavusteisesti 0,0 km)<br>
            <strong>Ajopäiviä yhteensä:</strong> 43 päivää<br>
            <strong>Kilometrejä per ajopäivä:</strong> 39,4 km / pv<br>
          </p>

          <h4>Kilokalorit</h4>
          <p>
          
            <strong>Kilokaloreja kulutettu yhteensä:</strong> 43560 kcal<br>
            <strong>Kilokalorit laskettu:</strong> 43 päivälle<br>
            <strong>Kilokaloreja per päivä</strong>: 1013 kcal/pv
            <br><br>
            <small class="gray">Kilokalorit arvioidaan vain lihasvoimin ajetuista kilometreistä.
              Laskennassa käytetään antamiasi <a href="/accounts/profile/">taustatietoja</a>,
            joita voit päivittää milloin tahansa. Kulutustiedot päivittyvät aina kun lisäät
            uuden kilometrikirjauksen tai päivität olemassa olevaa kilometrikirjausta.
            Antamasi taustatiedot ja kilokaloriarviot näkyvät vain sinulle itsellesi.</small>
          
          </p>

        </div>
      </div>
    </section>
    


  
    <section>
      <p class="title" data-section-title><a href="#team-edit">Muokkaa joukkuetietoja</a></p>

      <div class="content" data-section-content data-slug="team-edit">
        <div class="widget">
          <form action="/teams/vincit-forza/edit/" method="post" class="form-stacked">
            <input type="hidden" name="action" value="team">
            <input type='hidden' name='csrfmiddlewaretoken' value='ZnJ9vkoERqiJ5HBG4oDWPrDoM2m04GvqctSCjzPGFplajnYU6hbHkEB49gNBWXXF' />

                        <div class="clearfix">
              <div class="input">
                <label for="id_name">Joukkueen nimi</label><br>
                <input id="id_name" name="name"
                  value="Vincit - Forza" type="text" />

                
              </div>
            </div>

            <div class="clearfix">
              <div class="input">
                <label for="id_homepage">Kotisivu</label><br>
                <input id="id_homepage" name="homepage"
                  value="" type="url"
                  placeholder="http://www.esimerkki.fi" pattern="https?://.+"/>

                
              </div>
            </div>

            <div class="clearfix">
              <div class="input">
                <label for="id_description">Joukkueen kuvaus (2000 merkkiä)</label><br>
                <textarea name="description" style="height: auto" rows="8" id="id_description" maxlength="2000">
Ketterää softakehitystä ja ketterästi pyörällä töihin!

Vincit - Forza on Vincitin Tampereen toimiston Forza-nimisen solun joukkue. Kisaamme ennen kaikkea Vincitin muita soluja vastaan, mutta katsotaan, mihin rahkeet riittää koko sarjassa!</textarea>
                
              </div>
            </div>

            <div class="clearfix">
              <div class="input">
                <label for="id_city"><span id="team-city-label">Joukkueen paikkakunta/paikkakunnat</span><br><span style="color: #aaaaaa">(Pakollinen tieto. Ctrl-näppäin pohjassa voit valita useamman.)</span></label><br>
                <select name="city" required multiple="multiple" id="id_city" size="10">
  <option value="1">Akaa</option>

  <option value="2">Alajärvi</option>

  <option value="3">Alavieska</option>

  <option value="4">Alavus</option>

  <option value="5">Asikkala</option>

  <option value="6">Askola</option>

  <option value="7">Aura</option>

  <option value="8">Brändö</option>

  <option value="9">Eckerö</option>

  <option value="10">Enonkoski</option>

  <option value="11">Enontekiö</option>

  <option value="12">Espoo</option>

  <option value="13">Eura</option>

  <option value="14">Eurajoki</option>

  <option value="15">Evijärvi</option>

  <option value="16">Finström</option>

  <option value="17">Forssa</option>

  <option value="18">Föglö</option>

  <option value="19">Geta</option>

  <option value="20">Haapajärvi</option>

  <option value="21">Haapavesi</option>

  <option value="22">Hailuoto</option>

  <option value="23">Halsua</option>

  <option value="24">Hamina</option>

  <option value="25">Hammarland</option>

  <option value="26">Hankasalmi</option>

  <option value="27">Hanko</option>

  <option value="28">Harjavalta</option>

  <option value="29">Hartola</option>

  <option value="30">Hattula</option>

  <option value="31">Hausjärvi</option>

  <option value="32">Heinola</option>

  <option value="33">Heinävesi</option>

  <option value="34">Helsinki</option>

  <option value="35">Hirvensalmi</option>

  <option value="36">Hollola</option>

  <option value="37">Honkajoki</option>

  <option value="38">Huittinen</option>

  <option value="39">Humppila</option>

  <option value="40">Hyrynsalmi</option>

  <option value="41">Hyvinkää</option>

  <option value="42">Hämeenkoski</option>

  <option value="43">Hämeenkyrö</option>

  <option value="44">Hämeenlinna</option>

  <option value="45">Ii</option>

  <option value="46">Iisalmi</option>

  <option value="47">Iitti</option>

  <option value="48">Ikaalinen</option>

  <option value="49">Ilmajoki</option>

  <option value="50">Ilomantsi</option>

  <option value="51">Imatra</option>

  <option value="52">Inari</option>

  <option value="53">Inkoo</option>

  <option value="54">Isojoki</option>

  <option value="55">Isokyrö</option>

  <option value="56">Jalasjärvi</option>

  <option value="57">Janakkala</option>

  <option value="58">Joensuu</option>

  <option value="59">Jokioinen</option>

  <option value="60">Jomala</option>

  <option value="61">Joroinen</option>

  <option value="62">Joutsa</option>

  <option value="63">Juankoski</option>

  <option value="64">Juuka</option>

  <option value="65">Juupajoki</option>

  <option value="66">Juva</option>

  <option value="67">Jyväskylä</option>

  <option value="68">Jämijärvi</option>

  <option value="69">Jämsä</option>

  <option value="70">Järvenpää</option>

  <option value="71">Kaarina</option>

  <option value="72">Kaavi</option>

  <option value="73">Kajaani</option>

  <option value="74">Kalajoki</option>

  <option value="75">Kangasala</option>

  <option value="76">Kangasniemi</option>

  <option value="77">Kankaanpää</option>

  <option value="78">Kannonkoski</option>

  <option value="79">Kannus</option>

  <option value="80">Karijoki</option>

  <option value="81">Karkkila</option>

  <option value="82">Karstula</option>

  <option value="83">Karvia</option>

  <option value="84">Kaskinen</option>

  <option value="85">Kauhajoki</option>

  <option value="86">Kauhava</option>

  <option value="87">Kauniainen</option>

  <option value="88">Kaustinen</option>

  <option value="89">Keitele</option>

  <option value="90">Kemi</option>

  <option value="91">Kemijärvi</option>

  <option value="92">Keminmaa</option>

  <option value="93">Kemiönsaari</option>

  <option value="94">Kempele</option>

  <option value="95">Kerava</option>

  <option value="96">Keuruu</option>

  <option value="97">Kihniö</option>

  <option value="98">Kinnula</option>

  <option value="99">Kirkkonummi</option>

  <option value="100">Kitee</option>

  <option value="101">Kittilä</option>

  <option value="102">Kiuruvesi</option>

  <option value="103">Kivijärvi</option>

  <option value="104">Kokemäki</option>

  <option value="105">Kokkola</option>

  <option value="106">Kolari</option>

  <option value="107">Konnevesi</option>

  <option value="108">Kontiolahti</option>

  <option value="109">Korsnäs</option>

  <option value="110">Koski Tl</option>

  <option value="111">Kotka</option>

  <option value="112">Kouvola</option>

  <option value="113">Kristiinankaupunki</option>

  <option value="114">Kruunupyy</option>

  <option value="115">Kuhmo</option>

  <option value="116">Kuhmoinen</option>

  <option value="117">Kumlinge</option>

  <option value="118">Kuopio</option>

  <option value="119">Kuortane</option>

  <option value="120">Kurikka</option>

  <option value="121">Kustavi</option>

  <option value="122">Kuusamo</option>

  <option value="123">Kyyjärvi</option>

  <option value="124">Kärkölä</option>

  <option value="125">Kärsämäki</option>

  <option value="126">Kökar</option>

  <option value="127">Köyliö</option>

  <option value="128">Lahti</option>

  <option value="129">Laihia</option>

  <option value="130">Laitila</option>

  <option value="131">Lapinjärvi</option>

  <option value="132">Lapinlahti</option>

  <option value="133">Lappajärvi</option>

  <option value="134">Lappeenranta</option>

  <option value="135">Lapua</option>

  <option value="136">Laukaa</option>

  <option value="137">Lavia</option>

  <option value="138">Lemi</option>

  <option value="139">Lemland</option>

  <option value="140">Lempäälä</option>

  <option value="141">Leppävirta</option>

  <option value="142">Lestijärvi</option>

  <option value="143">Lieksa</option>

  <option value="144">Lieto</option>

  <option value="145">Liminka</option>

  <option value="146">Liperi</option>

  <option value="147">Lohja</option>

  <option value="148">Loimaa</option>

  <option value="149">Loppi</option>

  <option value="150">Loviisa</option>

  <option value="151">Luhanka</option>

  <option value="152">Lumijoki</option>

  <option value="153">Lumparland</option>

  <option value="154">Luoto</option>

  <option value="155">Luumäki</option>

  <option value="156">Luvia</option>

  <option value="157">Maalahti</option>

  <option value="158">Maaninka</option>

  <option value="159">Maarianhamina</option>

  <option value="160">Marttila</option>

  <option value="161">Masku</option>

  <option value="162">Merijärvi</option>

  <option value="163">Merikarvia</option>

  <option value="164">Miehikkälä</option>

  <option value="165">Mikkeli</option>

  <option value="166">Muhos</option>

  <option value="167">Multia</option>

  <option value="168">Muonio</option>

  <option value="169">Mustasaari</option>

  <option value="170">Muurame</option>

  <option value="171">Mynämäki</option>

  <option value="172">Myrskylä</option>

  <option value="173">Mäntsälä</option>

  <option value="174">Mänttä-Vilppula</option>

  <option value="175">Mäntyharju</option>

  <option value="176">Naantali</option>

  <option value="177">Nakkila</option>

  <option value="178">Nastola</option>

  <option value="179">Nivala</option>

  <option value="180">Nokia</option>

  <option value="181">Nousiainen</option>

  <option value="182">Nurmes</option>

  <option value="183">Nurmijärvi</option>

  <option value="184">Närpiö</option>

  <option value="185">Orimattila</option>

  <option value="186">Oripää</option>

  <option value="187">Orivesi</option>

  <option value="188">Oulainen</option>

  <option value="189">Oulu</option>

  <option value="190">Outokumpu</option>

  <option value="191">Padasjoki</option>

  <option value="192">Paimio</option>

  <option value="193">Paltamo</option>

  <option value="194">Parainen</option>

  <option value="195">Parikkala</option>

  <option value="196">Parkano</option>

  <option value="197">Pedersören kunta</option>

  <option value="198">Pelkosenniemi</option>

  <option value="199">Pello</option>

  <option value="200">Perho</option>

  <option value="201">Pertunmaa</option>

  <option value="202">Petäjävesi</option>

  <option value="203">Pieksämäki</option>

  <option value="204">Pielavesi</option>

  <option value="205">Pietarsaari</option>

  <option value="206">Pihtipudas</option>

  <option value="207">Pirkkala</option>

  <option value="208">Polvijärvi</option>

  <option value="209">Pomarkku</option>

  <option value="210">Pori</option>

  <option value="211">Pornainen</option>

  <option value="212">Porvoo</option>

  <option value="213">Posio</option>

  <option value="214">Pudasjärvi</option>

  <option value="215">Pukkila</option>

  <option value="216">Punkalaidun</option>

  <option value="217">Puolanka</option>

  <option value="218">Puumala</option>

  <option value="219">Pyhtää</option>

  <option value="220">Pyhäjoki</option>

  <option value="221">Pyhäjärvi</option>

  <option value="222">Pyhäntä</option>

  <option value="223">Pyhäranta</option>

  <option value="224">Pälkäne</option>

  <option value="225">Pöytyä</option>

  <option value="226">Raahe</option>

  <option value="227">Raasepori</option>

  <option value="228">Raisio</option>

  <option value="229">Rantasalmi</option>

  <option value="230">Ranua</option>

  <option value="231">Rauma</option>

  <option value="232">Rautalampi</option>

  <option value="233">Rautavaara</option>

  <option value="234">Rautjärvi</option>

  <option value="235">Reisjärvi</option>

  <option value="236">Riihimäki</option>

  <option value="237">Ristijärvi</option>

  <option value="238">Rovaniemi</option>

  <option value="239">Ruokolahti</option>

  <option value="240">Ruovesi</option>

  <option value="241">Rusko</option>

  <option value="242">Rääkkylä</option>

  <option value="243">Saarijärvi</option>

  <option value="244">Salla</option>

  <option value="245">Salo</option>

  <option value="246">Saltvik</option>

  <option value="247">Sastamala</option>

  <option value="248">Sauvo</option>

  <option value="249">Savitaipale</option>

  <option value="250">Savonlinna</option>

  <option value="251">Savukoski</option>

  <option value="252">Seinäjoki</option>

  <option value="253">Sievi</option>

  <option value="254">Siikainen</option>

  <option value="255">Siikajoki</option>

  <option value="256">Siikalatva</option>

  <option value="257">Siilinjärvi</option>

  <option value="258">Simo</option>

  <option value="259">Sipoo</option>

  <option value="260">Siuntio</option>

  <option value="261">Sodankylä</option>

  <option value="262">Soini</option>

  <option value="263">Somero</option>

  <option value="264">Sonkajärvi</option>

  <option value="265">Sotkamo</option>

  <option value="266">Sottunga</option>

  <option value="267">Sulkava</option>

  <option value="268">Sund</option>

  <option value="269">Suomussalmi</option>

  <option value="270">Suonenjoki</option>

  <option value="271">Sysmä</option>

  <option value="272">Säkylä</option>

  <option value="273">Taipalsaari</option>

  <option value="274">Taivalkoski</option>

  <option value="275">Taivassalo</option>

  <option value="276">Tammela</option>

  <option value="277" selected>Tampere</option>

  <option value="278">Tarvasjoki</option>

  <option value="279">Tervo</option>

  <option value="280">Tervola</option>

  <option value="281">Teuva</option>

  <option value="282">Tohmajärvi</option>

  <option value="283">Toholampi</option>

  <option value="284">Toivakka</option>

  <option value="285">Tornio</option>

  <option value="286">Turku</option>

  <option value="287">Tuusniemi</option>

  <option value="288">Tuusula</option>

  <option value="289">Tyrnävä</option>

  <option value="290">Ulvila</option>

  <option value="291">Urjala</option>

  <option value="292">Utajärvi</option>

  <option value="293">Utsjoki</option>

  <option value="294">Uurainen</option>

  <option value="295">Uusikaarlepyy</option>

  <option value="296">Uusikaupunki</option>

  <option value="297">Vaala</option>

  <option value="298">Vaasa</option>

  <option value="299">Valkeakoski</option>

  <option value="300">Valtimo</option>

  <option value="301">Vantaa</option>

  <option value="302">Varkaus</option>

  <option value="303">Vehmaa</option>

  <option value="304">Vesanto</option>

  <option value="305">Vesilahti</option>

  <option value="306">Veteli</option>

  <option value="307">Vieremä</option>

  <option value="308">Vihti</option>

  <option value="309">Viitasaari</option>

  <option value="310">Vimpeli</option>

  <option value="311">Virolahti</option>

  <option value="312">Virrat</option>

  <option value="313">Vårdö</option>

  <option value="314">Vöyri</option>

  <option value="315">Ylitornio</option>

  <option value="316">Ylivieska</option>

  <option value="317">Ylöjärvi</option>

  <option value="318">Ypäjä</option>

  <option value="319">Ähtäri</option>

  <option value="320">Äänekoski</option>

</select>
                
              </div>
            </div>
            <br>
            <input class="button" type="submit" value="Tallenna">

          </form>
        </div>
      </div>
    </section>
    

    
    
      <section>
        <p class="title" data-section-title><a href="#ketjureaktio">Ketjureaktio</a></p>

        <div class="content" data-section-content data-slug="ketjureaktio">

          <br>

          <div class="row">
            <div class="small-8 large-2 columns"><img src="/static/images/partners/spr-ketjureaktio-100px.jpg" alt="" /><br><br></div>
            <div class="small-8 large-8 columns">

              
                <p>
                  <strong>Kilometrikisa 2021</strong><br>
                  Joukkueenne "<em>Vincit - Forza</em>" on mukana Ketjureaktiossa!
                </p>

                <p>
                  Lisätietoa: <a target="_blank" href="http://www.punainenristi.fi/ketjureaktio">http://www.punainenristi.fi/ketjureaktio</a>
                </p>

                
                <h4>Joukkueen tiedot</h4>
                <p>
                  Joukkueen nimi: Vincit - Forza<br>
                  Joukkueen tyyppi: Yritysjoukkue
                  (Vincit)<br>

                  
                    Kapteenin puhelinnumero: +358504382974
                  
                </p>
                

                

              
            </div>
            <div class="small-12 large-2 columns"></div>
          </div>



        </div>
      </section>
    

  
</div>

    </aside>

  </div>
  <!-- End: Portfolio details -->



<!-- End: page content -->


  <!-- Start:Footer-->
  <footer>

    <div class="row widgets-block">

      <div class="small-12 large-4 column widget">
        <iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FKilometrikisa%2F122955181051432&amp;width=&amp;height=290&amp;colorscheme=dark&amp;show_faces=true&amp;header=true&amp;stream=false&amp;show_border=false&amp;" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:290px;" allowTransparency="true"></iframe>
      </div>


      <div class="small-12 large-4 column widget">
        <h4 class="title">Tietoja</h4>
        <p>
          Kilometrikisa on kaikille osallistujille maksuton ja sen järjestäjä on
                    <em><a style="text-decoration: underline" href="http://www.poljin.fi" target="_blank">Pyöräilykuntien verkosto ry</a></em>.
        </p>

        <p>
          Palvelua koskeviin yhteydenottoihin vastaa <br>
          Pyöräilykuntien verkosto ry.<br>
          <i class="icon-envelope"></i> <a style="text-decoration: underline" href="/feedback/">Yhteydenottolomake</a>
          <br><br>
          &raquo; <a href="/privacy/">Tietosuojaseloste</a>
        </p>
      </div>

      <div class="small-12 large-4 column widget text-center"></div>
    </div>

    <div id="social-links" class="aligncenter">
      <a href="" class="up-arrow"><i class="icon-angle-up"></i></a>

      <div class="copyrights">
        &copy; 2014–2022 <a href="http://www.poljin.fi" target="_blank">Pyöräilykuntien verkosto ry</a>.
      </div>

    </div>

  </footer>
  <!-- End:Footer-->
</div>
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
      var getDomain = document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0];
      for (var i = 0; i < el.length; i++) {
        var href = (typeof(el[i].getAttribute('href')) == 'string') ? el[i].getAttribute('href') : '';
        var myDomain = href.match(getDomain);

        if ((href.match(/^(https?:|\/\/)/i) && !myDomain) || href.match(/^mailto\:/i)) {
          addEvent(el[i], 'click', function (e) {
            var url = this.getAttribute('href'),
              win = (typeof(this.getAttribute('target')) == 'string') ? this.getAttribute('target') : '';

            console.log("add event", url);
            ga('send', 'event', 'outbound', 'click', url,
              {'hitCallback': hitCallbackHandler(url, win)},
              {'nonInteraction': 1}
            );
            e.preventDefault();
          });
        }
      }
    }
  })();
</script>



<div id="mainModal" class="reveal-modal medium"></div>

  

    

    

      <div id="ketjureaktioModal" class="reveal-modal small">
        <h2>Pyöräillään yhdessä hyvää</h2>
        <p><a class="close-reveal-modal">&times;</a></p>
        <p style="float: right;"><img style="width: 80%" src="/static/images/partners/spr-ketjureaktio-sidebar.jpg" alt="" /></p>

        <p>Ketjureaktio on Kilometrikisan yhteydessä poljettava Suomen Punaisen Ristin tempaus, jolla kerätään
                    varoja ilmastonmuutokseen sopeutumiseen. Tänä vuonna avustukset kohdistuvat erityisen rankasta
                    kuivuudesta kärsivään Itä-Afrikkaan, jossa Punainen Risti istuttaa Keniaan muun muassa hedelmäpuita.</p>

        <p><strong>Osallistumalla kampanjaan joukkueesi sitoutuu lahjoittamaan 1 &euro; jokaista poljettua 25 km kohden.</strong>
          Ennätysvuonna 2018 Ketjureaktioon osallistuneet joukkueet keräsivät lahjoitusvaroja lähes 120 000 euroa. Uskomaton summa – nyt on aika tehdä uusia ennätyksiä!</p>

                <p>Voit liittää joukkueesi Ketjureaktioon Ketjureaktio-välilehdeltä. &raquo; <a href="/ketjureaktio/">Lue lisää Ketjureaktiosta</a></p>

        <p class="text-center">
        <button class="close-reveal-modal modalButton" type="submit">Sulje</button></p>
      </div>

    

  

</body>
</html>
`;
}
