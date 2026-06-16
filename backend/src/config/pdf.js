import PDFDocument from "pdfkit";

export const generateTransactionPDF = (transactions, res) => {
    const doc = new PDFDocument({ margin: 30 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=transactions-report.pdf"
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Transactions Report", { align: "center" });
    doc.moveDown();

    let totalIncome = 0;
    let totalExpense = 0;

    doc.fontSize(12);

    transactions.forEach((t, i) => {
        doc.text(
            `${i + 1}. ${t.transactionType.toUpperCase()} | ₹${t.amount} | ${t.category?.name || "N/A"
            } | ${new Date(t.date).toDateString()}`
        );

        if (t.transactionType === "cashIn") {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }

        doc.moveDown(0.3);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total Income: Rs. ${totalIncome}`);
    doc.text(`Total Expense: Rs. ${totalExpense}`);
    doc.text(`Balance: Rs. ${totalIncome - totalExpense}`);

    doc.end();
};