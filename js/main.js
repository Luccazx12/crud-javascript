import productdb, {
    bulkcreate,
    getData,
    createEle,
} from './Module.js';

let db = productdb("Productdb", {
    products: `++id, name, seller, price`
});

// input tags
const userid = document.getElementById("userid");
const proname = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");

// buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

//notfound
const notfound = document.getElementById("notfound");


// insere um valor usando o botão Criar
btncreate.onclick = (event) => {
    let flag = bulkcreate(db.products, {
        name: proname.value,
        seller: seller.value,
        price: price.value
    })
    // console.log(flag);

    proname.value = seller.value = price.value = "";
    getData(db.products, (data) => {
        userid.value = data.id + 1 || 1;
    });




    table();

    let insertmsg = document.querySelector(".insertmsg");

    getMsg(flag, insertmsg);

}

// cria um evento no botão btn read
btnread.onclick = table;


// atualiza evento
btnupdate.onclick = () => {
    const id = parseInt(userid.value || 0);
    if (id) {
        db.products.update(id, {
            name: proname.value,
            seller: seller.value,
            price: price.value
        }).then((updated) => {
            //let get = update ? `data Update` : `Couldn't Update Data`;
            let get = updated ? true : false;


            let updatemsg = document.querySelector(".updatemsg");
            getMsg(get, updatemsg);

            proname.value = seller.value = price.value = "";
            console.log(get);
        })
    }
}


// delete records
btndelete.onclick = () => {
    db.delete()
    db = productdb("Productdb", {
        products: `++id, name, seller, price`
    });
    db.open();
    table();
    textID(userid);

    let deletmsg = document.querySelector(".deletemsg");
    getMsg(true, deletemsg);
}



function table() {
    const tbody = document.getElementById("tbody");

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);

    }

    getData(db.products, (data) => {

        if (data) {
            createEle("tr", tbody, tr => {

                for (const key in object) {

                    createEle("td", tr, td => {
                        td.textContent = data.price === data[value] ? `R$${data[value]}` : data[value];
                    })
                }
                createEle("td", tr, td => {
                    createEle("i", td, i => {
                        i.className += "fas fa-edit bntedit";
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = editbtn;
                    })
                })
                createEle("td", tr, td => {
                    createEle("i", td, i => {
                        i.className += "fas fa-trash-alt bntdelete";
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = deletebtn;
                    })
                })
            })
        }
        else {
            notfound.textContent = "No record found in the databasserts...";
        }
    })
    
} 

function editbtn(event) {
    let id = parseInt(event.target.dataset.id);

    db.products.get(id, data => {
        userid.value = data.id || 0;
        proname.value = data.name || "";
        seller.value = data.seller || "";
        price.value = data.price || "";
    })
}

function deletebtn(event) {
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id);

}


function getMsg(flag, elemnent) {
    if (flag) {
        elemnent.className += "movedown";

        setTimeout(() => {
            element.classList.forEach(classname => {
                classname == "movedown" ? undefined : element.classList.remove("movedown");
            });

        }, 4000);
    }
}