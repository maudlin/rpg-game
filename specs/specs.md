Feature: Combat Log
  As a player
  I want to see the events that occur during combat
  So that I can understand what's happening in the game

  Scenario: Displaying successful attack events
    Given the player has started combat
    When a character successfully attacks another character
    Then the combat log should show a message indicating the attacker's name, the damage dealt, and the defender's remaining HP

  Scenario: Displaying missed attack events
    Given the player has started combat
    When a character misses an attack on another character
    Then the combat log should show a message indicating the attacker's name and that the attack missed

  Scenario: Displaying a character's defeat
    Given the player has started combat
    When a character's HP reaches 0
    Then the combat log should show a message indicating the defeated character's name and that they were defeated

  Scenario: Displaying timestamps for combat events
    Given the player has started combat
    When an event occurs during combat
    Then the combat log should show a timestamp for that event

  Scenario: Color-coding combat log messages
    Given the player has started combat
    When an event occurs during combat
    Then the combat log should display the message in a color that represents the type of event (e.g., green for successful attacks, red for missed attacks, and gray for defeated characters)

Feature: Character Selection
  As a player
  I want to choose between playing as a wizard or a robot
  So that I can have different abilities, health, resistances, and damage types

  Scenario: Player selects the wizard character
    Given the player is at the character selection screen
    When the player chooses to play as a wizard
    Then the player's character should have wizard-specific health, resistances, and damage types

  Scenario: Player selects the robot character
    Given the player is at the character selection screen
    When the player chooses to play as a robot
    Then the player's character should have robot-specific health, resistances, and damage types
