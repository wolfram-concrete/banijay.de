import { NEWS, type NewsItem } from "./news";

type EnglishNewsCopy = Pick<NewsItem, "title" | "lead" | "body">;

// English editorial versions of all currently published German news stories.
// Dates, slugs and imagery remain identical so the language switch can preserve
// the article context and future CMS migration can use the slug as shared ID.
const ENGLISH_COPY: Record<string, EnglishNewsCopy> = {
  "n-christian-franckenstein-im-banijay-podcast-wolter-talks": {
    title: "Christian Franckenstein joins the Banijay podcast WOLTER TALKS",
    lead: "What lies ahead for Germany’s media industry? Banijay Germany CEO Marcus Wolter discusses the market’s future with Bavaria Film CEO Dr Christian Franckenstein in the latest WOLTER TALKS episode.",
    body: [
      "As CEOs of two major entertainment companies, they compete in many areas while sharing an interest in a strong German media market. Their open conversation covers the industry’s economic situation, public-service broadcaster holdings, the future of the dual broadcasting system and the international competitiveness of German producers.",
      "Franckenstein argues that sustainable growth is essential to retain and reward motivated teams. Wolter adds that companies must continually reinvent themselves by reaching new audiences, platforms and business models.",
      "They take different positions on public-service structures and market transparency, but agree that Germany needs a diverse and competitive production landscape. For Wolter, broadcasters and producers are partners whose future growth depends on shared success.",
    ],
  },
  "n-banijay-germany-gruendet-neue-company-mit-sebastian-lege": {
    title: "Banijay Germany launches a new company with Sebastian Lege",
    lead: "The Banijay family in Germany continues to grow. Together with food expert, chef and entertainer Sebastian Lege, the new Pausenclown Media GmbH will create and produce cross-platform food entertainment.",
    body: [
      "Sebastian Lege is one of Germany’s best-known food experts, combining product-development expertise with a strong television and digital presence. His formats on ZDF and VOX, the YouTube channel ‘b/esser’ and the LEGELAND lifestyle label reach millions of people.",
      "Marcus Wolter describes Pausenclown Media as a powerful combination of content and talent. Arno Schneppenheim and Imke Runde will lead the label as Managing Director and Executive Producer respectively.",
      "Lege wants to turn knowledge about food into compelling entertainment. Alongside premium television experiences, the company will also create opportunities for brand partnerships.",
    ],
  },
  "n-aaron-troschke-im-banijay-podcast-wolter-talks": {
    title: "Aaron Troschke joins the Banijay podcast WOLTER TALKS",
    lead: "Aaron Troschke first became known nationwide through ‘Who Wants to Be a Millionaire?’. Today he runs one of Germany’s most successful creator businesses and talks openly about money, reach and social-media mechanics.",
    body: [
      "Troschke’s YouTube channel ‘Hey Aaron!!!’ generates around €1.5 million in annual revenue, while his companies employ roughly 40 people. In WOLTER TALKS he explains why consistency, speed and an authentic relationship with the community are central to his success.",
      "He recalls how his appearance with Günther Jauch changed his life and how a disciplined weekly publishing rhythm has helped him build reach since 2013.",
      "For Troschke, television and social media are not opposing worlds. Marcus Wolter sees his story as evidence that the boundaries between creators and traditional entertainment are continuing to disappear.",
    ],
  },
  "n-marcus-wolter-zu-gast-im-brand-eins-podcast": {
    title: "Marcus Wolter joins the brand eins Podcast",
    lead: "For the tenth anniversary of the brand eins Podcast, Marcus Wolter joins host Christian Bollert as one of Germany’s most prominent media executives.",
    body: ["Their conversation explores the profound changes the entertainment industry has undergone in recent years and the decisions companies must make to remain relevant."],
  },
  "n-nelson-mller-im-banijay-podcast-wolter-talks": {
    title: "Nelson Müller joins the Banijay podcast WOLTER TALKS",
    lead: "Michelin-starred chef Nelson Müller discusses his fresh start at Diepeschrather Mühle and what it means to build a new culinary destination without taking an existing star for granted.",
    body: [
      "Müller explains why he moved his acclaimed restaurant Schote and created a new combination of fine dining, brasserie and boutique hotel near Cologne. The move brings both creative freedom and full entrepreneurial responsibility.",
      "The conversation shows that high-end gastronomy depends on consistency, operational excellence and emotional experience. Every evening matters, regardless of who is sitting in the restaurant.",
      "Marcus Wolter and Nelson Müller also discuss how a modern hospitality brand brings together craft, experience and commercial reality. The full episode is available on all major podcast platforms.",
    ],
  },
  "n-88-primetime-hitrate-im-mrz": {
    title: "88% primetime hit rate in March",
    lead: "A strong 88% hit rate for March: 22 of Banijay’s 26 primetime formats performed above their respective channel averages.",
    body: [
      "Congratulations to all teams, especially MadeFor’s ‘Das dunkle Vermächtnis’, as well as the teams behind ‘TV total’, ‘Who Wants to Be a Millionaire?’ and ‘Hast Du Töne’.",
      "Banijay Germany has published the monthly performance rate of its television primetime productions since April 2023, comparing the total number of shows with those performing above the broadcaster average.",
      "Since measurement began, the average hit rate has been 81%, with the previous high reaching 96% in May 2023.",
    ],
  },
  "n-max-schradin-im-banijay-podcast-wolter-talks": {
    title: "Max Schradin joins the Banijay podcast WOLTER TALKS",
    lead: "Max Schradin explains how he turned years of live-broadcast experience into a professional and distinctive creator business on Twitch.",
    body: [
      "From interactive television at 9Live to daily streams for thousands of viewers, Schradin has learned that live entertainment requires structure, consistency and a genuine connection with the audience.",
      "He discusses revenue from subscriptions, advertising, donations and long-term partnerships, and explains how YouTube and TikTok complement the Twitch business.",
      "Schradin and Marcus Wolter also explore what television and the creator economy can learn from each other — and why collaborations work only when they feel organic.",
    ],
  },
  "n-97-primetime-hitrate-im-januar": {
    title: "97% primetime hit rate in January",
    lead: "An outstanding start to 2026: 29 of the 30 Banijay primetime formats broadcast in January performed above their respective channel averages.",
    body: [
      "Congratulations to all teams, particularly MadeFor’s ‘Tatort Dresden’, along with the teams behind ‘Who Wants to Be a Millionaire?’, ‘TV total’ and the ‘Promi Darts WM’.",
      "The monthly Banijay hit rate creates transparent, comparable performance information for customers and the market. It measures how many primetime programmes outperform their channel average.",
      "The long-term average since measurement began is 81%, demonstrating the sustained strength of the group’s entertainment portfolio.",
    ],
  },
  "n-matthias-opdenhvel-im-banijay-podcast-wolter-talks": {
    title: "Matthias Opdenhövel joins the Banijay podcast WOLTER TALKS",
    lead: "Ahead of the 100th edition of ‘Schlag den Star’, presenter Matthias Opdenhövel talks about preparation, live entertainment and the milestones of his broadcasting career.",
    body: [
      "Opdenhövel traces his route from radio training and VIVA’s pioneering years to major sports broadcasts and the 2014 World Cup final at the Maracanã.",
      "He recalls the accessible, slightly chaotic spirit of early music television and explains how that experience shaped his presenting style.",
      "For Opdenhövel, good entertainment never happens by accident: preparation is essential, even when the final result should feel effortless and spontaneous.",
    ],
  },
  "n-annette-frier-im-banijay-podcast-wolter-talks": {
    title: "Annette Frier joins the Banijay podcast WOLTER TALKS",
    lead: "As the Brainpool series ‘Frier und Fünfzig’ launches, Annette Frier talks about reinvention, courage and why her desire to create is stronger than her fear of failure.",
    body: [
      "The dramedy follows a version of Frier herself at a point where life, family and career are changing. In the podcast she discusses the creative freedom and vulnerability involved in telling a story so close to her own experience.",
      "Her conversation with Marcus Wolter looks at longevity in entertainment, the value of curiosity and the confidence required to begin again.",
    ],
  },
  "n-88-primetime-hitrate-im-oktober": {
    title: "88% primetime hit rate in October",
    lead: "Banijay’s primetime formats achieved an 88% hit rate in October: 35 of 40 programmes performed above their respective channel averages.",
    body: ["The result reflects strong performances across the group’s production companies and a broad portfolio of entertainment formats in the relevant target groups."],
  },
  "n-87-primetime-hitrate-im-september": {
    title: "87% primetime hit rate in September",
    lead: "Banijay started the autumn with an 87% hit rate: 20 of 23 primetime programmes performed above their respective channel averages in September.",
    body: ["The monthly result continues the group’s consistently strong performance across entertainment, reality, comedy and factual formats."],
  },
  "n-brainpool-live-erffnet-nightwash-club": {
    title: "Brainpool Live opens the NightWash club",
    lead: "A new addition under the Banijay umbrella: Brainpool Live is opening Cologne’s first dedicated venue for live comedy and television broadcast events.",
    body: [
      "The NightWash club gives established acts and emerging comedy talent a permanent stage while creating a flexible home for recordings, events and new live formats.",
      "The venue expands Brainpool Live’s portfolio and strengthens Cologne’s position as a hub for comedy and entertainment production.",
    ],
  },
  "n-sansibar-grnder-herbert-seckler-im-banijay-podcast-qwolter-t": {
    title: "Sansibar founder Herbert Seckler joins WOLTER TALKS",
    lead: "In a rare interview on Sylt, Sansibar founder Herbert Seckler tells Marcus Wolter how necessity, instinct and hospitality shaped one of Germany’s best-known restaurant brands.",
    body: [
      "Seckler usually avoids interviews and public appearances. In WOLTER TALKS he shares the entrepreneurial decisions behind Sansibar and the principles that helped turn a local restaurant into a nationally recognised brand.",
      "The episode explores authenticity, service, leadership and the long-term value of building a place people want to return to.",
    ],
  },
  "n-zwei-generationen-comedy-bei-wolter-talks": {
    title: "Nadine Grünfeld joins Brainpool’s management team",
    lead: "Marcus Wolter is bringing Nadine Grünfeld into Brainpool’s management team. She returns to Banijay Germany in September 2025.",
    body: [
      "Grünfeld brings extensive experience in comedy and entertainment development and will help shape Brainpool’s future portfolio alongside the existing management team.",
      "Her return strengthens the company’s creative leadership and its focus on distinctive talent, formats and long-term brands.",
    ],
  },
  "n-89-primetime-hitrate-im-juli": {
    title: "89% primetime hit rate in July",
    lead: "Banijay formats achieved an 89% hit rate in July, with 25 of 28 primetime programmes performing above their respective channel averages.",
    body: ["The result underlines the continued strength of the group’s formats across Germany’s leading broadcasters and platforms."],
  },
  "n-verona-pooth-ber-ihr-erfolgsrezept-im-banijay-podcast-wolter": {
    title: "Verona Pooth joins the Banijay podcast WOLTER TALKS",
    lead: "Verona Pooth discusses storytelling, honesty and discipline — the principles that have helped her reinvent herself throughout a long career in German entertainment.",
    body: [
      "Pooth talks to Marcus Wolter about building a personal brand, staying relevant through changing media cycles and combining intuition with rigorous preparation.",
      "The episode also explores entrepreneurship, public perception and why authenticity remains essential when audiences follow a personality across decades and platforms.",
    ],
  },
  "n-90-primetime-hitrate-im-juni": {
    title: "90% primetime hit rate in June",
    lead: "Banijay power in primetime: 26 of the group’s 29 shows broadcast in June performed above their respective channel averages.",
    body: ["The 90% result celebrates the work of teams across the group and the sustained audience appeal of Banijay’s entertainment portfolio."],
  },
  "n-89-primetime-hitrate-im-mai": {
    title: "89% primetime hit rate in May",
    lead: "Twenty-five of the 28 Banijay primetime shows broadcast in May achieved audience shares above their respective channel averages.",
    body: ["The result represents an 89% monthly hit rate and continues Banijay Germany’s strong run across broadcasters and genres."],
  },
  "n-81-primetime-hitrate-im-april": {
    title: "81% primetime hit rate in April",
    lead: "Twenty-two of the 27 Banijay primetime shows broadcast in April performed above their respective channel averages, producing an 81% hit rate.",
    body: ["The monthly measurement provides transparent performance data for Banijay Germany’s television productions and recognises the teams behind the results."],
  },
  "n-83-primetime-hitrate-im-januar": {
    title: "83% primetime hit rate in January",
    lead: "A successful start to the year with an 83% primetime hit rate in January.",
    body: ["The result reflects another strong month for Banijay Germany’s productions across major broadcasters and relevant audience groups."],
  },
  "n-88-banijay-primetime-hitrate-im-oktober": {
    title: "88% Banijay primetime hit rate in October",
    lead: "Thirty of the 34 Banijay primetime shows broadcast in October achieved audience shares above their respective channel averages, resulting in an 88% hit rate.",
    body: [
      "Congratulations to the teams behind October’s leading performances, including ‘Promi Big Brother’, ‘TV total’ and ‘Armes Deutschland – Deine Kinder’.",
      "The month also marked the 25th anniversary of ‘Who Wants to Be a Millionaire?’, whose anniversary special delivered another outstanding audience share.",
      "Banijay Germany’s monthly hit-rate reporting compares all primetime broadcasts with the number that outperform the relevant broadcaster average.",
    ],
  },
  "n-banijay-germany-setzt-kuenftig-auf-drei-non-fiction-labels": {
    title: "Banijay Germany to focus on three non-fiction labels",
    lead: "Banijay Germany is strengthening Brainpool and Banijay Productions with additional formats and an expanded management structure as it focuses on three non-fiction labels.",
    body: [
      "Shona Fraser and Florian Göbels are joining Brainpool’s management team as producers, alongside Godehard Wolpers. Fraser will establish a new light-entertainment unit, while Göbels continues to oversee major entertainment formats and events.",
      "Good Times will not continue as a separate production label. Its established programme brands will move to Banijay Productions under Arno Schneppenheim, while current productions remain with Fraser and her team.",
      "Marcus Wolter says the new structure brings producer talent and format brands closer together and strengthens Brainpool and Banijay Productions for the future.",
    ],
  },
  "n-banijay-und-marcus-wolter-in-der-faz": {
    title: "Banijay and Marcus Wolter featured in the FAZ",
    lead: "‘The Showman’: the Frankfurter Allgemeine Zeitung profiles Banijay Germany CEO Marcus Wolter and his instinct for distinguishing strong ideas from weak ones.",
    body: [
      "Wolter talks to the newspaper about Banijay, format development, leadership and what he sees as excessive pessimism within the industry.",
      "The profile also explores why creative decisions require conviction, what makes a good leader and why failing to develop VIVA for the next generation was a missed opportunity.",
    ],
  },
  "n-72-banijay-primetime-hitrate-im-juli": {
    title: "72% Banijay primetime hit rate in July",
    lead: "Thirteen of the 18 Banijay primetime shows broadcast in July performed above their respective channel averages, resulting in a solid 72% summer hit rate.",
    body: [
      "Highlights included ‘Schlag den Star’, the return of ‘Hast du Töne?’ and a ratings record for ‘Achtung Abzocke – Urlaubsbetrügern auf der Spur’.",
      "Further successes came from ‘Kitchen Impossible’, ‘Die besten Comedians Deutschlands’, ‘Hot oder Schrott – Promi Spezial’ and ‘Yes we camp!’. The month also saw the streaming launch of MadeFor’s ‘Alles gelogen’.",
      "The monthly hit rate compares Banijay Germany’s full primetime output with the number of shows performing above broadcaster averages.",
    ],
  },
  "n-84-banijay-primetime-hitrate-im-juni": {
    title: "84% Banijay primetime hit rate in June",
    lead: "Sixteen of the 19 Banijay primetime shows broadcast in June performed above their respective channel averages — an excellent 84% result during a month dominated by live European Championship coverage.",
    body: [
      "Top performances came from Brainpool, EndemolShine and Banijay Productions formats including ‘TV total Autoball EM’, ‘TV total’, ‘Schlag den Star’, ‘Hast du Töne?’, ‘Die Höhle der Löwen’ and ‘Kampf der Realitystars’.",
      "Banijay Germany publishes the hit rate to provide transparent and comparable primetime performance information for customers and the wider market.",
    ],
  },
  "n-90-banijay-primetime-hitquote-im-mai": {
    title: "90% Banijay primetime hit rate in May",
    lead: "Twenty-eight of 31 Banijay primetime shows broadcast in May achieved audience shares above their respective channel averages — a 90% hit rate.",
    body: [
      "Leading performances included ‘Who Wants to Be a Millionaire?’, ‘The Masked Singer’, ‘TV total’, ‘Die besten Comedians Deutschlands’, ‘Die Höhle der Löwen’, ‘Hast du Töne?’ and ‘Kampf der Realitystars’.",
      "The monthly metric makes the performance of production companies more transparent by comparing total primetime output with the number of above-average broadcasts.",
    ],
  },
  "n-laura-wontorra-zu-gast-im-banijay-podcast--wolter-talks": {
    title: "Laura Wontorra joins the Banijay podcast WOLTER TALKS",
    lead: "Sports presenter Laura Wontorra talks to Marcus Wolter about football, career-defining decisions, work-life balance and whether ‘Die Wontis’ could become the next documentary-soap hit.",
    body: [
      "Ahead of major Champions League and European Championship broadcasts, Wontorra explains how her passion for football shaped her career and why private stadium visits remain important to her.",
      "The conversation covers the role of family, the setbacks behind a successful public career and the value of staying curious across sport and entertainment formats.",
      "WOLTER TALKS offers a look behind the scenes of the media industry and explores how entertainment is produced and consumed today and in the future.",
    ],
  },
  "n-banijay-germany-mit-steigender-primetime-hitrate-im-april": {
    title: "Banijay Germany’s primetime hit rate rises in April",
    lead: "Banijay Germany’s monthly primetime hit rate climbed to a new high for the year, with 88% of April’s formats performing above their respective channel averages.",
    body: [
      "Twenty-nine of the 30 Banijay primetime shows broadcast in April outperformed their channel averages. Streaming and daytime productions also delivered strong results.",
      "The strongest primetime performances came from EndemolShine, Brainpool and Banijay Productions formats across ProSieben, RTL and RTLZWEI.",
      "Since monthly measurement began, Banijay Germany’s average primetime hit rate has remained at 81%.",
    ],
  },
  "n-carsten-maschmeyer-zu-gast-im-banijay-podcast--wolter-talks": {
    title: "Carsten Maschmeyer joins the Banijay podcast WOLTER TALKS",
    lead: "Investor, start-up mentor and ‘Die Höhle der Löwen’ regular Carsten Maschmeyer talks to Marcus Wolter about leadership, personal highs and lows, faith, envy and his hopes for the future.",
    body: [
      "The episode explores Maschmeyer’s role on ‘Die Höhle der Löwen’, the personal conversations behind major decisions and the responsibilities that come with investing in founders.",
      "WOLTER TALKS brings Marcus Wolter together with producers, artists and media personalities to discuss creativity, leadership and the entertainment industry’s future.",
      "Previous guests have included Nanni Erben, Rainer Laux, Klaas Heufer-Umlauf and Knossi.",
    ],
  },
  "n-banijay-germany-mit-starker-hitrate-in-der-primetime-im-mrz": {
    title: "Strong March primetime hit rate for Banijay Germany",
    lead: "Twenty-six of Banijay Germany’s 30 primetime premieres in March performed above their broadcaster averages — the strongest result of the year to date.",
    body: [
      "The result represents an 87% hit rate among viewers aged 14–49. Long-running brands such as ‘Who Wants to Be a Millionaire?’ and ‘Kitchen Impossible’ contributed alongside competition and comedy formats.",
      "‘TV total’, ‘Die besten Comedians Deutschlands’, ‘40 Jahre RTL Comedy’ and ‘Bratwurst & Baklava’ also performed strongly, while ‘The 50’ launched on Prime Video.",
      "The monthly hit rate provides customers and the market with a transparent comparison between total primetime output and above-average performance.",
    ],
  },
  "n-banijay-germany-holt-zwei-der-helgoland-513-produzenten-in-d": {
    title: "Banijay Germany welcomes two ‘Helgoland 513’ producers to the group",
    lead: "Banijay Germany is expanding its in-house fiction expertise by investing in Dynamic Ally Pictures, the Berlin production company founded by Veronica Priefer and Johannes Kunkel.",
    body: [
      "Priefer and Kunkel first worked together on the post-apocalyptic series ‘Helgoland 513’ and have since developed and produced serial fiction for German and international audiences.",
      "They founded Dynamic Ally Pictures in 2023 to develop, package and distribute predominantly serial television formats. The partnership adds their contemporary storytelling perspective and hands-on approach to Banijay Germany.",
      "Marcus Wolter welcomes the founders to the group, while Priefer and Kunkel describe Banijay as the entrepreneurial partner best placed to support their creative vision.",
    ],
  },
};

export const NEWS_EN: NewsItem[] = NEWS.map((item) => ({
  ...item,
  category: item.category === "News" ? "News" : item.category,
  author: "Editorial team",
  ...(ENGLISH_COPY[item.slug] ?? {
    title: item.title,
    lead: item.lead,
    body: item.body,
  }),
}));

export function getEnglishNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS_EN.find((item) => item.slug === slug);
}
