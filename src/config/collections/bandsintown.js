module.exports.getDates = async (bandName, appName) => {
  const url = `https://rest.bandsintown.com/artists/${bandName}/events/?app_id=${appName}`
  try {
    const { default: fetch } = await import('node-fetch')
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const events = await response.json()
    const formattedEvents = events.map(event => ({
      id: event.id || '',
      url: event.url || '',
      datetime: event.datetime || '',
      title: event.title || '',
      description: event.description || '',
      tickets: (event.offers && event.offers.length > 0) ? event.offers[0].url : '',
      location: event.venue && event.venue.location || '',
      venue: event.venue && event.venue.name || '',
      address: event.venue && event.venue.street_address || '',
      city: event.venue && event.venue.city || '',
      country: event.venue && event.venue.country || ''
    }))
    return formattedEvents
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
