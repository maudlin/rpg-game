class Character {
  constructor(name, type, hp, attackSpeed, chanceToHit, minDamage, maxDamage) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.maxHp = hp;
    this.attackSpeed = attackSpeed;
    this.chanceToHit = chanceToHit;
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
  }

  takeDamage(damage) {
    this.hp -= damage;
    this.hp = Math.max(this.hp, 0);
  }
}
