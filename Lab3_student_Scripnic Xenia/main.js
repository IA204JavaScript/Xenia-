//  ШАГ 1. Класс Item 
class Item {
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    getInfo() {
        return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
    }

    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

// Пример использования Item
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());


//  ШАГ 2. Класс Weapon (наследуется от Item) 
class Weapon extends Item {
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    use() {
        if (this.durability > 0) {
            this.durability = Math.max(this.durability - 10, 0);
        }
    }

    repair() {
        this.durability = 100;
    }

    getInfo() {
        return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
    }
}

// Пример использования Weapon
const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(bow.durability);
bow.repair();
console.log(bow.durability);


// ===== ШАГ 3. Тестирование =====
const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());

const axe = new Weapon("Battle Axe", 6.0, "legendary", 40, 80);
console.log(axe.getInfo());

axe.use(); 
axe.use();
console.log(axe.getInfo());

axe.repair();
console.log(axe.getInfo());
