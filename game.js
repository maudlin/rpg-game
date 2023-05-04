// game.js
const config = {
    timePerTurn: 3000, // Time in milliseconds
  };
  
  class Character {
    constructor(name, hp) {
      this.name = name;
      this.hp = hp;
    }
  
    isAlive() {
      return this.hp > 0;
    }
  
    takeDamage(damage) {
      this.hp -= damage;
      if (this.hp < 0) {
        this.hp = 0;
      }
    }
  }
  
  function autoAttack(attacker, defender) {
    const isHit = Math.random() < 0.5;
    if (!isHit) {
      return 0;
    }
  
    const damage = Math.floor(Math.random() * 6) + 5;
    defender.takeDamage(damage);
    return damage;
  }
  
  function combatRound(attacker, defender, player, npc) {
    const damage = autoAttack(attacker, defender);
    updateHp(defender === player ? 'player-hp' : 'npc-hp', defender.hp);
    updateCombatLog(attacker, damage, defender);
  
    if (!defender.isAlive()) {
      addLogMessage(`${defender.name} is defeated.`);
      return false;
    }
  
    return true;
  }
  
  function updateCombatLog(attacker, damage, defender) {
    if (damage > 0) {
      addLogMessage(`${attacker.name} dealt ${damage} damage to ${defender.name}. Remaining HP: ${defender.hp}`);
    } else {
      addLogMessage(`${attacker.name} missed their attack on ${defender.name}.`);
    }
  }

  function updateHp(elementId, hp) {
    document.getElementById(elementId).innerText = hp;
  }
  
  function addLogMessage(message) {
    const log = document.getElementById('log');
    const listItem = document.createElement('li');
    listItem.innerText = message;
    log.appendChild(listItem);
  }
  
  function runCombat(attacker, defender, player, npc) {
    if (combatRound(attacker, defender, player, npc)) {
      setTimeout(() => runCombat(defender, attacker, player, npc), config.timePerTurn);
    } else {
      const startCombatButton = document.getElementById('start-combat');
      startCombatButton.disabled = false;
    }
  }
  
  function initializeGame() {
    const player = new Character("Player", 100);
    const npc = new Character("NPC", 100);
  
    const startCombatButton = document.getElementById('start-combat');
    startCombatButton.addEventListener('click', () => {
      startCombatButton.disabled = true;
      runCombat(player, npc, player, npc);
    });
  }
  
  initializeGame();
  