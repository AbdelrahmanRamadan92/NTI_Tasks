const addCustomerForm = document.querySelector("#addCustomer");
const tbody = document.querySelector("tbody");
const getLocalStorageData = function () {
  let data;
  try {
    data = JSON.parse(localStorage.getItem("Customers"));
    if (!data || !Array.isArray(data)) throw new Error();
  } catch (e) {
    data = [];
  }
  return data;
};
const setDataToLocalStorage = function (data) {
  localStorage.setItem("Customers", JSON.stringify(data));
};
const addCustomer = (customerData) => {
  let data = getLocalStorageData();
  data.push(customerData); // add new item after last arry item
  setDataToLocalStorage(data);
};
if (addCustomerForm) {
  addCustomerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent relod to page & prevet appearnce of data in query sting in url
    const customer = {
      accNum: Date.now(),
      name: this.elements.customerName.value,
      balance: this.elements.customerBalance.value,
      adress: {
        city: this.elements.customerCity.value,
        street: this.elements.customerStreet.value,
        building: this.elements.customeBuilding.value,
      },
      transactions: [],
    };
    addCustomer(customer);
    this.reset();// empty the form inputs
    window.location.replace("index.html");
  });
}
const deleteEle = (i, customers) => {
  customers.splice(i, 1);
  setDataToLocalStorage(customers);
  showCustomers(customers);
};
const createMyOwnElement = function(parent, ele, txt = null, classes = null){
  myElement = document.createElement(ele);
  parent.appendChild(myElement);
  if (txt) myElement.textContent = txt;
  if (classes) myElement.classList = classes;
  return myElement;
};
const showCustomers = (customers) => {
  tbody.textContent = "";
  customers.forEach((customer, i) => { // i mean index 
    const tr = createMyOwnElement(tbody, "tr");
      createMyOwnElement(tr, "td", customer.accNum);
      createMyOwnElement(tr, "td", customer.name);
      createMyOwnElement(tr, "td", customer.balance);
    const td = createMyOwnElement(tr, "td");
    const delBtn = createMyOwnElement(
      td,
      "button",
      "delete",
      "btn btn-danger mx-2"
    );
    delBtn.addEventListener("click", () => deleteEle(i, customers));
    const showBtn = createMyOwnElement(
      td,
      "button",
      "show",
      "btn btn-primary mx-2 showBtn"
    );
    
    showBtn.addEventListener("click", function (e) {
      const single = document.querySelector("#single");
      s = document.querySelectorAll(".showBtn");
      s.forEach((ss, ind) => {
        if (ind != i) ss.textContent = "show";
      });
      if (this.textContent == "show") {
        single.classList.remove("d-none");
        this.textContent = "hide";
        single.textContent = customer.balance;
      } else {
        single.classList.add("d-none");
        this.textContent = "show";
      }
    });
    const editBtn = createMyOwnElement(
      td,
      "button",
      "edit",
      "btn btn-warning mx-2"
    );
    editBtn.addEventListener("click", function (e) {
      localStorage.setItem("editId", i);
      window.location.replace("editeCustomer.html");
    });
    const addBalanceBtn = createMyOwnElement(
        td,
        "button",
        "Add Balance",
        "btn btn-primary mx-2"
      );
      addBalanceBtn.addEventListener("click", function (e) {
        localStorage.setItem("customerIndex", i);
        window.location.replace("addBalance.html");
      });
    const withDrawBtn = createMyOwnElement(
        td,
        "button",
        "WithDrawing",
        "btn btn-primary mx-2"
    );  
      withDrawBtn.addEventListener("click", function (e) {
        localStorage.setItem("customerIndex", i);
        window.location.replace("withDraw.html");
      });
  });
};

if (tbody) {
  let data = getLocalStorageData();
  showCustomers(data);
}
const addBalanceForm = document.querySelector("#addBalance")
if(addBalanceForm){
    try{
    if(!localStorage.getItem("customerIndex")) throw new Error()
    const customerIndex = localStorage.getItem("customerIndex")
    const customers = getLocalStorageData()
    //convert string data from local storge to number
    const oldBalance = Number (customers[customerIndex].balance)
    // console.log(typeof (oldBalance))
    addBalanceForm.addEventListener("submit" , function(e){
        e.preventDefault()
        const newBalance = oldBalance + Number(this.elements.customerBalance.value)
        customers[customerIndex].balance = newBalance
        setDataToLocalStorage(customers)
        localStorage.removeItem("customerIndex")
        window.location.replace("index.html");
    })
}
catch(e){
    window.location.replace("index.html");
}
}
const withDrawForm = document.querySelector("#withDraw")
if(withDrawForm){
    try{
    if(!localStorage.getItem("customerIndex")) throw new Error("sorry user not found")
    const customerIndex = localStorage.getItem("customerIndex")
    const customers = getLocalStorageData()
    //convert string data from local storge to number
    const balance = Number (customers[customerIndex].balance)
    // console.log(typeof(balance))
    withDrawForm.addEventListener("submit" , function(e){
        e.preventDefault()
        const withDrawAmount = Number (withDrawForm.elements.withDraw.value)
        // console.log(typeof(withDrawAmount))
        let withDrawError = document.querySelector("#withDrawError");
        if( withDrawAmount < 100){
            withDrawError.textContent = "Sorry Your amount must be Greater Than 100 "}
        else if(withDrawAmount > balance) {
            withDrawError.textContent = `Sorry Your amount must be less Than your ${balance}`}
            else{
        const withDraw = {
            type : "withDraw",
            amount: withDrawAmount,
        }
        const newBalance = balance - withDrawAmount
        customers[customerIndex].balance = newBalance
        customers[customerIndex].transactions = withDraw;
        setDataToLocalStorage(customers)
        localStorage.removeItem("customerIndex")
        window.location.replace("index.html");
    }
    })
}
catch(e){
    console.log(e)
}
}

const editCustomer = document.querySelector("#editCustomer");
if (editCustomer) {
  try {
    if (!localStorage.getItem("editId")) window.location.replace("index.html");
    const customers = getLocalStorageData();
    const i = localStorage.getItem("editId");
    editCustomer.elements.customerName.value = customers[i].name;
    editCustomer.elements.customerBalance.value = customers[i].balance;
    editCustomer.elements.customerCity.value = customers[i].adress.city;
    editCustomer.elements.customerStreet.value = customers[i].adress.street;
    editCustomer.elements.customeBuilding.value = customers[i].adress.building;
    editCustomer.addEventListener("submit", function (e) {
      e.preventDefault();
      customers[i].name = editCustomer.elements.customerName.value 
      customers[i].balance =  editCustomer.elements.customerBalance.value
      customers[i].adress.city = editCustomer.elements.customerCity.value
      customers[i].adress.street = editCustomer.elements.customerStreet.value 
      customers[i].adress.building = editCustomer.elements.customeBuilding.value 
      setDataToLocalStorage(customers);
      localStorage.removeItem("editId");
      window.location.replace("index.html");
    });
  } catch (e) {
    window.location.replace("index.html");
  }
}
