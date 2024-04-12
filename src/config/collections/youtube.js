const ytpl = require('ytpl')

const getVideos = async (playlistId) => {
  try {
    const playlist = await ytpl(playlistId)
    return playlist.items
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

module.exports = {
  getVideos
}
