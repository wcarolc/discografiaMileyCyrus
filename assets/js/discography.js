// fetch('https://api.discogs.com/artists/676432/releases')
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// const albumCoverDiv = document.getElementsByClassName('albumCoverDiv');
// const albumTitle = document.getElementsByClassName('albumTitle');
// const albumInfo = document.getElementsByClassName('albumInfo');

fetch(
  'https://api.discogs.com/database/search?type=master&format=album&sort=year&sort_order=desc&artist=miley%20cyrus',
  {
    headers: {
      Authorization:
        'Discogs key=[key],secret=[secret]',
    },
  }
)
  .then(response => response.json())
  .then(results => {
    console.log(results);
    showAlbuns(results);
  })
  .catch(error => console.error(error));

function showAlbuns(data) {
  const discographySection = document.getElementById('discography'); // pegar a área toda da discografia
  discographySection.innerHTML = ''; // limpar todo o HTML atual

  // ver se tem algum resultado
  if (data.results && data.results.length > 0) {
    data.results.forEach(album => {
      const itemAlbum = document.createElement('div');
      itemAlbum.classList.add('item-disc');

      // pegar capas dos álbuns
      const albumCover = document.createElement('div');
      albumCover.classList.add('albumCover');
      const albumCoverImg = document.createElement('img');
      albumCoverImg.src = album.cover_image || 'assets/images/capa-teste.jpg'; // se não tiver imagem, colocar a de teste
      albumCoverImg.alt = album.title;
      albumCover.appendChild(albumCoverImg);
      albumCover.innerHTML += '<div class="jewel-overlay"></div>'; // adicionar o overlay da case

      // título do álbum
      const albumTitle = document.createElement('h3');
      albumTitle.classList.add('albumTitle');
      albumTitle.innerText = album.title;

      // Remover "Miley Cyrus -" do título do álbum
      const cleanedTitle = album.title.replace(
        /^(Hannah Montana, Miley Cyrus -|Hannah Montana \/ Miley Cyrus -|Miley Cyrus -)\s*/,
        ''
      );
      albumTitle.innerText = cleanedTitle; // Remove os prefixos indesejados

      // informações do álbum
      const albumInfo = document.createElement('div');
      albumInfo.classList.add('albumInfo');
      // limitar o número de gravadoras
      const maxLabels = 2; // Defina o número máximo de labels que você quer mostrar
      const labelShow = album.label
        ? album.label.slice(0, maxLabels).join(', ')
        : 'N/A';
      albumInfo.innerHTML = `
      <span>${labelShow}</span>
        <span><b>Year:</b> ${album.year || 'N/A'}</span>
      `;

      // genre:         <span><b>Genre:</b> ${album.style ? album.style.join(', ') : 'N/A'}</span>

      // adicionar elementos no album div
      itemAlbum.appendChild(albumCover);
      itemAlbum.appendChild(albumTitle);
      itemAlbum.appendChild(albumInfo);

      // colocar a div do álbum na section
      discographySection.appendChild(itemAlbum);
    });
  } else {
    discographySection.innerHTML = '<p>Nenhum álbum encontrado.</p>';
  }
}
