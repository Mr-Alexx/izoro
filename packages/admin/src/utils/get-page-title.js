import defaultSettings from '@/settings'

const title = defaultSettings.title || '洋桃好货'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
