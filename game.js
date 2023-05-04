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

function displayAttackMessage(attacker, damage, defender, remainingHp) {
  const combatLog = document.getElementById('combat-log');
  const message = document.createElement('p');
  message.textContent = `${attacker} dealt ${damage} damage to ${defender}. ${defender} has ${remainingHp} HP remaining.`;
  combatLog.appendChild(message);
}

function displayMissMessage(attacker, defender) {
  const combatLog = document.getElementById('combat-log');
  const message = document.createElement('p');
  message.textContent = `${attacker} missed their attack on ${defender}.`;
  combatLog.appendChild(message);
}

function displayDefeatMessage(defeated) {
  const combatLog = document.getElementById('combat-log');
  const message = document.createElement('p');
  message.textContent = `${defeated} was defeated.`;
  combatLog.appendChild(message);
}

function performAttack(attacker, defender) {
  if (Math.random() <= 0.5) {
    const damage = Math.floor(Math.random() * 6) + 5;
    defender.hp -= damage;
    if (defender.hp < 0) {
      defender.hp = 0;
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

initializeGame();
