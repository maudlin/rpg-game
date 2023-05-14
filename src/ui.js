function addCombatLogMessage(message) {
  const combatLogContent = document.querySelector(".combat-log-content");
  const newMessage = document.createElement("div");
  newMessage.textContent = message;
  combatLogContent.appendChild(newMessage);
  scrollToBottom(combatLogContent);
}

function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input[name='character']").forEach((input) => {
    input.addEventListener("change", (event) => {
      const selectedCharacter = event.target.value;
      if (selectedCharacter === "wizard") {
        initializeGame("wizard");
      } else if (selectedCharacter === "robot") {
        initializeGame("robot");
      }
    });
  });

  document.getElementById("start-combat").addEventListener("click", () => {
    runCombat();
  });
});

function showGameOverMessage(message) {
  const gameOverMessage = document.getElementById("game-over-message");
  gameOverMessage.textContent = message;
  gameOverMessage.classList.add("active");
}