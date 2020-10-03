module.exports = {
    retrieveInventory: (req, res) => {
        console.log('It worked. Woohoo!')
        const db = req.app.get('db');

        db.retrieve_inventory()
        .then(inventory => res.status(200).send(inventory))
        .catch(err => res.status(500).send(err))
    },
    addProduct: (req, res) => {
        const db = req.app.get('db');
        const { image, name, price } = req.body;

        db.create_inventory([image, name, price])
        .then( () => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    updateProduct: (req, res) => {
        const db = req.app.get('db')
        const {params, body} = req

        db.update_inventory([params.id, body.image, body.name, body.price])
        .then( () => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    deleteProduct: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_inventory(id)
        .then( () => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
};