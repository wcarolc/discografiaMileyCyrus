// fetch('https://api.discogs.com/artists/676432/releases')
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// const albumCover = document.getElementsByClassName('albumCover');
// const albumTitle = document.getElementsByClassName('albumTitle');
// const albumInfo = document.getElementsByClassName('albumInfo');

fetch(
  'https://api.discogs.com/database/search?type=master&format=album&sort=year&sort_order=desc&artist=miley%20cyrus',
  {
    headers: {
      Authorization:
        'Discogs key=fnmsMKHxIregIxrNSJfv,secret=fIoIsXnWqlwvqTihdCayHjJulWbfwGiJ',
    },
  }
)
  .then((response) => response.json())
  .then((results) => {
    console.log(results);
  })
  .catch((error) => console.error(error));
