const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: 'blue',
    speedX: 5,
    speedY: 5,
    gravity: 0.1, // Simulate a slight downward pull
    friction: 0.9, // Dampen velocity after bounces
};

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Function to update ball position and handle collisions
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    ball.speedY += ball.gravity; // Apply gravity

    // Bounce off walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX * ball.friction;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY * ball.friction;
    }

    // Stop ball from getting stuck in walls
    ball.x = Math.max(ball.radius, Math.min(ball.x, canvas.width - ball.radius));
    ball.y = Math.max(ball.radius, Math.min(ball.y, canvas.height - ball.radius));

}

// Function to handle mouse clicks (hitting the ball)
function handleMouseClick(event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    // Calculate distance between mouse click and ball center
    const distance = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);

    // If the click is within the ball's radius, apply a force
    if (distance < ball.radius) {
        const angle = Math.atan2(mouseY - ball.y, mouseX - ball.x);
        const force = 10; // Adjust force as needed
        ball.speedX += Math.cos(angle) * force;
        ball.speedY += Math.sin(angle) * force;
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    updateBall();
    drawBall();
    requestAnimationFrame(animate); // Request the next animation frame
}

// Event listener for mouse clicks
canvas.addEventListener('click', handleMouseClick);

// Start the animation
animate();
