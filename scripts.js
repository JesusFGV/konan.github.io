function isVideoPartiallyVisible(video) {
    const rect = video.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const verticallyVisible = rect.top < windowHeight && rect.bottom > 0;
    const horizontallyVisible = rect.left < windowWidth && rect.right > 0;
    return verticallyVisible && horizontallyVisible;
}
function handleScroll() {
    const videos = document.querySelectorAll('.video-observe');

    videos.forEach(video => {
        if (isVideoPartiallyVisible(video)) {
            video.play();
        } else {
            video.pause();
        }
    });
}
function handlePageLoad() {
    const videos = document.querySelectorAll('.video-observe');
    videos.forEach(video => {
        video.play().catch(error => {
            console.log("No se puede reproducir automáticamente:", error);
        });
    });
    handleScroll();
}
document.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll); 
window.addEventListener('load', handlePageLoad);  
