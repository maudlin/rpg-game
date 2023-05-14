let player;
let npc;

function initializeGame(characterType) {
  const playerConfig = config.characterConfig[characterType];
  player = new Character(
    characterType,
    playerConfig.hp,
    playerConfig.hp, // Add this line to set maxHp for the player
    playerConfig.attackSpeed * 1000,
    playerConfig.chanceToHit,
    playerConfig.minDamage,
    playerConfig.maxDamage
  );

  const npcConfig = config.characterConfig.robot;
  npc = new Character(
    'Robot',
    npcConfig.hp,
    npcConfig.hp, // Add this line to set maxHp for the npc
    npcConfig.attackSpeed * 1000,
    npcConfig.chanceToHit,
    npcConfig.minDamage,
    npcConfig.maxDamage
  );

  updateHpBars(player, npc);
}


initializeGame('wizard');

function performAttack(attacker, defender) {
  if (Math.random() < attacker.chanceToHit) {
    const damage = Math.floor(Math.random() * (attacker.maxDamage - attacker.minDamage + 1)) + attacker.minDamage;
    defender.takeDamage(damage);
    addCombatLogMessage(`${attacker.name} hit ${defender.name} for ${damage} damage. ${defender.name} has ${defender.hp} HP remaining.`);
  } else {
    addCombatLogMessage(`${attacker.name} missed ${defender.name}.`);
  }
}

function runCombatRound(attacker, defender) {
  if (attacker.hp === 0 || defender.hp === 0) {
    if (attacker.hp === 0) {
      addCombatLogMessage(`${attacker.name} has been defeated.`);
      if (attacker === player) {
        showGameOverMessage("You Lose");
      } else {
        showGameOverMessage("You Win!");
      }
    }
    if (defender.hp === 0) {
      addCombatLogMessage(`${defender.name} has been defeated.`);
      if (defender === player) {
        showGameOverMessage("You Lose");
      } else {
        showGameOverMessage("You Win!");
      }
    }
    return;
  }

  performAttack(attacker, defender);
  updateHpBars(attacker, defender);
}

function runCombat() {
  if (player.hp === 0 || npc.hp === 0) {
    return;
  }

  runCombatRound(player, npc);
  setTimeout(() => {
    runCombatRound(npc, player);
  }, npc.attackSpeed);

  setTimeout(() => {
    runCombat(player, npc);
  }, player.attackSpeed);
}

function updateHpBars(player, npc) {
  const playerHpBar = document.getElementById("player-inner-health-bar");
  const playerHpText = document.getElementById("player-hp");
  const npcHpBar = document.getElementById("npc-inner-health-bar");
  const npcHpText = document.getElementById("npc-hp");

  playerHpBar.style.width = `${(player.hp / player.maxHp) * 100}%`;
  playerHpText.textContent = `Player (${player.name}): ${player.hp}/${player.maxHp}`;
  npcHpBar.style.width = `${(npc.hp / npc.maxHp) * 100}%`;
  npcHpText.textContent = `NPC (${npc.name}): ${npc.hp}/${npc.maxHp}`;
}