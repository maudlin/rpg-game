// game.js
const config = {
  timePerTurn: 500, // Time in milliseconds
};

const CharacterType = {
  WIZARD: {
    name: 'Wizard',
    health: 100,
    resistances: {}, // Add resistances here
    damageTypes: {}, // Add damage types here
  },
  ROBOT: {
    name: 'Robot',
    health: 120,
    resistances: {}, // Add resistances here
    damageTypes: {}, // Add damage types here
  },
};

class Character {
  constructor(type) {
    this.name = type.name;
    this.maxHp = type.health;
    this.hp = this.maxHp;
    this.resistances = type.resistances;
    this.damageTypes = type.damageTypes;
  }
}

function displayMessage(message) {
  const combatLog = document.getElementById("combat-log");
  const p = document.createElement("p");
  p.textContent = message;
  combatLog.appendChild(p);

  // Autoscroll to the bottom of the combat log
  combatLog.scrollTop = combatLog.scrollHeight;
}


function displayAttackMessage(attacker, damage, defender, remainingHp) {
  const message = `${attacker} attacks ${defender} for ${damage} damage. ${defender} has ${remainingHp} HP remaining.`;
  displayMessage(message);
}

function displayMissMessage(attacker, defender) {
  const message = `${attacker} misses their attack on ${defender}.`;
  displayMessage(message);
}

function displayDefeatMessage(defeatedCharacter) {
  const message = `${defeatedCharacter} has been defeated.`;
  displayMessage(message);
}


function performAttack(attacker, defender) {
  if (Math.random() <= 0.5) {
    const damage = Math.floor(Math.random() * 6) + 5;
    defender.hp -= damage;

    // Make sure the HP doesn't go below 0
    if (defender.hp <= 0) {
      defender.hp = 0;
      displayDefeatMessage(defender.name);
    }

    displayAttackMessage(attacker.name, damage, defender.name, defender.hp);
  } else {
    displayMissMessage(attacker.name, defender.name);
  }
}

function runCombat(player, npc, attacker, defender) {
  if (player.hp === 0 || npc.hp === 0) {
    if (player.hp === 0) displayDefeatMessage(player.name);
    if (npc.hp === 0) displayDefeatMessage(npc.name);
    return;
  }

  performAttack(attacker, defender);

  document.getElementById('player-hp').textContent = player.hp;
  document.getElementById('npc-hp').textContent = npc.hp;

  updateHpBars(player, npc);

  setTimeout(() => {
    runCombat(player, npc, defender, attacker);
  }, config.timePerTurn);
}

function initializeGame() {
  const characterSelectionForm = document.getElementById('character-selection');
  const startCombatButton = document.getElementById('start-combat');

  characterSelectionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedCharacter = document.querySelector('input[name="character"]:checked').value;
    const player = new Character(CharacterType[selectedCharacter]);
    const npc = new Character(CharacterType.ROBOT);

    characterSelectionForm.style.display = 'none';

    startCombatButton.addEventListener('click', () => {
      startCombatButton.disabled = true;
      runCombat(player, npc, player, npc);
    });

    startCombatButton.style.display = 'block';
  });
}

function updateHpBars(player, npc) {
  document.getElementById('player-hp-bar').style.width = (player.hp / player.maxHp) * 100 + '%';
  document.getElementById('npc-hp-bar').style.width = (npc.hp / npc.maxHp) * 100 + '%';
}

initializeGame();
