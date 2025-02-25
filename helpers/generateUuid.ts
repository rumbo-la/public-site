export const generateUuid = () => {
  const randomPart = Math.random().toString(36).substr(2, 9);
  const timestamp = Date.now().toString(36);
  return `${randomPart}-${timestamp}`
}