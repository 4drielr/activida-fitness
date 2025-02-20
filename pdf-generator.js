function generatePDF(exercisePlan, dietPlan) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPosition = 20;

    // Add title
    doc.setFontSize(20);
    doc.text('Tu Plan Personalizado', 20, yPosition);
    yPosition += 20;

    // Exercise Plan Section
    doc.setFontSize(16);
    doc.text('Plan de Ejercicios', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    exercisePlan.forEach((dayPlan) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }
        // Add day header
        doc.setFont(undefined, 'bold');
        doc.text(dayPlan.day, 20, yPosition);
        yPosition += 10;

        // Add exercises
        doc.setFont(undefined, 'normal');
        dayPlan.exercises.forEach((exercise) => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
            doc.text(`• ${exercise}`, 30, yPosition);
            yPosition += 7;
        });
        yPosition += 5; // Add space between days
    });

    yPosition += 10;

    // Diet Plan Section
    doc.setFontSize(16);
    doc.addPage();
    doc.text('Plan de Alimentación', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    dietPlan.meals.forEach((dayPlan) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }
        // Add day header
        doc.setFont(undefined, 'bold');
        doc.text(dayPlan.day, 20, yPosition);
        yPosition += 10;

        // Add meals
        doc.setFont(undefined, 'normal');
        dayPlan.meals.forEach((meal) => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
            doc.text(meal.name, 30, yPosition);
            yPosition += 7;

            meal.items.forEach((item) => {
                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 20;
                }
                doc.text(`• ${item}`, 40, yPosition);
                yPosition += 7;
            });
            yPosition += 3;
        });
        yPosition += 5; // Add space between days
    });

    // Save the PDF
    doc.save('plan-personalizado.pdf');
}