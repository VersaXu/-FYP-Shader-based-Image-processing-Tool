// 下载文件流方法，推荐使用axios blob方式下载，体验较好
export function downloadFile(url: string, downloadName = ''): void {
  let a: HTMLAnchorElement | null = document.createElement('a')
  a.style.display = 'none'
  a.setAttribute('download', downloadName)
  a.setAttribute('href', url)
  a.click() // 模拟触发a便签的点击事件
  a = null
}
// 文件流形式下载
export const fileDownload = (res: any, diyName = '') => {
  const filename = res.headers['content-disposition'] || diyName
  const blob = new Blob([res.data])
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  const name = filename?.split('filename=')[1]?.split(';')[0] || diyName
  link.download = decodeURIComponent(name)
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}
/**
 * 动态获取本地图片连接
 * @param name images下得图片名称，例:test.png, product/test.png
 * @returns url
 */
export function getImageUrl(name: string) {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href
}
