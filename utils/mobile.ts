export const checkIsMobile = () => {
    if (typeof window !== "undefined") {
        const deviceAgent = window.navigator.userAgent
        const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(deviceAgent)
        return isMobile
    }
    return false
}
