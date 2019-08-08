import ReactGA from 'react-ga'
const dev = process.env.NODE_ENV !== "production";

export const initGA = () => {
  if (dev) {
    return
  }
  console.log('GA init')
  ReactGA.initialize('UA-145338082-1')
}
export const logPageView = () => {
  if (dev) {
    return
  }
  console.log(`Logging pageview for ${window.location.pathname}`)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
export const logEvent = (category = '', action = '') => {
  if (dev) {
    return
  }
  if (category && action) {
    ReactGA.event({ category, action })
  }
}
export const logException = (description = '', fatal = false) => {
  if (dev) {
    return
  }
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}