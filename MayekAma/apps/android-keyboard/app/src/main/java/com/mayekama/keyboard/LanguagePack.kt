package com.mayekama.keyboard

object LanguagePack {
    data class Word(
        val canonical: String,
        val aliases: List<String>,
        val meaning: String,
        val frequency: Int
    )

    private val entries = listOf(
        Word("eina", listOf("aina", "ena"), "I / me", 100),
        Word("eigi", listOf("aigi", "egi", "eigii"), "my", 96),
        Word("nang", listOf("nung"), "you", 92),
        Word("nangbu", listOf("nangboo", "nangbu"), "you-object", 90),
        Word("nungshi", listOf("noongshi", "nungsi", "nungsee"), "love", 95),
        Word("kari", listOf("kori", "karino"), "what", 88),
        Word("kadaida", listOf("kadaida", "kadai da"), "where", 86),
        Word("houjik", listOf("hojik", "houjig"), "now", 90),
        Word("lak-u", listOf("laku", "lak-u"), "come", 82),
        Word("chatli", listOf("chatle", "chat-li"), "going", 78),
        Word("leiri", listOf("leire", "leeree"), "is/exists", 84),
        Word("adu", listOf("ado", "adugi"), "that", 86),
        Word("yamna", listOf("yamna", "yam"), "very", 82),
        Word("phajare", listOf("fajare", "phajare"), "good/beautiful", 80),
        Word("thagatchari", listOf("thankchari", "thagatchare", "thagatchari"), "thank you", 78),
        Word("ming", listOf("ming"), "name", 70),
        Word("yum", listOf("yoom", "yum"), "home", 70),
        Word("ima", listOf("ema", "ima"), "mother", 68),
        Word("ipa", listOf("epa", "ipa"), "father", 66),
        Word("ichan", listOf("echan", "ichan"), "child", 62),
        Word("pao", listOf("pao"), "news", 66),
        Word("warol", listOf("warol", "waroul"), "speech / word", 64),
        Word("mayek", listOf("mayek"), "script / letter", 64),
        Word("wahei", listOf("wahei", "wahe"), "word", 62),
        Word("lairik", listOf("lairik", "lairik"), "book", 60),
        Word("imphal", listOf("imfal"), "Imphal", 58),
        Word("manipur", listOf("manipuri", "manipur"), "Manipur", 58),
        Word("school", listOf(), "school", 52),
        Word("college", listOf(), "college", 50),
        Word("teacher", listOf(), "teacher", 48),
        Word("student", listOf(), "student", 48),
        Word("notice", listOf(), "notice", 46),
        Word("article", listOf(), "article", 45),
        Word("letter", listOf(), "letter", 45),
        Word("keyboard", listOf("keybord"), "keyboard", 44),
        Word("download", listOf("dawnload"), "download", 42),
        Word("install", listOf("instal"), "install", 42),
        Word("privacy", listOf(), "privacy", 40),
        Word("standard", listOf(), "standard", 40),
        Word("mayekama", listOf("mayek ama"), "MayekAma", 40)
    )

    private val aliasToCanonical: Map<String, Word> = buildMap {
        entries.forEach { word ->
            put(word.canonical.lowercase(), word)
            word.aliases.forEach { alias -> put(alias.lowercase(), word) }
        }
    }

    private val nextWords = mapOf(
        "eina" to listOf("nangbu", "houjik", "yum-da"),
        "eigi" to listOf("ming", "yum", "warol"),
        "nangbu" to listOf("nungshi", "thagatchari"),
        "nang" to listOf("houjik", "kadaida", "kari"),
        "meeting" to listOf("adu", "houjik"),
        "roman" to listOf("manipuri"),
        "mayekama" to listOf("keyboard", "standard", "writer"),
        "school" to listOf("notice", "student"),
        "article" to listOf("adu", "standard")
    )

    fun standardise(word: String): String {
        val clean = word.lowercase().trim()
        return aliasToCanonical[clean]?.canonical ?: word
    }

    fun candidates(currentBuffer: String, previousContext: String = ""): List<String> {
        val allText = "$previousContext $currentBuffer".lowercase()
        val tokens = Regex("[A-Za-z-]+")
            .findAll(allText)
            .map { it.value }
            .toList()
        val last = Regex("[A-Za-z-]+$")
            .find(currentBuffer.lowercase())
            ?.value
            ?: ""
        val previous = tokens.dropLast(1).lastOrNull() ?: tokens.lastOrNull() ?: ""
        val results = mutableListOf<String>()

        nextWords[previous]?.let { results.addAll(it) }

        if (last.isNotBlank()) {
            aliasToCanonical[last]?.let { results.add(0, it.canonical) }
            entries
                .filter { word ->
                    word.canonical.startsWith(last) || word.aliases.any { it.startsWith(last) }
                }
                .sortedByDescending { it.frequency }
                .take(8)
                .forEach { results.add(it.canonical) }
        }

        if (results.isEmpty()) results.addAll(listOf("eina", "eigi", "nangbu"))
        return results.distinct().take(3)
    }

    fun standardiseSentence(input: String): String {
        return input.split(Regex("(\\s+)"))
            .joinToString("") { token ->
                if (token.isBlank()) token else {
                    val leading = Regex("^[^A-Za-z-]+").find(token)?.value ?: ""
                    val trailing = Regex("[^A-Za-z-]+$").find(token)?.value ?: ""
                    val core = token.removePrefix(leading).removeSuffix(trailing)
                    if (core.isBlank()) token else leading + standardisePreserveCase(core) + trailing
                }
            }
    }

    private fun standardisePreserveCase(word: String): String {
        val standard = standardise(word)
        return when {
            word.all { !it.isLetter() || it.isUpperCase() } -> standard.uppercase()
            word.firstOrNull()?.isUpperCase() == true -> standard.replaceFirstChar { it.uppercase() }
            else -> standard
        }
    }
}
