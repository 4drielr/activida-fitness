document.addEventListener('DOMContentLoaded', function() {
    const userDataForm = document.getElementById('userDataForm');
    const resultSection = document.getElementById('result');
    const exercisePlanDiv = document.getElementById('exercisePlan');
    const dietPlanDiv = document.getElementById('dietPlan');

    userDataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const sport = document.getElementById('sport').value;
        const age = parseInt(document.getElementById('age').value);
        const height = parseInt(document.getElementById('height').value);
        const weight = parseInt(document.getElementById('weight').value);

        // Generate exercise plan
        const exercisePlan = generateExercisePlan(sport, age);
        displayExercisePlan(exercisePlan);

        // Generate diet plan
        const dietPlan = generateDietPlan(weight, height, age);
        displayDietPlan(dietPlan);

        // Show results
        resultSection.classList.remove('hidden');

        // Remove existing download button if present
        const existingButton = resultSection.querySelector('.download-pdf-btn');
        if (existingButton) {
            existingButton.remove();
        }

        // Add download PDF button after the heading
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Descargar PDF';
        downloadButton.className = 'download-pdf-btn';
        downloadButton.onclick = () => generatePDF(exercisePlan, dietPlan);
        const heading = resultSection.querySelector('h2');
        heading.insertAdjacentElement('afterend', downloadButton);

        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    function generateExercisePlan(sport, age) {
        const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const plan = [];

        weekdays.forEach(day => {
            const exercises = [];
            if (sport === 'running') {
                exercises.push(
                    'Calentamiento: 10 minutos de estiramientos',
                    'Carrera suave: 20-30 minutos',
                    'Ejercicios de fuerza: 15 minutos',
                    'Enfriamiento: 10 minutos de estiramientos'
                );
            } else if (sport === 'swimming') {
                exercises.push(
                    'Calentamiento en seco: 10 minutos',
                    'Técnica de natación: 20 minutos',
                    'Ejercicios de resistencia: 15 minutos',
                    'Relajación: 10 minutos'
                );
            } else {
                exercises.push(
                    'Calentamiento general: 15 minutos',
                    'Entrenamiento específico: 30 minutos',
                    'Ejercicios de flexibilidad: 15 minutos'
                );
            }
            plan.push({ day, exercises });
        });

        return plan;
    }

    function generateDietPlan(weight, height, age) {
        // Calcular calorías base (fórmula simplificada)
        const basalMetabolism = 10 * weight + 6.25 * height - 5 * age;
        const calories = Math.round(basalMetabolism * 1.4); // Factor de actividad moderada

        const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const meals = weekdays.map(day => ({
            day,
            meals: [
                {
                    name: 'Desayuno',
                    items: ['Avena con frutas', 'Yogur natural', 'Frutos secos']
                },
                {
                    name: 'Almuerzo',
                    items: ['Ensalada mixta', 'Pechuga de pollo a la plancha', 'Arroz integral']
                },
                {
                    name: 'Cena',
                    items: ['Sopa de verduras', 'Pescado al horno', 'Quinoa']
                }
            ]
        }));

        return { calories, meals };
    }

    function displayExercisePlan(plan) {
        exercisePlanDiv.innerHTML = plan.map(dayPlan => `
            <div class="plan-day">
                <h5>${dayPlan.day}</h5>
                <ul>
                    ${dayPlan.exercises.map(exercise => `<li>${exercise}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    function displayDietPlan(plan) {
        const content = `
            <p class="calories-info">Calorías diarias recomendadas: ${plan.calories}</p>
            ${plan.meals.map(dayPlan => `
                <div class="plan-day">
                    <h5>${dayPlan.day}</h5>
                    ${dayPlan.meals.map(meal => `
                        <div class="meal">
                            <h6>${meal.name}</h6>
                            <ul>
                                ${meal.items.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        `;
        dietPlanDiv.innerHTML = content;
    }
});