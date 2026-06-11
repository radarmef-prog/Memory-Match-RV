const ThemeCatalog = {
  saints: {
    name: 'Santos Católicos',
    className: 'theme-saints',
    imageFolder: 'assets/themes/santos',
    cards: [
      '1.JPG',
      '2.JPG',
      '3.JPG',
      '4.JPG',
      '5.JPG',
      '6.JPG',
      '7.JPG',
      '8.JPG',
      '9.JPG',
      '10.JPG',
      '11.JPG',
      '12.JPG',
      '13.JPG',
      '14.JPG',
      '15.JPG',
      '16.JPG',
      '17.PNG',
      '18.JPG',
      '19.JPG',
      '20.JPG',
      '21.jpg',
      '22.jpg',
      '23.jpg',
      '24.webp',
      '25.webp',
      '26.jpg',
      '27.jpg',
      '28.jpg',
      '29.jpg',
      '30.webp',
      '31.webp',
      '32.jpg'
    ]
  },
  worldcup: {
    name: 'Selecciones del Mundial',
    className: 'theme-worldcup',
    imageFolder: 'assets/themes/players',
    cards: [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.jpg',
      '10.jpg',
      '11.jpg',
      '12.jpg',
      '13.jpg',
      '14.jpg',
      '15.jpg',
      '16.jpg',
      '17.jpg',
      '18.jpg',
      '19.jpg',
      '20.jpg',
      '21.jpg',
      '22.jpg',
      '23.jpg',
      '24.jpg',
      '25.jpg',
      '26.jpg',
      '27.jpg',
      '28.jpg',
      '29.jpg',
      '30.jpg',
      '31.jpg',
      '32.jpg'
    ]
  },
  professors: {
    name: 'Profesores URU',
    className: 'theme-professors',
    imageFolder: 'assets/themes/uru',
    cards: [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.jpg',
      '10.jpg',
      '11.jpg',
      '12.jpg',
      '13.jpg',
      '14.jpg',
      '15.jpg',
      '16.jpg',
      '17.jpg',
      '18.jpg',
      '19.jpg',
      '20.jpg',
      '21.jpg',
      '22.jpg',
      '23.jpg',
      '24.jpg',
      '25.jpg',
      '26.jpg',
      '27.jpg',
      '28.jpg',
      '29.jpg',
      '30.jpg',
      '31.jpg',
      '32.jpg'
    ]
  }
};

function getThemeCards(themeKey, pairCount) {
  const theme = ThemeCatalog[themeKey] || ThemeCatalog.saints;
  const cards = [...theme.cards];
  while (cards.length < pairCount) {
    cards.push(...theme.cards);
  }
  return shuffleArray(cards).slice(0, pairCount);
}

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

