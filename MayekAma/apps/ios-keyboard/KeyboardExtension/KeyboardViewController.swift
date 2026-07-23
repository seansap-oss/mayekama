import UIKit

final class KeyboardViewController: UIInputViewController {
    private let suggestions = UIStackView()
    private var composing = ""
    private let words = ["eina", "eigi", "nang", "nangbu", "nungshi", "houjik", "lak-u", "chatli", "leiri", "kari", "kadaida", "yamna", "nungai"]

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 0.93, green: 0.90, blue: 0.86, alpha: 1)
        buildKeyboard()
        updateSuggestions()
    }

    private func buildKeyboard() {
        let root = UIStackView()
        root.axis = .vertical
        root.spacing = 6
        root.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(root)
        NSLayoutConstraint.activate([
            root.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 6),
            root.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -6),
            root.topAnchor.constraint(equalTo: view.topAnchor, constant: 8),
            root.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -8)
        ])
        suggestions.axis = .horizontal
        suggestions.distribution = .fillEqually
        suggestions.spacing = 5
        root.addArrangedSubview(suggestions)
        ["qwertyuiop", "asdfghjkl", "zxcvbnm"].forEach { addLetterRow($0, to: root) }
        let bottom = UIStackView()
        bottom.axis = .horizontal
        bottom.distribution = .fillProportionally
        bottom.spacing = 5
        ["123", "😊", "MayekAma", "↵"].forEach { label in
            bottom.addArrangedSubview(makeButton(label) { [weak self] in
                if label == "MayekAma" { self?.insert(" ") }
                else if label == "↵" { self?.textDocumentProxy.insertText("
") }
                else { self?.insert(label) }
            })
        }
        root.addArrangedSubview(bottom)
    }

    private func addLetterRow(_ letters: String, to root: UIStackView) {
        let row = UIStackView()
        row.axis = .horizontal
        row.distribution = .fillEqually
        row.spacing = 5
        letters.forEach { ch in row.addArrangedSubview(makeButton(String(ch)) { [weak self] in self?.insert(String(ch)) }) }
        if letters == "zxcvbnm" { row.addArrangedSubview(makeButton("⌫") { [weak self] in self?.backspace() }) }
        root.addArrangedSubview(row)
    }

    private func makeButton(_ title: String, action: @escaping () -> Void) -> UIButton {
        let b = UIButton(type: .system)
        b.setTitle(title, for: .normal)
        b.titleLabel?.font = .systemFont(ofSize: title.count == 1 ? 20 : 14, weight: .semibold)
        b.backgroundColor = .white
        b.tintColor = UIColor(red: 0.55, green: 0.07, blue: 0.06, alpha: 1)
        b.layer.cornerRadius = 7
        b.heightAnchor.constraint(equalToConstant: 44).isActive = true
        b.addAction(UIAction { _ in action() }, for: .touchUpInside)
        return b
    }

    private func insert(_ text: String) {
        textDocumentProxy.insertText(text)
        if text.range(of: "^[A-Za-z-]$", options: .regularExpression) != nil { composing += text } else { composing = "" }
        updateSuggestions()
    }

    private func backspace() {
        textDocumentProxy.deleteBackward()
        if !composing.isEmpty { composing.removeLast() }
        updateSuggestions()
    }

    private func updateSuggestions() {
        suggestions.arrangedSubviews.forEach { $0.removeFromSuperview() }
        let p = composing.lowercased()
        let matched = p.isEmpty ? Array(words.prefix(3)) : Array(words.filter { $0.hasPrefix(p) }.prefix(3))
        for word in matched.isEmpty ? [composing, "eina", "nang"] : matched {
            suggestions.addArrangedSubview(makeButton(word) { [weak self] in
                guard let self else { return }
                for _ in 0..<self.composing.count { self.textDocumentProxy.deleteBackward() }
                self.textDocumentProxy.insertText(word + " ")
                self.composing = ""
                self.updateSuggestions()
            })
        }
    }
}
