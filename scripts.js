function isVideoCompletelyVisible(video) {
    const rect = video.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const videos = document.querySelectorAll('.video-observe');

    videos.forEach(video => {
        if (isVideoCompletelyVisible(video)) {
            video.play();
        } else {
            video.pause();
        }
    });
}


document.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll); 
window.addEventListener('load', handleScroll);  
