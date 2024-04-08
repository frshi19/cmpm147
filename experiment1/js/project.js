// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    modifier: ["Sturdy", "Zealous", "Superior", "Broken", "Mystic", "Celestial", "Murderous", "Righteous", "God-Slaying"],
    weapon: ["Longsword", "Warhammer", "Longbow", "Greatspear", "Starblade", "Katana", "Quarterstaff", "Halberd"],
    trait: ["Flame", "Poison", "Piercing", "The Infinite", "Death", "Justice"],
    how: ["hand-forged", "crafted", "conjured", "made"],
    method: ["anodized", "refined", "enchanted", "unholy", "premium", "$name's"],
    material: ["steel", "dragon skin", "dark matter", "iron", "umbrium", "$material from $place"],
    status: ["stature", "prodigous girth", "ability", "caliber", "standing", "virtue"],
    name: ["Chadd", "Francis", "Cythria", "Kalega", "Piandao", "Legolas", "Zote The Mighty", "Quirrel"],
    place: ["Gouldris", "Sylveria", "Ba Sing Se", "Isengard", "Astora", "Catarina", "Ionia", "Hallownest", "Ashina"],
    removed: ["defeated", "murdered", "killed", "slayed", "destroyed", "decimated", "massacred", "slaughtered", "annihilated", "obliterated"],
    number: ["20", "400", "1,000", "50,000", "one million"],
    unit: ["soldiers", "armies", "spirits", "god-warriors", "enemies"],
    event: ["siege of $place", "battle of $place", "raid of $place", "sacking of $place", "$place genocide", "$place coup"],
    date: ["1142", "807", "932", "1020", "205", "1729", "1332", "1492", "1633"]
  };
  
  const template = `Recieved: $modifier $weapon of $trait.
  
  This weapon was $how using $method $material, truly worthy of a knight of your $status.
  
  It is said that the legendary warrior $name of $place once $removed $number $unit during the $event in $date using this weapon.
  `;
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    box.innerText = story;
  }
  
  /* global clicker */
  clicker.onclick = generate;
  
  generate();
  
}

main();