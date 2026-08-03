export const getEventImage = (categoryId: number, _eventId: number, title: string): string => {
  const t = title.toLowerCase();

  if (t.includes('bad bunny')) return '/images/concerts/badbunny/GettyImages-2224719256-2048x1365.webp';
  if (t.includes('karol g')) return '/images/concerts/karolg/OIP.webp';
  if (t.includes('coldplay')) return '/images/concerts/coldplay/kh0sj.jpg';

  if (t.includes('olimpia')) return '/images/football/olimpiavsmotagua/principal_olimpia_vs_motagua.jpg';
  if (t.includes('champions league')) return '/images/football/championsleague/UEFA_Champions_League-e1748667977511.webp';
  if (t.includes('nba')) return '/images/basketball/Where-every-team-ranks-during-All-Star-break.webp';
  if (t.includes('fórmula 1')) return '/images/formula1/11.jpg';

  if (t.includes('cascanueces')) return '/images/theaters/TEATRO-MADRID-La-danza-del-futuro-1.webp';
  if (t.includes('hamilton')) return '/images/theaters/campanhas-de-popularizacao-do-teatro-no-brasil-conexao123.webp';

  if (t.includes('comic-con')) return '/images/conventions/comiccon/Comic-Con-NY.shutterstock_1197392752.jpg';
  if (t.includes('tech summit')) return '/images/conventions/techcon/HPE Tech Con Body image 2.avif';

  if (t.includes('league of legends')) return '/images/esports/lol/league-of-legends-tournaments-.jpg';
  if (t.includes('valorant')) return '/images/esports/valo/valorant.webp';
  if (t.includes('smash bros')) return '/images/esports/smash/OIP.webp';
  if (t.includes('rifa solidaria')) return '/images/ninswitch/switch.jpg';

  if (t.includes('cerveza')) return '/images/festivals/beer/beerfest.png';
  if (t.includes('food truck')) return '/images/festivals/food/Seafood-Festival-64a720e4bd6b9.webp';

  if (t.includes('anillos')) return '/images/cinema/lordoftherings/R.webp';
  if (t.includes('spiderman')) return '/images/cinema/spiderman/spider-man-4-even-better-than-homecoming-blended-image-with-tom-holland-s-spider-man-clinging-to-a-building.avif';

  if (t.includes('disney')) return '/images/family/disney/5076a03b-0521-4903-aed2-f148cb8dfb7f_SOURCE.jpg';
  if (t.includes('circo')) return '/images/family/circus/Venardos-247.jpg';


  switch (categoryId) {
    case 1: return '/images/concerts/coldplay/kh0sj.jpg';
    case 2: return '/images/football/championsleague/UEFA_Champions_League-e1748667977511.webp';
    case 4: return '/images/conventions/techcon/HPE Tech Con Body image 2.avif';
    case 5: return '/images/esports/lol/league-of-legends-tournaments-.jpg';
    case 6: return '/images/festivals/food/Seafood-Festival-64a720e4bd6b9.webp';
    case 7: return '/images/cinema/lordoftherings/R.webp';
    case 8: return '/images/family/circus/Venardos-247.jpg';
    case 9: return '/images/ninswitch/switch.jpg'; // Especiales
    default: return '/images/theaters/20180922_Opera-Mariachi-Cruzar-la-Cara-de-la-Luna_TNS_cmoreno_41-scaled.jpg';
  }
};
