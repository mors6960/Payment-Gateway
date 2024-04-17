const express = require('express');
const publishableKey = "pk_test_51P6RKpSDWhd1NgPaGYB83hO4EJvibjot6CNVDf598KIlkKauOfs0tDlY7Y45B5PGtZ4mS9DCT9AVLNoil8asPHrK00yPALiWT0";
const secretKey = "sk_test_51P6RKpSDWhd1NgPaen2sq2l7qCt9PSh04IGFakSZwTE5DaUkDNDyUUpGtvetFFo9FDTFep2UGVEmOp01HGUEshYw00OsER2oGr";
const PORT = process.env.PORT || 3000;
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.render('home', {
       key: publishableKey
    });
});
app.post('/payment', function(req, res){
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Antier Solutions',
        address: {
            line1: '8-B Indus Area',
            postal_code: '123456',
            city: 'Mohali',
            state: 'Punjab',
            country: 'India',
        }
    })
    .then((customer) => {

        return stripe.charges.create({
            amount: 250,     // Charging Rs 2.5
            description: 'Web Development',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success") // If no error occurs
    })
    .catch((err) => {
        res.send(err)    // If some error occurs
    });
})
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});