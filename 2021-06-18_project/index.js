//*****************************
// start of getting elements code
//*****************************

// invoice line item section
let tableBodyEl = document.getElementById("tbl_body");
// invoice line item section

// invoice summary section
let totalProductEl = document.getElementById("total_invoice_lines");
let totalQtyEl = document.getElementById("total_qty");
let invoiceSubtotalEl = document.getElementById("total_value");
let vatRateEl = document.getElementById("vat_rate");
let vatAmountEl = document.getElementById("vat_amount");
let discountRateEl = document.getElementById("discount_rate");
let discountAmountEl = document.getElementById("discount_amount");
let invoiceGrandTotalEl = document.getElementById("final_total_value");
// invoice summary section

// getting variables for line item values
let productNameEl = document.getElementById("product_name");
let unitPriceEl = document.getElementById("unit_price");
let saleQtyEl = document.getElementById("sale_qty");
// getting variables for line item values

//*****************************
// end of getting elements code
//*****************************

// declaring variable
let productCount = 0;
let productQty = 0;
let subtotalSum = 0;
let vatTotal = 0;
let discountAmount = 0;
let grandTotalSum = 0;
// declaring variable


/// start of checking values code *****
let buttonEl1 = document.getElementById("add_item");
buttonEl1.addEventListener("click", dataValidation);

function dataValidation() {
    let productName = productNameEl.value;
    let unitPrice = unitPriceEl.value;
    let saleQty = saleQtyEl.value;

    if (productName == "" || unitPrice == "" || saleQty == "") {
        return false;
    } else {
        addItem();
    }
}
/// end  of checking values code *****

// start of adding invoice line item code
function addItem() {
    let productName = productNameEl.value;
    let unitPrice = parseFloat(unitPriceEl.value);
    let saleQty = parseFloat(saleQtyEl.value);

    let tableRow = document.createElement("tr");

    let tdProductName = document.createElement("td");
    productCount++;
    tdProductName.innerHTML = productName;
    tableRow.appendChild(tdProductName);

    let tdUnitPrice = document.createElement("td");
    tdUnitPrice.innerHTML = unitPrice.toFixed(2);
    tableRow.appendChild(tdUnitPrice);

    let tdSaleQty = document.createElement("td");
    productQty += saleQty;
    tdSaleQty.innerHTML = saleQty.toFixed(2);
    tableRow.appendChild(tdSaleQty);

    let tdTotalPrice = document.createElement("td");
    let itemTotal = parseFloat((unitPrice * saleQty).toFixed(2));
    subtotalSum += itemTotal;
    tdTotalPrice.innerHTML = itemTotal;
    tableRow.appendChild(tdTotalPrice);

    tableBodyEl.appendChild(tableRow);

    totalProductEl.innerHTML = productCount;
    totalQtyEl.innerHTML = productQty.toFixed(2);
    invoiceSubtotalEl.innerHTML = subtotalSum.toFixed(2)

    // VAT amount for invoice summary
    vatRateEl.value = 5;
    vatTotal = subtotalSum / 100 * vatRateEl.value;
    vatAmountEl.innerHTML = vatTotal.toFixed(2);

    finalTotalValue();

    productNameEl.value = "";
    unitPriceEl.value = ""
    saleQtyEl.value = ""
}
// end of adding invoice line item code


// start of vat recalculation code
vatRateEl.addEventListener("blur", revisedVat);

function revisedVat() {
    discountAmount = subtotalSum / 100 * discountRateEl.value;
    vatTotal = (subtotalSum - discountAmount) / 100 * vatRateEl.value;
    vatAmountEl.innerHTML = vatTotal.toFixed(2);
    finalTotalValue();
}
// end of vat recalculation code


// start of discount calculation code
discountRateEl.addEventListener("blur", discountCalculation);

function discountCalculation() {
    if (discountRateEl.value == 0) {
        discountAmountEl.innerHTML = "";
    } else {
        discountAmount = subtotalSum / 100 * discountRateEl.value;
        discountAmountEl.innerHTML = discountAmount.toFixed(2);
    }
    revisedVat();
    finalTotalValue();
}
// end of discount calculation code


// start of code for final total value after adding VAT and deducting discount
function finalTotalValue() {
    grandTotalSum = (subtotalSum - discountAmount) + (subtotalSum - discountAmount) / 100 * (vatRateEl.value);
    invoiceGrandTotalEl.innerHTML = grandTotalSum.toFixed(2);
}
// end of code for final total value after adding VAT and deducting discount 


// start of clear/reset invoice code
let clearInvoieEl = document.getElementById("clear_invoice");
clearInvoieEl.addEventListener("click", clearInvoice);

function clearInvoice() {
    let lineitems = document.getElementById("tbl_body").querySelectorAll("td");
    for (let i = 0; i < lineitems.length; i++) {
        lineitems[i].remove();
    }

    // start of code for reset invoice summary table
    productCount = 0;
    totalProductEl.innerHTML = "";

    productQty = 0;
    totalQtyEl.innerHTML = "";

    subtotalSum = 0;
    invoiceSubtotalEl.innerHTML = "";

    vatRateEl.value = "";
    vatAmountEl.innerHTML = "";
    discountRateEl.value = "";
    discountAmountEl.innerHTML = "";

    invoiceGrandTotalEl.innerHTML = "";
    grandTotalSum = "";
    // end of code for reset invoice summary table
}
// end of clear/reset invoice code

function clearProductDetails() {

}