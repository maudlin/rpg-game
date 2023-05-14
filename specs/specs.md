Feature: Wizard vs Robot Game

  Scenario: Game Initialization
    Given the game is loaded
    When the player chooses a character type (wizard or robot)
    Then the game should initialize with the chosen character type for the player and the remaining character type for the NPC

  Scenario: Displaying Character Stats
    Given the game is initialized
    Then the health bars and the text displaying current and max HP of both the player and the NPC should be visible

  Scenario: Combat Log
    Given the game is initialized
    When the combat starts
    Then the combat log should display a history of combat events in a fixed frame with green monospaced text on a black background
    And the combat log should autoscroll to the bottom without scrollbars

  Scenario: Combat Mechanics
    Given the game is initialized
    When the combat starts
    Then each character should take turns attacking based on their attack speed
    And the combat log should display a message for each attack event (hit or miss)

  Scenario: Health Bar Updates
    Given the game is initialized
    When a character takes damage
    Then the health bar of the damaged character should update to reflect the remaining health

  Scenario: Win or Lose Messages
    Given the game is initialized
    When either the player or the NPC reaches 0 health
    Then a styled "You Win!" or "You Lose" message should appear over the game

  Scenario: End of Combat
    Given the game is initialized
    When either the player or the NPC reaches 0 health
    Then the combat should stop
    And no more attack events should occur
