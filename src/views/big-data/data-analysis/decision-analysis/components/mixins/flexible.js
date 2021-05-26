export default function flexible(res) {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return
  const fontSize = clientWidth / 1920
  return res * fontSize
}
