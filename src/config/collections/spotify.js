require('dotenv').config()
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

const getAlbum = async (id) => {
  try {
    const album = await spotifyApi.getAlbum(id)
    const { name, release_date, external_urls, images } = album.body
    const { spotify: url } = external_urls
    const cover = images.length > 0 ? images[0].url : null
    return { name, release_date, url, cover }
  } catch (error) {
    console.error(`Error fetching album with id ${id}:`, error)
    return null
  }
}

const getAlbums = async (ids) => {
  try {
    const token = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(token.body.access_token)
    const albumPromises = ids.map(getAlbum)
    const albums = await Promise.all(albumPromises)
    return albums.filter(album => album !== null)
  } catch (error) {
    console.error('Error fetching albums:', error)
    return []
  }
}

module.exports = {
  getAlbums
}
