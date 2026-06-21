function saveOrder(branchName) {
    const item = document.getElementById("item").value;
    const qty = document.getElementById("qty").value;
    const note = document.getElementById("note").value;

    if (!item || !qty) {
        alert("الرجاء تعبئة جميع الحقول المطلوبة");
        return;
    }

    const order = {
        branch: branchName,
        item,
        qty,
        note,
        time: new Date().toLocaleString()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("تم تسجيل الطلب بنجاح");
}

function loadOrders() {
    const list = document.getElementById("orderList");
    if (!list) return;

    list.innerHTML = "";
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.forEach(o => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>الفرع:</strong> ${o.branch}<br>
            <strong>الطلب:</strong> ${o.item}<br>
            <strong>الكمية:</strong> ${o.qty}<br>
            <strong>ملاحظات:</strong> ${o.note || "لا يوجد"}<br>
            <small>${o.time}</small>
        `;
        list.appendChild(li);
    });
}

function clearOrders() {
    if (confirm("هل أنت متأكد من حذف جميع الطلبات؟")) {
        localStorage.removeItem("orders");
        loadOrders();
    }
}

function exportExcel() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        alert("لا توجد طلبات للتصدير");
        return;
    }

    let csv = "الفرع,الطلب,الكمية,ملاحظات,الوقت\n";

    orders.forEach(o => {
        csv += `${o.branch},${o.item},${o.qty},${o.note || ""},${o.time}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders_smsm.csv";
    link.click();
}

loadOrders();
