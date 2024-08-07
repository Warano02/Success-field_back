const lodash = require('lodash')
function randomCatego() {
    const category = ["age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty", "best", "birthday", "buissness", "car", "change", "communication", "computers", "cool", "courage", "dad", "dating", "death", "design", "dreams", "education", "environemental", "equality", "experience", "failure", "faith", "family", "famous", "fear", "fitness", "food", "forgiveness", "freedom", "friendship", "funny", "future", "god", "good", "government", "graduiation", "great", "happiness", "health", "history", "home", "hope", "humor", "imagination", "inspirational", "inteligence", "jealousy", "knowledge", "leadership", "learning", "legal", "life", "love", "marriage", "medical", "men", "mom", "money", "morning", "movies", "success",]
    return lodash.sample(category)
}

module.exports = randomCatego
