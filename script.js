const USER_STORAGE_KEY = "college-admin-users";
const INVENTORY_STORAGE_KEY = "college-lab-inventory";
const LAST_SAVED_KEY = "college-last-saved";

const sampleInventory = [
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 1,
    itemName: "BERNOULLI'S Theorem",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 45068.4,
    specification: "",
    stockRegister: "1",
    supplierName: "KC, Engg. Pvt. Ltd. 96, HSIIDC, Industrial Estate",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 2,
    itemName: "Discharge Through Venturimeter, Orifice & Rotameter",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 55208.4,
    specification: "",
    stockRegister: "2",
    supplierName: "Ambala Cantt-133001 Haryana",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 3,
    itemName: "Discharge Over Notches",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 45068.4,
    specification: "",
    stockRegister: "3",
    supplierName: "",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 4,
    itemName: "Forcced Vortex",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 67688.4,
    specification: "",
    stockRegister: "4",
    supplierName: "",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 5,
    itemName: "Flow Through Orific & Mouth piece",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 45068.4,
    specification: "",
    stockRegister: "5",
    supplierName: "",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 6,
    itemName: "Losses Due to pipe fitting sudden Enlargement",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 46628.4,
    specification: "",
    stockRegister: "6",
    supplierName: "",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 7,
    itemName: "Metacentric Height",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 21668.4,
    specification: "",
    stockRegister: "7",
    supplierName: "",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 8,
    itemName: "Pitot Tube",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 51308.4,
    specification: "",
    stockRegister: "8",
    supplierName: "",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 9,
    itemName: "Reynold's",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 32588.4,
    specification: "",
    stockRegister: "9",
    supplierName: "",
    madeBy: "KC",
    remark: ""
  },
  {
    roomNumber: "106",
    labName: "FM LAB",
    srNo: 10,
    itemName: "Study of pressure Measurement",
    billDate: "2013-06-22",
    billNo: "KCEPL-20/13-14",
    quantity: 1,
    amount: 45068.4,
    specification: "",
    stockRegister: "10",
    supplierName: "",
    madeBy: "KC",
    remark: ""
  }
];

const userForm = document.getElementById("userForm");
const inventoryForm = document.getElementById("inventoryForm");
const userTableBody = document.getElementById("userTableBody");
const inventoryTableBody = document.getElementById("inventoryTableBody");
const userCount = document.getElementById("userCount");
const inventoryCount = document.getElementById("inventoryCount");
const lastSaved = document.getElementById("lastSaved");
const inventoryMeta = document.getElementById("inventoryMeta");
const userSearch = document.getElementById("userSearch");
const inventorySearch = document.getElementById("inventorySearch");
const clearAllDataButton = document.getElementById("clearAllData");
const loadSampleDataButton = document.getElementById("loadSampleData");
const emptyStateTemplate = document.getElementById("emptyStateTemplate");

const getStoredData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    return [];
  }
};

let users = getStoredData(USER_STORAGE_KEY);
let inventory = getStoredData(INVENTORY_STORAGE_KEY);

const saveData = () => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory));
  const savedAt = new Date().toLocaleString();
  localStorage.setItem(LAST_SAVED_KEY, savedAt);
  lastSaved.textContent = savedAt;
};

const updateStats = () => {
  userCount.textContent = users.length;
  inventoryCount.textContent = inventory.length;
  lastSaved.textContent = localStorage.getItem(LAST_SAVED_KEY) || "Not yet";

  if (inventory.length > 0) {
    inventoryMeta.textContent = `Room Number: ${inventory[0].roomNumber || "-"} | Lab Name: ${inventory[0].labName || "-"}`;
  } else {
    inventoryMeta.textContent = "Room Number: - | Lab Name: -";
  }
};

const createEmptyRow = () => {
  const fragment = emptyStateTemplate.content.cloneNode(true);
  return fragment;
};

const formatDate = (dateString) => {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-GB");
};

const formatAmount = (amount) => {
  const number = Number(amount);
  return Number.isNaN(number) ? amount : number.toFixed(2);
};

const renderUsers = (query = "") => {
  userTableBody.innerHTML = "";
  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.phone, user.role, user.address]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  if (filteredUsers.length === 0) {
    const emptyRow = createEmptyRow();
    emptyRow.querySelector("td").setAttribute("colspan", "6");
    userTableBody.appendChild(emptyRow);
    return;
  }

  filteredUsers.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.role}</td>
      <td>${user.address || "-"}</td>
      <td><button class="action-btn" data-type="user" data-id="${user.id}" type="button">Delete</button></td>
    `;
    userTableBody.appendChild(row);
  });
};

const renderInventory = (query = "") => {
  inventoryTableBody.innerHTML = "";
  const filteredInventory = inventory.filter((item) =>
    [
      item.roomNumber,
      item.labName,
      item.srNo,
      item.itemName,
      item.billDate,
      item.billNo,
      item.quantity,
      item.amount,
      item.specification,
      item.stockRegister,
      item.supplierName,
      item.madeBy,
      item.remark
    ]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  if (filteredInventory.length === 0) {
    inventoryTableBody.appendChild(createEmptyRow());
    return;
  }

  filteredInventory
    .sort((first, second) => Number(first.srNo) - Number(second.srNo))
    .forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.srNo}</td>
        <td>${item.itemName}</td>
        <td>${formatDate(item.billDate)}</td>
        <td>${item.billNo || "-"}</td>
        <td>${item.quantity}</td>
        <td>${formatAmount(item.amount)}</td>
        <td>${item.specification || "-"}</td>
        <td>${item.stockRegister || "-"}</td>
        <td>${item.supplierName || "-"}</td>
        <td>${item.madeBy || "-"}</td>
        <td>${item.remark || "-"}</td>
        <td><button class="action-btn" data-type="inventory" data-id="${item.id}" type="button">Delete</button></td>
      `;
      inventoryTableBody.appendChild(row);
    });
};

const resetUserForm = () => userForm.reset();
const resetInventoryForm = () => inventoryForm.reset();

userForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = {
    id: crypto.randomUUID(),
    name: document.getElementById("userName").value.trim(),
    email: document.getElementById("userEmail").value.trim(),
    phone: document.getElementById("userPhone").value.trim(),
    role: document.getElementById("userRole").value.trim(),
    address: document.getElementById("userAddress").value.trim()
  };

  users.unshift(user);
  saveData();
  updateStats();
  renderUsers(userSearch.value);
  resetUserForm();
});

inventoryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const item = {
    id: crypto.randomUUID(),
    roomNumber: document.getElementById("roomNumber").value.trim(),
    labName: document.getElementById("labName").value.trim(),
    srNo: document.getElementById("srNo").value.trim(),
    itemName: document.getElementById("itemName").value.trim(),
    billDate: document.getElementById("billDate").value,
    billNo: document.getElementById("billNo").value.trim(),
    quantity: document.getElementById("quantity").value.trim(),
    amount: document.getElementById("amount").value.trim(),
    specification: document.getElementById("specification").value.trim(),
    stockRegister: document.getElementById("stockRegister").value.trim(),
    supplierName: document.getElementById("supplierName").value.trim(),
    madeBy: document.getElementById("madeBy").value.trim(),
    remark: document.getElementById("remark").value.trim()
  };

  inventory.push(item);
  saveData();
  updateStats();
  renderInventory(inventorySearch.value);
  resetInventoryForm();
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (!target.matches(".action-btn")) {
    return;
  }

  const { type, id } = target.dataset;

  if (type === "user") {
    users = users.filter((user) => user.id !== id);
    renderUsers(userSearch.value);
  }

  if (type === "inventory") {
    inventory = inventory.filter((item) => item.id !== id);
    renderInventory(inventorySearch.value);
  }

  saveData();
  updateStats();
});

userSearch.addEventListener("input", (event) => {
  renderUsers(event.target.value);
});

inventorySearch.addEventListener("input", (event) => {
  renderInventory(event.target.value);
});

clearAllDataButton.addEventListener("click", () => {
  const shouldClear = window.confirm("Are you sure you want to clear all saved users and inventory data?");
  if (!shouldClear) {
    return;
  }

  users = [];
  inventory = [];
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(INVENTORY_STORAGE_KEY);
  localStorage.removeItem(LAST_SAVED_KEY);
  updateStats();
  renderUsers();
  renderInventory();
});

loadSampleDataButton.addEventListener("click", () => {
  const shouldLoad = window.confirm("Load the sample data based on the shared image into the inventory table?");
  if (!shouldLoad) {
    return;
  }

  inventory = sampleInventory.map((item) => ({
    ...item,
    id: crypto.randomUUID()
  }));
  saveData();
  updateStats();
  renderInventory(inventorySearch.value);
});

updateStats();
renderUsers();
renderInventory();
