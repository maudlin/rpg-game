// Spec file: gameSpec.js

describe("Wizard vs Robot Game", () => {
    beforeEach(() => {
      initializeGame('wizard');
    });
  
    describe("Game Initialization", () => {
      it("should initialize player with the chosen character type", () => {
        expect(player.name).toEqual('wizard');
      });
  
      it("should initialize npc with the remaining character type", () => {
        expect(npc.name).toEqual('Robot');
      });
    });
  
    describe("Displaying Character Stats", () => {
      it("should display player's current and max HP", () => {
        const playerHpText = document.getElementById("player-hp").textContent;
        expect(playerHpText).toEqual(`Player (wizard): ${player.hp}/${player.maxHp}`);
      });
  
      it("should display npc's current and max HP", () => {
        const npcHpText = document.getElementById("npc-hp").textContent;
        expect(npcHpText).toEqual(`NPC (Robot): ${npc.hp}/${npc.maxHp}`);
      });
    });
  
    describe("Combat Mechanics", () => {
      beforeEach(() => {
        spyOn(window, 'addCombatLogMessage');
      });
  
      it("should call addCombatLogMessage when player attacks", () => {
        performAttack(player, npc);
        expect(addCombatLogMessage).toHaveBeenCalled();
      });
  
      it("should call addCombatLogMessage when npc attacks", () => {
        performAttack(npc, player);
        expect(addCombatLogMessage).toHaveBeenCalled();
      });
    });
  
    describe("Health Bar Updates", () => {
      beforeEach(() => {
        spyOn(window, 'updateHpBars');
      });
  
      it("should call updateHpBars when player attacks", () => {
        runCombatRound(player, npc);
        expect(updateHpBars).toHaveBeenCalled();
      });
  
      it("should call updateHpBars when npc attacks", () => {
        runCombatRound(npc, player);
        expect(updateHpBars).toHaveBeenCalled();
      });
    });
  
    describe("End of Combat", () => {
      beforeEach(() => {
        spyOn(window, 'runCombatRound');
      });
  
      it("should not call runCombatRound if player's health reaches 0", () => {
        player.hp = 0;
        runCombat();
        expect(runCombatRound).not.toHaveBeenCalled();
      });
  
      it("should not call runCombatRound if npc's health reaches 0", () => {
        npc.hp = 0;
        runCombat();
        expect(runCombatRound).not.toHaveBeenCalled();
      });
    });
  });
  