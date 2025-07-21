var express = require("express");
var exe = require("./../connection");
var url = require("url");
const { send } = require("express/lib/response");
const { exit } = require("process");
var router = express.Router();

function checklogin(req){
    if(req.session.customer_id)
        return true;
    else
        return false;
}


router.get("/register",async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"is_login":checklogin(req)}
    res.render("user/register.ejs",obj);
})
router.post("/do_register",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO customers (customer_name,customer_email,customer_mobile,customer_password) VALUES ('${d.customer_name}','${d.customer_email}','${d.customer_mobile}','${d.customer_password}')`;
    var data = await exe(sql);
    // res.send(data);
    return res.redirect("/login");
})

router.get("/login",async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var obj = {"company_info":data[0],"is_login":checklogin(req)}
    res.render("user/login.ejs",obj);
})
    
    
router.post("/do_login",async function(req,res){
    var d = req.body;
    var sql = `SELECT * FROM customers WHERE customer_mobile = '${d.customer_mobile}' AND customer_password = '${d.customer_password}'`;
    var data = await exe(sql);
    if(data.length > 0)
    {
        req.session.customer_id = data[0]['customer_id'];
        res.redirect("/");
    }
    else
    {
        res.send("login failed");
    }
})

function verifyUrl(req,res,next){
    req.session.customer_id = req.session.customer_id;
    if(req.session.customer_id)
        next();
    else
        res.redirect("/login");
}

router.get("/",verifyUrl,async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var slider = await exe("SELECT * FROM slider");
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"slider":slider,"customer":customer[0],"is_login":checklogin(req)};
    res.render("user/index.ejs",obj);
});

router.get("/about",verifyUrl,async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"is_login":checklogin(req)}
    res.render("user/about.ejs",obj);
})

router.get("/shop",verifyUrl,async function(req,res){
    var url_data = url.parse(req.url,true).query;
    var category = await exe(`SELECT * FROM category`);
    var colors = await exe(`SELECT product_colors FROM product GROUP BY product_colors`);
    var companies = await exe(`SELECT product_company FROM product GROUP BY product_company`);
    cond = "";
    if(url_data.category_id != undefined){
        cond = ` WHERE category_id = '${url_data.category_id}'`;
    }
    if(url_data.colors != undefined){
        cond = ` WHERE product_colors = '${url_data.colors}'`;
    }
    if(url_data.company != undefined){
        cond = ` WHERE product_company = '${url_data.company}'`;
    }
    if(url_data.search != undefined){
        cond = ` WHERE product_name LIKE '%${url_data.search}%'`;
    }

    var total_records = await exe(`SELECT COUNT(product_id) as total_products FROM product `+cond);
    if(url_data.page)
        var page_no = url_data.page
    else
    var page_no = 1
    var per_page = 4
    var start_point = (per_page * page_no) - per_page
    var total_page = total_records[0]['total_products'] / per_page


    var product = await exe(`SELECT *,(SELECT MIN(product_price) FROM product_pricing WHERE product_pricing.product_id = product.product_id AND product_price>0) as price,
        (SELECT MIN(product_duplicate_price) FROM product_pricing WHERE product_pricing.product_id = product.product_id AND product_price>0) as duplicate_price FROM product `+cond+`LIMIT ${start_point},${per_page}`);
    var data = await exe(`SELECT * FROM company`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"category":category,"colors":colors,"companies":companies,"customer":customer[0],"product":product,"is_login":checklogin(req),"total_page":total_page,"page_no":page_no}
    res.render("user/shop.ejs",obj)
})

router.get("/blog",verifyUrl,async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"is_login":checklogin(req)}
    res.render("user/blog.ejs",obj)
})

router.get("/contact",verifyUrl,async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"is_login":checklogin(req)}
    res.render("user/contact.ejs",obj)
})

router.get("/product_info/:id",async function(req,res){
    id = req.params.id;    
    var data = await exe(`SELECT * FROM company`);
    var product = await exe(`SELECT * FROM product WHERE product_id = '${id}'`)
    var product_pricing = await exe(`SELECT * FROM product_pricing WHERE product_id = '${id}'`);
    if(checklogin(req))
    {
        var customer_id = req.session.customer_id;
        var product_pricing = await exe(`SELECT *,(SELECT MIN(cart_id) FROM cart WHERE customer_id = '${customer_id}' AND cart.product_pricing_id = product_pricing.product_pricing_id) as cart_id FROM product_pricing WHERE product_id = '${id}'`);
        console.log(product_pricing);
    }
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"product":product[0],"product_pricing":product_pricing,"is_login":checklogin(req)};
    res.render("user/product_info.ejs",obj);
})


router.get("/add_to_cart/:product_id/:product_pricing_id",verifyUrl,async function(req,res){
    console.log(req.session);
    var d = req.params;
    d.qty = 1;
    d.customer_id = req.session.customer_id;
    var sql = `INSERT INTO cart (product_id, product_pricing_id, customer_id, qty) VALUES ('${d.product_id}','${d.product_pricing_id}','${d.customer_id}','${d.qty}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/shop");
})

router.get("/logout",function(req,res){
    req.session.customer_id = undefined;
    res.redirect("/login");
})

router.get("/cart",verifyUrl,async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var sql = `SELECT * FROM product,product_pricing,cart WHERE product.product_id = product_pricing.product_id
    AND product_pricing.product_pricing_id = cart.product_pricing_id AND 
    product.product_id = cart.product_id 
    AND cart.customer_id = '${req.session.customer_id}'`;
    var carts = await exe(sql);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"is_login":checklogin(req),"carts":carts}
    res.render("user/cart.ejs",obj);
})
router.get("/cart_deleted/:cart_id",async function(req,res){
    var id = req.params.cart_id;
    var sql=`DELETE FROM cart WHERE cart_id='${id}'`;
    await exe(sql);
    // res.send(sql);
     res.redirect("/cart");
})

router.post("/increace_qty_in_backend",async function(req,res){
    if (!req.body.cart_id) {
    return res.send("cart_id is missing or invalid");
    }
    var sql = `UPDATE cart SET qty=qty+1 WHERE cart_id = '${req.body.cart_id}'`;
    var data = await exe(sql);
    res.send(data);
})
router.post("/decrease_qty_in_backend",async function(req,res){
    var sql = `UPDATE cart SET qty=qty-1 WHERE cart_id = '${req.body.cart_id}'`;
    var data = await exe(sql);
    res.send(data);
});

router.get("/checkout",verifyUrl,async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var sql = `SELECT * FROM product,product_pricing,cart WHERE product.product_id = product_pricing.product_id
    AND product_pricing.product_pricing_id = cart.product_pricing_id AND 
    product.product_id = cart.product_id 
    AND cart.customer_id = '${req.session.customer_id}'`;
    var carts = await exe(sql);
    if(carts.length == 0){
        res.redirect("/shop");
        return;
    }
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"is_login":checklogin(req),"carts":carts}
    res.render("user/checkout.ejs",obj);
})

router.post("/place_order",verifyUrl,async function(req,res){
    var d = req.body;
    var sql = `SELECT * FROM product,product_pricing,cart WHERE product.product_id = product_pricing.product_id
    AND product_pricing.product_pricing_id = cart.product_pricing_id AND 
    product.product_id = cart.product_id 
    AND cart.customer_id = '${req.session.customer_id}'`;
    var carts = await exe(sql);
    var total = 0;
    for(var i=0;i<carts.length;i++)
        total = total + (carts[i].product_price * carts[i].qty);
    var today = new Date().toISOString().slice(0, 10);
    var query = `INSERT INTO order_tbl (customer_name, customer_mobile, customer_state, customer_district, customer_city, customer_area, customer_landmark, customer_address_pincode, payment_mode, order_date, order_amount, payment_status, order_status) VALUES ('${d.customer_name}', '${d.customer_mobile}', '${d.customer_state}', '${d.customer_district}', '${d.customer_city}', '${d.customer_area}', '${d.customer_landmark}', '${d.customer_address_pincode}', '${d.payment_mode}', '${today}', '${total}', 'pending', 'pending')`;
    var data = await exe(query);
    
    var order_id = data.insertId;
    for(var i=0;i<carts.length;i++)
    {
        var sql1 = `INSERT INTO order_det (order_id, product_id, customer_id, product_pricing_id, product_name, product_price, product_colors, product_size, product_image1, product_company, product_qty, product_total) 
        VALUES ('${order_id}', 
        '${carts[i].product_id}', 
        '${req.session.customer_id}', 
        '${carts[i].product_pricing_id}',
        '${carts[i].product_name}',
        '${carts[i].product_price}',
        '${carts[i].product_colors}',
        '${carts[i].product_size}',
        '${carts[i].product_image1}',
        '${carts[i].product_company}',
        '${carts[i].qty}',
        '${(carts[i].qty * carts[i].product_price)}'
        )`
        var result = await exe(sql1);
    }

    var sql2 = `DELETE FROM cart WHERE customer_id = '${req.session.customer_id}'`;
    var result2 = await exe(sql2);
    if(req.body.payment_mode == 'Online')
        res.redirect("/online_payment/"+order_id);
    else
    res.redirect("/order_info/"+order_id);

})

router.get("/order_info/:order_id",verifyUrl, async function(req,res){
    var id = req.params.order_id;
    var data = await exe(`SELECT * FROM company`);
    var order = await exe(`SELECT * FROM order_tbl WHERE order_id = '${id}'`);
    var order_product = await exe(`SELECT * FROM order_det WHERE order_id = '${req.params.order_id}'`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"order":order[0],"customer":customer[0],"is_login":checklogin(req),"order_product":order_product};
    res.render("user/order_info.ejs",obj);
})

router.get("/profile",verifyUrl, async function(req,res) {
    var data = await exe(`SELECT * FROM company`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var orderhistory = await exe(`SELECT * FROM order_det WHERE customer_id = '${req.session.customer_id}' ORDER BY order_det_id DESC`);
    var obj = {"company_info":data[0],"customer":customer[0],"orderhistory":orderhistory,"is_login":checklogin(req)};
    res.render("user/profile.ejs",obj);
});

router.get("/edit_profile/:customer_id",verifyUrl, async function(req,res){
    var id = req.params.customer_id;
    // res.send(id)
    var data = await exe(`SELECT * FROM company`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"is_login":checklogin(req)};
    res.render("user/edit_profile.ejs",obj);
})

router.post("/update_profile/:customer_id",async function(req,res){
    var id = req.params.customer_id;
    var d = req.body
    req.body.customer_image = new Date().getTime()+req.files.customer_image.name;
    req.files.customer_image.mv("public/uploads/"+req.body.customer_image);
    var sql = `UPDATE customers SET customer_name = '${d.customer_name}', customer_email = '${d.customer_email}', customer_mobile = '${d.customer_mobile}', customer_image = '${d.customer_image}', customer_state = '${d.customer_state}', customer_district = '${d.customer_district}', customer_city = '${d.customer_city}', customer_area = '${d.customer_area}', customer_landmark = '${d.customer_landmark}', customer_pincode = '${d.customer_pincode}' WHERE customer_id='${id}'`
    var data = await exe(sql);
    // res.send(data);
    return res.redirect("/profile");
})

router.post("/edit_password/:customer_id",async function(req,res){
    id = req.params.customer_id;
    var d = req.body
    var sql = `UPDATE customers SET customer_password = '${d.customer_password}' WHERE customer_id='${id}'`
    var data = await exe(sql);
    // res.send(data);
    return res.redirect("/profile");
})

// router.get("/forget_password",async function(req,res){
//     var data = await exe(`SELECT * FROM company`);
//     var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
//     var obj = {"company_info":data[0],"customer":customer[0],"is_login":checklogin(req)}
//     res.render("user/forget_password.ejs",obj);
// })

router.get("/online_payment/:order_id",verifyUrl,async function(req,res) {
    var order = await exe(`SELECT * FROM order_tbl WHERE order_id = '${req.params.order_id}'`);
    var data = await exe(`SELECT * FROM company`);
    var customer = await exe(`SELECT * FROM customers WHERE customer_id = '${req.session.customer_id}'`);
    var obj = {"company_info":data[0],"customer":customer[0],"order":order[0],"is_login":checklogin(req)}
    res.render("user/online_payment.ejs",obj)
})

router.post("/confirm_payment/:order_id",async function(req,res){
    // res.send(req.body)
    var transaction_id = req.body.razorpay_payment_id;
    var order_id = req.params.order_id;
    var sql = `UPDATE order_tbl SET payment_status = 'Complete', transaction_id = '${transaction_id}' WHERE order_id = '${order_id}'`
    var data = await exe(sql);
    res.redirect("/order_info/"+order_id);
})

router.post("/contact",async function(req,res){
    var d = req.body
    // res.send(d)
    var sql = `INSERT INTO contact (name, email, message) VALUES ('${d.name}', '${d.email}', '${d.message}');`
    var data = await exe(sql);
    res.redirect("/contact");
})


module.exports = router;