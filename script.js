const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createFirework(x, y) {
    for (let i = 0; i < 20; i++) {
        let angle = (Math.PI * 2 * i) / 20;
        let speed = Math.random() * 5 + 2;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;

        particles.push({ x, y, vx, vy, alpha: 1 });
    }
}

let particles = [];
function updateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        
        ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        if (p.alpha <= 0) particles.splice(index, 1);
    });

    requestAnimationFrame(updateFireworks);
}

document.getElementById("surprise-btn").addEventListener("click", (event) => {
    createFirework(event.clientX, event.clientY);
    updateFireworks();
});
