function isVideoPartiallyVisible(video) {
    const rect = video.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Verificar si al menos una parte del video es visible
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
    let autoplayFailed = false;

    videos.forEach(video => {
        // Intentar reproducir el video al cargar la página
        video.play().catch(error => {
            // Si falla, indicar que la reproducción automática falló
            autoplayFailed = true;
            console.log("No se puede reproducir automáticamente:", error);
        });
    });

    // Si la reproducción automática falla, mostrar un mensaje para la interacción del usuario
    if (autoplayFailed) {
        document.body.addEventListener('click', handleUserInteraction);
    }

    // Verificar la visibilidad inicial de los videos
    handleScroll();
}

function handleUserInteraction() {
    const videos = document.querySelectorAll('.video-observe');
    
    videos.forEach(video => {
        video.play();
    });

    // Remover el evento una vez que los videos han comenzado a reproducirse
    document.body.removeEventListener('click', handleUserInteraction);
}

document.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll); 
window.addEventListener('load', handlePageLoad);  
