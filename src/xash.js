//@flow
import * as React from 'react';
import random from 'lodash/random';
import times from 'lodash/times';

const initialRobots: string = '(googlebot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)';

type Inputs  = {
  elementTypes: ?Array<string>,
  robots: ?string,
  userAgent: any,
}

export class Xash {
  elementTypes: Array<string>;
  robots: string;
  repeat: number;
  userAgent: any;

  constructor(inputs: Inputs) {
    this.elementTypes = (inputs && inputs.elementTypes) || [
      "b",
      "big",
      "i",
      "small",
      "tt",
      "abbr",
      "acronym",
      "cite",
      "code",
      "dfn",
      "em",
      "kbd",
      "strong",
      "samp",
      "time",
      "var"
    ];

    this.robots = (inputs && inputs.robots) || initialRobots;
    this.repeat = 1;
    if (window && window.navigator && window.navigator.userAgent) {
      this.userAgent = navigator.userAgent;
    } else if(inputs && inputs.userAgent) {
      this.userAgent = inputs && inputs.userAgent;
    } else {
      console.error('You are using xash in server side rendering, Please provide userAgent');
    }
  }

  set repeats(number: number) {
    this.repeat = number;
    return this.repeat;
  }

  getStyle(): {|style: Object|} {
    return {
      style: {
        display: "inline-block",
        width: 0,
        height: 0,
        opacity: 0,
        color: 'transparent',
        zIndex: -99999999,
        margin: 0,
        lineHeight: 0,
        padding: 0,
      }
    }
  }

  elementGenerator (i: string, idx: number, Element: React.Node): React.Fragment {
    return (
      <React.Fragment key={idx}>
        {i}
        {Element}
      </React.Fragment>
    )
  }

  random(len: number): string {
    const randomString:string = times(len, () => random(35).toString(36)).join('');
    return randomString;
  }
  
  from = (text: string) => {
    const pattern = new RegExp(this.robots, 'i');
    if (pattern.test(this.userAgent)) return text;
  
    const generatedSymbols: string = this.random(text.length * 30);
  
    const xashedElements: Array<*> = [].map.call(text, (i: string, idx: number) => {
      const randomNum: number = random(0, this.elementTypes.length - 1);
      const hash: string = generatedSymbols[idx * randomNum];
      const Element = React.createElement(
        this.elementTypes[randomNum],
        this.getStyle(),
        String(hash).repeat(this.repeat)
      );
      return this.elementGenerator(i, idx, Element);
    });
  
    return xashedElements;
  };
}

export default Xash;