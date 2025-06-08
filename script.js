
        // Mobile menu toggle
        document.getElementById('menu-btn').addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        });

        // Energy Chart
        const energyCtx = document.getElementById('energyChart').getContext('2d');
        const energyChart = new Chart(energyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Kohle', 'Erdgas', 'Atomkraft', 'Erneuerbare Energien', 'Sonstige'],
                datasets: [{
                    data: [26, 15, 6, 45, 8],
                    backgroundColor: [
                        '#6B7280',
                        '#EF4444',
                        '#3B82F6',
                        '#10B981',
                        '#F59E0B'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });

        // Quiz Game
        const quizQuestions = [{
            question: "Wie viel Prozent des weltweiten Plastikmülls werden recycelt?",
            options: ["9%", "25%", "50%", "75%"],
            answer: 0,
            explanation: "Nur etwa 9% des weltweiten Plastikmülls werden recycelt. Der Grossteil landet auf Deponien, in Verbrennungsanlagen oder in der Umwelt."
        }, {
            question: "Welche dieser Optionen hat den geringsten CO₂-Fussabdruck für eine 500km-Reise?",
            options: ["Flugzeug", "Auto (allein)", "Bahn", "Auto (mit 4 Personen)"],
            answer: 2,
            explanation: "Die Bahn hat mit etwa 19 kg CO₂ den geringsten Fussabdruck. Ein Flugzeug verursacht etwa 130 kg, ein Auto (allein) etwa 90 kg und ein Auto mit 4 Personen etwa 23 kg pro Person."
        }, {
            question: "Wie viel Wasser wird durchschnittlich für die Produktion von 1 kg Rindfleisch benötigt?",
            options: ["500 Liter", "1.500 Liter", "5.000 Liter", "15.000 Liter"],
            answer: 3,
            explanation: "Für 1 kg Rindfleisch werden etwa 15.000 Liter Wasser benötigt - für Futterproduktion, Tränke und Verarbeitung."
        }, {
            question: "Welches dieser Lebensmittel hat den geringsten CO₂-Fussabdruck?",
            options: ["Avocado", "Banane", "Käse", "Rindfleisch"],
            answer: 1,
            explanation: "Banane (0,8 kg CO₂/kg) < Avocado (1 kg) < Käse (8 kg) < Rindfleisch (13,3 kg)."
        }, {
            question: "Wie viel Energie kann durch das Abschalten von Standby-Geräten eingespart werden?",
            options: ["Bis zu 5%", "Bis zu 10%", "Bis zu 15%", "Bis zu 20%"],
            answer: 1,
            explanation: "Durch Vermeidung von Standby kann ein durchschnittlicher Haushalt bis zu 10% seines Stromverbrauchs einsparen."
        }, {
            question: "Was ist der grösste Verursacher von Mikroplastik in den Ozeanen?",
            options: ["Kosmetikprodukte", "Kunststoffverpackungen", "Autoreifenabrieb", "Fischernetze"],
            answer: 2,
            explanation: "Autoreifenabrieb ist mit etwa 28% die grösste Quelle für Mikroplastik in den Ozeanen."
        }, {
            question: "Wie viel Prozent der weltweiten Lebensmittel werden verschwendet?",
            options: ["10%", "25%", "33%", "50%"],
            answer: 2,
            explanation: "Etwa ein Drittel aller weltweit produzierten Lebensmittel wird verschwendet - das sind etwa 1,3 Milliarden Tonnen pro Jahr."
        }, {
            question: "Welches Land hat den höchsten pro-Kopf-CO₂-Ausstoss?",
            options: ["USA", "China", "Deutschland", "Katar"],
            answer: 3,
            explanation: "Katar hat mit etwa 37 Tonnen pro Kopf den höchsten Ausstoss, gefolgt von den USA (16 Tonnen), Deutschland (9 Tonnen) und China (7 Tonnen)."
        }, {
            question: "Wie viel Prozent der weltweiten Energie könnten bis 2050 aus erneuerbaren Quellen stammen?",
            options: ["30%", "50%", "70%", "90%"],
            answer: 3,
            explanation: "Laut Studien könnte der Anteil erneuerbarer Energien bis 2050 auf 90% steigen, wenn die richtigen politischen und technologischen Weichen gestellt werden."
        }, {
            question: "Was ist der effektivste Einzelbeitrag zur CO₂-Reduktion, den eine Person leisten kann?",
            options: ["Auf Fleisch verzichten", "Flugreisen vermeiden", "Kein Auto besitzen", "Auf erneuerbare Energien umsteigen"],
            answer: 1,
            explanation: "Ein transatlantischer Hin- und Rückflug verursacht etwa 2-3 Tonnen CO₂ - das entspricht etwa einem Viertel des durchschnittlichen Jahresfussabdrucks in Deutschland."
        }];

        let currentQuestion = 0;
        let score = 0;
        let quizStarted = false;

        const quizIntro = document.getElementById('quiz-intro');
        const quizContainer = document.getElementById('quiz-container');
        const quizResult = document.getElementById('quiz-result');
        const startQuizBtn = document.getElementById('start-quiz');
        const nextBtn = document.getElementById('next-btn');
        const restartQuizBtn = document.getElementById('restart-quiz');
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const feedbackElement = document.getElementById('feedback');
        const progressElement = document.getElementById('progress');
        const scoreElement = document.getElementById('score');
        const resultTextElement = document.getElementById('result-text');

        startQuizBtn.addEventListener('click', startQuiz);
        nextBtn.addEventListener('click', nextQuestion);
        restartQuizBtn.addEventListener('click', restartQuiz);

        function startQuiz() {
            quizStarted = true;
            currentQuestion = 0;
            score = 0;
            quizIntro.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            loadQuestion();
        }

        function loadQuestion() {
            const question = quizQuestions[currentQuestion];
            questionElement.textContent = question.question;
            optionsElement.innerHTML = '';

            progressElement.textContent = `Frage ${currentQuestion + 1} von ${quizQuestions.length}`;
            scoreElement.textContent = `Punkte: ${score}`;

            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300';
                button.textContent = option;
                button.dataset.index = index;
                button.addEventListener('click', selectAnswer);
                optionsElement.appendChild(button);
            });

            feedbackElement.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }

        function selectAnswer(e) {
            if (quizStarted) {
                const selectedButton = e.target;
                const selectedIndex = parseInt(selectedButton.dataset.index);
                const question = quizQuestions[currentQuestion];

                // Disable all buttons
                const buttons = optionsElement.querySelectorAll('button');
                buttons.forEach(button => {
                    button.disabled = true;
                    button.classList.remove('hover:bg-gray-200');
                    if (parseInt(button.dataset.index) === question.answer) {
                        button.classList.add('bg-emerald-100', 'text-emerald-800');
                    } else if (parseInt(button.dataset.index) === selectedIndex && selectedIndex !== question.answer) {
                        button.classList.add('bg-red-100', 'text-red-800');
                    }
                });

                // Check answer
                if (selectedIndex === question.answer) {
                    score++;
                    scoreElement.textContent = `Punkte: ${score}`;
                    feedbackElement.className = 'p-4 rounded-lg mb-6 bg-emerald-100 text-emerald-800';
                    feedbackElement.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Richtig! ${question.explanation}`;
                } else {
                    feedbackElement.className = 'p-4 rounded-lg mb-6 bg-red-100 text-red-800';
                    feedbackElement.innerHTML = `<i class="fas fa-times-circle mr-2"></i> Falsch. ${question.explanation}`;
                }

                feedbackElement.classList.remove('hidden');
                nextBtn.classList.remove('hidden');
            }
        }

        function nextQuestion() {
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }

        function showResult() {
            quizContainer.classList.add('hidden');
            quizResult.classList.remove('hidden');

            const percentage = Math.round((score / quizQuestions.length) * 100);
            let message = '';

            if (percentage >= 80) {
                message = `Herzlichen Glückwunsch! Du hast ${score} von ${quizQuestions.length} Fragen richtig beantwortet (${percentage}%). Du bist ein echter Nachhaltigkeitsexperte!`;
            } else if (percentage >= 50) {
                message = `Gut gemacht! Du hast ${score} von ${quizQuestions.length} Fragen richtig beantwortet (${percentage}%). Du kennst dich schon gut aus, aber es gibt noch mehr zu lernen.`;
            } else {
                message = `Du hast ${score} von ${quizQuestions.length} Fragen richtig beantwortet (${percentage}%). Schau dir die Erklärungen zu den Fragen an und versuche es noch einmal!`;
            }

            resultTextElement.textContent = message;
        }

        function restartQuiz() {
            quizResult.classList.add('hidden');
            startQuiz();
        }

        // Feedback form
        document.getElementById('feedback-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the data to a server
            alert('Vielen Dank für dein Feedback! Deine Nachricht wurde erfolgreich übermittelt.');
            this.reset();
        });
    