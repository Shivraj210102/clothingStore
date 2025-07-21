var express = require("express");
var exe = require("./../connection");
var router = express.Router();


router.get("/",checkAdminAuth,async function(req,res){
     var customerSQL = "SELECT COUNT(*) AS total_customers FROM customers";
  var productSQL = "SELECT COUNT(*) AS total_products FROM product";
  var orderSQL = "SELECT COUNT(*) AS total_orders FROM order_tbl";
  var revenueSQL = "SELECT SUM(order_amount) AS total_revenue FROM order_tbl WHERE payment_status = 'paid'";
  var recentOrdersSQL = "SELECT * FROM order_tbl ORDER BY order_id DESC LIMIT 5";
   
//   var result = await exe(sql);
  var [customers] = await exe(customerSQL);
  var [products] = await exe(productSQL);
  var [orders] = await exe(orderSQL);
  var [revenue] = await exe(revenueSQL);
  var recentOrders = await exe(recentOrdersSQL);
  var obj =  {
    customers: customers.total_customers,
    products: products.total_products,
    orders: orders.total_orders,
    revenue: revenue.total_revenue || 0,
    recentOrders: recentOrders
  }
    res.render("admin/index.ejs",obj);
});

// In your admin.js or appropriate route file
router.get("/order-status-summary", async function (req, res) {
  try {
    const sql = `
      SELECT 
        SUM(CASE WHEN order_status = 'pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN order_status = 'dispatched' THEN 1 ELSE 0 END) AS dispatched,
        SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered,
        SUM(CASE WHEN order_status = 'returned' THEN 1 ELSE 0 END) AS returned,
        SUM(CASE WHEN order_status = 'reject' THEN 1 ELSE 0 END) AS reject
      FROM order_tbl
    `;
    const result = await exe(sql);
    res.json(result[0]); // send JSON response to frontend
  } catch (err) {
    console.error("Error in /admin/order-status-summary:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/product-status-summary", async function (req, res) {
  try {
    const sql = `
      SELECT 
        SUM(CASE WHEN product_name = 'T-shirt' THEN 1 ELSE 0 END) AS t_shirt,
        SUM(CASE WHEN product_name = 'Pants' THEN 1 ELSE 0 END) AS pants,
        SUM(CASE WHEN product_name = 'Shirt' THEN 1 ELSE 0 END) AS shirt,
        SUM(CASE WHEN product_name = 'Jacket' THEN 1 ELSE 0 END) AS jacket,
        SUM(CASE WHEN product_name = 'Kurti' THEN 1 ELSE 0 END) AS kurti
      FROM product;
    `;

    const result = await exe(sql);
    res.json(result[0]);
  } catch (error) {
    console.error("Chart error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/login", function(req,res){
    
    res.render("admin/login.ejs");

});
router.post("/login_process",async function(req,res){
    var d = req.body;
    var sql = `SELECT * FROM admin WHERE admin_email = '${d.admin_email}' AND admin_password = '${d.admin_password}' `;
    var data = await exe(sql);
    if(data.length > 0 )
    {
        req.session.admin_id = data[0]['admin_id'];
        res.redirect("/admin"); 
        // res.send("Login Success");
    }
    else
    {
        res.send("Login Failed")
    }
// res.send(req.body);
});
function checkAdminAuth(req, res, next) {
    if (req.session.admin_id) {
        next();
    } else {
        res.redirect("/admin/login");
    }
}

router.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/admin/login.ejs");
});


router.get("/about_company",checkAdminAuth, async function(req,res){
    var data = await exe(`SELECT * FROM company`);
    var obj = {"company_info":data[0]}
    res.render("admin/about_company.ejs",obj);
});
router.post("/save_company_details",async function(req,res){
    // res.send(req.body)
    var d = req.body;
    req.body.company_image = new Date().getTime()+req.files.company_image.name;
    req.files.company_image.mv("public/uploads/"+req.body.company_image);
    var sql = `UPDATE company SET company_name = '${d.company_name}', company_image = '${d.company_image}', company_mobile = '${d.company_mobile}', company_email = '${d.company_email}', company_address = '${d.company_address}', instagram_link = '${d.instagram_link}', telegram_link = '${d.telegram_link}', twitter_link = '${d.twitter_link}', youtube_link = '${d.youtube_link}', whatsapp_no = '${d.whatsapp_no}'`
    var data = await exe(sql);
    res.redirect("/admin/about_company")
})

router.get("/slider",checkAdminAuth, async function(req,res){
    var data = await exe(`SELECT * FROM  slider`);
    var obj = {"slider":data};
    res.render("admin/slider.ejs",obj);
})
router.post("/save_slider",async function(req,res){
    req.body.slider_image = new Date().getTime()+req.files.slider_image.name;
    req.files.slider_image.mv("public/uploads/"+req.body.slider_image);
    var d = req.body
    var sql = `INSERT INTO slider(slider_title,slider_details,slider_image,button_link,button_text) VALUES ('${d.slider_title}','${d.slider_details}','${d.slider_image}','${d.button_link}','${d.button_text}')`;
    var data = await exe(sql);
// res.send(data);
res.redirect("/admin/slider");
})
router.get("/edit_slider/:slider_id",async function(req,res){
    id = req.params.slider_id;
    var data = await exe(`SELECT * FROM slider WHERE slider_id='${id}'`);
    // res.send(data);
    res.render("admin/edit_slider.ejs",{data:data[0]});
});
router.post("/update_slider/:slider_id",async function(req,res){
    id = req.params.slider_id;
    req.body.slider_image = new Date().getTime()+req.files.slider_image.name;
    req.files.slider_image.mv("public/uploads/"+req.body.slider_image);
    var d = req.body
    var sql = `UPDATE slider SET slider_title = '${d.slider_title}', slider_details = '${d.slider_details}', slider_image = '${d.slider_image}', button_link = '${d.button_link}', button_text = '${d.button_text}' WHERE slider_id='${id}'`
    var data = await exe(sql);
    return res.redirect("/admin/slider");
})
router.get("/delete_slider/:slider_id",async function(req,res){
    id = req.params.slider_id;
  var sql=`DELETE FROM slider WHERE slider_id='${id}'`;
  await exe(sql);
return res.redirect("/admin/slider");
})

router.get("/about",checkAdminAuth,async function(req,res){
    var data = await exe(`SELECT * FROM about`);
    var obj = {"about":data[0]}
    res.render("admin/about.ejs",obj);
});
router.post("/save_about",async function(req,res){
    // res.send(req.body)
    req.body.about_image = new Date().getTime()+req.files.about_image.name;
    req.files.about_image.mv("public/uploads/"+req.body.about_image);
    var d = req.body;
    var sql = `UPDATE about SET about_title = '${d.about_title}', about_details = '${d.about_details}', about_image = '${d.about_image}'`
    var data = await exe(sql);
    res.redirect("/admin/about")
})

router.get("/service",checkAdminAuth,async function(req,res){
    var data = await exe(`SELECT * FROM service`)
    var obj = {"service":data};
    res.render("admin/service.ejs",obj);
});
router.post("/save_service",async function(req,res){
    var d = req.body
    var sql = `INSERT INTO service (service_font,service_title,service_details) VALUES ('${d.service_font}','${d.service_title}','${d.service_details}')`;
    var data = await exe(sql);
    res.redirect("/admin/service");
});
router.get("/edit_service/:service_id",async function(req,res){
    id = req.params.service_id;
    var data = await exe(`SELECT * FROM service WHERE service_id='${id}'`);
    // res.send(data);
    res.render("admin/edit_service.ejs",{data:data[0]});
});
router.post("/update_service/:service_id",async function(req,res){
    // res.send(req.body)
    id = req.params.service_id;
    var d = req.body;
    var sql = `UPDATE service SET service_font = '${d.service_font}', service_title = '${d.service_title}', service_details = '${d.service_details}'  WHERE service_id='${id}'`
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/service")
})
router.get("/delete_service/:service_id",async function(req,res){
    id = req.params.service_id;
  var sql=`DELETE FROM service WHERE service_id='${id}'`;
  await exe(sql);
return res.redirect("/admin/service");
})

router.get("/testimonials",checkAdminAuth,async function(req,res){
    var data = await exe(`SELECT * FROM testimonials`);
    var obj={"testimonials":data};
    res.render("admin/testimonials.ejs",obj);
});
router.post("/save_testimonials",async function (req,res) {
    var d = req.body
    var sql = `INSERT INTO testimonials (testimonials_name,testimonials_details) VALUES ('${d.testimonials_name}','${d.testimonials_details}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/testimonials");
})
router.get("/edit_testimonials/:testimonials_id",async function(req,res){
    id = req.params.testimonials_id;
    var data = await exe(`SELECT * FROM testimonials WHERE testimonials_id='${id}'`);
    res.render("admin/edit_testimonials.ejs",{data:data[0]});
})
router.post("/update_testimonials/:testimonials_id",async function(req,res){
    id = req.params.testimonials_id;
    var d = req.body;
    //  res.send(sql);
    var sql =`UPDATE testimonials SET testimonials_name = '${d.testimonials_name}', testimonials_details = '${d.testimonials_details}' WHERE testimonials_id = '${id}'`;
    var data = await exe(sql);
    res.redirect("/admin/testimonials");
})
router.get("/delete_testimonials/:testimonials_id",async function(req,res){
    id = req.params.testimonials_id;
    var sql = `DELETE FROM testimonials WHERE testimonials_id='${id}'`
     await exe(sql);
    return res.redirect("/admin/testimonials");
})

router.get("/blog",checkAdminAuth,async function(req,res){ 
    var data = await exe(`SELECT * FROM blog`);
    var obj={"blog":data};
    res.render("admin/blog.ejs",obj);
});
router.post("/save_blog",async function(req,res){
    var d = req.body
    req.body.blog_image = new Date().getTime()+req.files.blog_image.name;
    req.files.blog_image.mv("public/uploads/"+req.body.blog_image);
    var sql = `INSERT INTO blog (blog_heading,blog_details,blog_image) VALUES ('${d.blog_heading}','${d.blog_details}','${d.blog_image}')`;
    var data = await exe(sql);
    // res.send(data);
    return res.redirect("/admin/blog");
})
router.get("/edit_blog/:blog_id",async function(req,res){
    var id = req.params.blog_id;
    var data = await exe(`SELECT * FROM blog WHERE blog_id='${id}'`);
    res.render("admin/edit_blog.ejs",{data:data[0]});
})
router.post("/update_blog/:blog_id",async function(req,res){
    var id = req.params.blog_id;
    var d = req.body;
    req.body.blog_image = new Date().getTime()+req.files.blog_image.name;
    req.files.blog_image.mv("public/uploads/"+req.body.blog_image);
    var sql = `UPDATE blog SET blog_heading = '${d.blog_heading}', blog_details = '${d.blog_details}', blog_image = '${d.blog_image}' WHERE blog_id ='${id}'`;
    var data = await exe(sql);
    return res.redirect("/admin/blog");
})
router.get("/delete_blog/:blog_id",async function(req,res) {
    id = req.params.blog_id;
    var sql = `DELETE FROM blog WHERE blog_id='${id}'`
    await exe(sql);
    return res.redirect("/admin/blog");
})

router.get("/category",checkAdminAuth,async function(req,res){
    var data = await exe(`SELECT * FROM  category`);
    var obj = {"category":data};
    res.render("admin/category.ejs",obj);
//    res.send(data);
});
router.post("/save_category",async function(req,res){
    var d = req.body
    var sql = `INSERT INTO category(category_name) VALUES ('${d.category_name}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/category");
})
router.get("/edit_category/:category_id",async function(req,res){
    id = req.params.category_id;
    var data = await exe(`SELECT * FROM category WHERE category_id='${id}'`);
    // res.send(data);
    res.render("admin/edit_category.ejs",{data:data[0]});
})
router.post("/update_category/:category_id",async function(req,res){
    id = req.params.category_id;
    var d = req.body
    var sql = `UPDATE category SET category_name = '${d.category_name}' WHERE category_id='${id}'`
    var data = await exe(sql);
    return res.redirect("/admin/category");
})
router.get("/delete_category/:category_id",async function(req,res){
    id = req.params.category_id;
    var sql=`DELETE FROM category WHERE category_id='${id}'`;
    await exe(sql);
    return res.redirect("/admin/category");
})

router.get("/add_product",checkAdminAuth,async function(req,res){
    var data = await exe(`SELECT * FROM category`);
    var obj = {"category":data};
    res.render("admin/add_product.ejs",obj);
})
router.post("/save_add_product",async function(req,res){
    if(req.files.product_image1){
        req.body.product_image1 = new Date().getTime()+req.files.product_image1.name;
        req.files.product_image1.mv("public/uploads/"+req.body.product_image1);
    }
    if(req.files.product_image2){
        req.body.product_image2 = new Date().getTime()+req.files.product_image2.name;
        req.files.product_image2.mv("public/uploads/"+req.body.product_image2);
    }
    if(req.files.product_image3){
        req.body.product_image3 = new Date().getTime()+req.files.product_image3.name;
        req.files.product_image3.mv("public/uploads/"+req.body.product_image3);
    }
    else
        req.body.product_image3 = "";
    if(req.files.product_image4){
        req.body.product_image4 = new Date().getTime()+req.files.product_image4.name;
        req.files.product_image4.mv("public/uploads/"+req.body.product_image4);
    }
    else
        req.body.product_image4 = "";
    // res.send(req.body);
    var d = req.body;
    var sql = `INSERT INTO product(category_id, product_name, product_company, product_colors, product_label, product_image1, product_image2, product_image3, product_image4, product_details) VALUES ('${d.category_id}', '${d.product_name}', '${d.product_company}', '${d.product_colors}', '${d.product_label}', '${d.product_image1}', '${d.product_image2}', '${d.product_image3}', '${d.product_image4}', '${d.product_details}')`;
    var data = await exe(sql);
    var product_id = data.insertId;

    for(i=0;i<d.product_size.length;i++){
    var sql1 = `INSERT INTO product_pricing (product_id, product_size, product_price, product_duplicate_price) VALUES 
    ('${product_id}','${d.product_size[i]}','${d.product_price[i]}','${d.product_duplicate_price[i]}')`;
         var data = await exe(sql1);
        //  console.log(data);
    }
// res.send(sql);
    res.redirect("/admin/add_product");
})

router.get("/product_list",checkAdminAuth,async function (req,res) {
    var sql = "SELECT *, (SELECT MIN(product_price) FROM product_pricing WHERE product_pricing.product_id = product.product_id) as min_price, (SELECT MAX(product_price) FROM product_pricing WHERE product_pricing.product_id = product.product_id) as max_price FROM product";
    var data = await exe(sql);
    var obj = {"product":data};
    res.render("admin/product_list.ejs",obj);
})
router.get("/view_product/:product_id", async function (req, res) {
    var id = req.params.product_id;
    var sql = `SELECT * FROM product WHERE product_id = '${id}'`;
    var data = await exe(sql);

    var sql2 = `SELECT * FROM product_pricing WHERE product_id = '${id}'`;
    var pricing = await exe(sql2);

    var obj = { "product_info": data[0], "pricing": pricing };
    res.render("admin/view_product.ejs", obj);
});

router.get("/orders/:status",async function(req,res){
    var status = req.params.status;
    var sql = `SELECT * FROM order_tbl WHERE order_status = '${status}'`
    var data = await exe(sql);
    var obj = {"status":status,"orders":data};
    res.render("admin/orders.ejs",obj);
})

router.get("/order_details/:order_id",async function(req,res){
    var id = req.params.order_id;
    var sql = `SELECT * FROM order_tbl WHERE order_id = '${id}'`
    var order = await exe(sql);
    var order_product = await exe(`SELECT * FROM order_det WHERE order_id = '${id}'`)
    var company_info = await exe(`SELECT * FROM company`)
    var obj = {"order":order[0],"order_product":order_product,"company_info":company_info[0]}
    res.render("admin/order_details.ejs",obj);
})

router.get("/transfer_order/:status/:order_id",async function(req,res){
    var status = req.params.status;
    var order_id = req.params.order_id;
    var today = new Date().toISOString().slice(0,10);
    if(status == 'dispatch')
        var sql = `UPDATE order_tbl SET order_status = 'dispatched', dispatched_date = '${today}' WHERE order_id = '${order_id}'`
    else if(status == 'delivered')
        var sql = `UPDATE order_tbl SET order_status = 'delivered', delivered_date = '${today}' WHERE order_id = '${order_id}'`
    else if(status == 'reject')
        var sql = `UPDATE order_tbl SET order_status = 'reject', rejected_date = '${today}' WHERE order_id = '${order_id}'`
    else if(status == 'return')
        var sql = `UPDATE order_tbl SET order_status = 'returned', returned_date = '${today}' WHERE order_id = '${order_id}'`

    var data = await exe(sql);

    res.redirect("/admin/orders/"+status);
})

router.get("/contact",checkAdminAuth,async function(req,res){
    var data = await exe(`SELECT * FROM  contact`);
    var obj = {"contact":data};
    res.render("admin/contact.ejs",obj);
})


router.get("/profile",checkAdminAuth,async function(req,res){
    res.render("admin/profile.ejs");
});

module.exports = router;