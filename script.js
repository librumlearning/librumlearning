document.addEventListener('DOMContentLoaded', function() {
    const explanationElement = document.getElementById('explanation');
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const resultElement = document.getElementById('result');
    const failedAttemptsElement = document.getElementById('failedAttempts');
    const hintElement = document.getElementById('hint');
    const hintButton = document.getElementById('hintButton');
    const checkButton = document.getElementById('checkButton');

    // Erklärung zur Lösung der Aufgabe
    explanationElement.textContent = 'Um die Aufgabe zu lösen, führen Sie die angegebenen Rechenschritte aus und geben Sie das Ergebnis ein. Denken Sie daran, die Grundrechenarten zu verwenden.';

    // Generiere eine zufällige mathematische Frage
    function generateRandomMathQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1; // Zufällige Zahl von 1 bis 10
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]; // Zufälliger Operator

        const question = `Was ist ${num1} ${operator} ${num2}?`;
        const answer = eval(`${num1} ${operator} ${num2}`); // Berechnung der richtigen Antwort

        return { question, answer };
    }

    // Generiere eine neue Frage, bei der der Benutzer entscheidet, welche Zahl größer ist
    function generateComparisonQuestion() {
        const num1 = Math.floor(Math.random() * 100) + 1; // Zufällige Zahl von 1 bis 100
        const num2 = Math.floor(Math.random() * 100) + 1;
        const comparison = Math.random() < 0.5 ? 'größer' : 'kleiner';

        const question = `Welche Zahl ist größer: ${num1} oder ${num2}?`;
        const answer = comparison === 'größer' ? Math.max(num1, num2) : Math.min(num1, num2);

        return { question, answer };
    }

    // Optionaler Hinweis
    const hint = 'Hinweis: Denken Sie an die Grundrechenarten.';
    hintButton.addEventListener('click', function() {
        hintElement.textContent = hint;
    });

    // Funktion zur Aktualisierung der Anzeige der Fehlversuche
    function updateFailedAttemptsDisplay() {
        const failedAttempts = localStorage.getItem('failedAttempts');
        if (failedAttempts) {
            failedAttemptsElement.textContent = `Anzahl der Fehlversuche: ${failedAttempts}`;
        }
    }

    // Funktion zum Erhöhen der Anzahl der Fehlversuche
    function incrementFailedAttempts() {
        let failedAttempts = localStorage.getItem('failedAttempts');

        if (failedAttempts === null) {
            failedAttempts = 1;
        } else {
            failedAttempts = parseInt(failedAttempts) + 1;
        }

        localStorage.setItem('failedAttempts', failedAttempts);
    }

    // Generiere eine neue mathematische Frage und zeige sie an
    function generateAndDisplayNewQuestion() {
        const mathProblem = Math.random() < 0.5 ? generateRandomMathQuestion() : generateComparisonQuestion();
        questionElement.textContent = mathProblem.question;
        return mathProblem;
    }

    // Überprüfung der Antwort
    checkButton.addEventListener('click', function() {
        const userAnswer = parseFloat(answerElement.value);

        if (isNaN(userAnswer)) {
            resultElement.textContent = 'Bitte geben Sie eine gültige Zahl ein.';
        } else {
            const mathProblem = generateAndDisplayNewQuestion();

            if (userAnswer === mathProblem.answer) {
                resultElement.textContent = 'Richtig!';
            } else {
                resultElement.textContent = 'Falsch. Versuchen Sie es erneut.';
                incrementFailedAttempts(); // Erhöht die Anzahl der Fehlversuche
            }
            answerElement.value = '';
            updateFailedAttemptsDisplay(); // Aktualisiert die Anzeige der Fehlversuche
            hintElement.textContent = ''; // Setze den Hinweis zurück
        }
    });

    // Initialisiere die erste Frage
    generateAndDisplayNewQuestion();

    // Die Anzahl der Fehlversuche beim Laden der Seite anzeigen
    updateFailedAttemptsDisplay();
});
