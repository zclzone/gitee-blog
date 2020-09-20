import settings from '@/settings'

const title = settings.title || '奇思笔记'

export function setPageTitle(pageTitle) {
  if (pageTitle) {
    return document.title = `${pageTitle} | ${title}`
  }
  document.title = title
}