function generatePDF(exercisePlan, dietPlan) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.text('Tu Plan Personalizado Semanal', 20, yPos);
    yPos += 20;

    // Exercise Plan
    doc.setFontSize(16);
    doc.text('Plan de Ejercicios', 20, yPos);
    yPos += 10;

    exercisePlan.forEach(dayPlan => {
        doc.setFontSize(14);
        doc.text(dayPlan.day, 20, yPos);
        yPos += 10;

        doc.setFontSize(12);
        dayPlan.exercises.forEach(exercise => {
            doc.text('• ' + exercise, 30, yPos);
            yPos += 7;
        });
        yPos += 5;

        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
    });

    // Diet Plan
    doc.addPage();
    yPos = 20;

    doc.setFontSize(16);
    doc.text('Plan de Alimentación', 20, yPos);
    yPos += 10;

    doc.setFontSize(14);
    doc.text(`Calorías diarias recomendadas: ${dietPlan.calories}`, 20, yPos);
    yPos += 15;

    dietPlan.meals.forEach(dayPlan => {
        doc.setFontSize(14);
        doc.text(dayPlan.day, 20, yPos);
        yPos += 10;

        doc.setFontSize(12);
        dayPlan.meals.forEach(meal => {
            doc.text(meal.name, 30, yPos);
            yPos += 7;

            meal.items.forEach(item => {
                doc.text('• ' + item, 40, yPos);
                yPos += 7;
            });
            yPos += 3;
        });
        yPos += 5;

        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
    });

    doc.save('plan-personalizado.pdf');
}