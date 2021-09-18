const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		product: {
			title: '',
			description: '',
			img: '',
			price: ''
		},
		editing: false
	})
}

exports.postAddProduct = (req, res, next) => {
	const product = new Product({
		title: req.body.title,
		img: req.body.img,
		description: req.body.description,
		price: req.body.price
	})
	product.save()
	res.redirect('/')
}

exports.getEditProduct = (req, res, next) => {
	const prodId = req.params.productId
	const editMode = req.query.edit
	if (!editMode) {
		res.redirect('/')
	}
	Product.findById(prodId, (product) => {
		if (!product) {
			res.redirect('/')
		}
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			product: product,
			editing: editMode
		})
	})
}

exports.postEditProduct = (req, res, next) => {
	const product = new Product({
		id: req.body.id,
		title: req.body.title,
		img: req.body.img,
		description: req.body.description,
		price: req.body.price
	})
	product.save()
	res.redirect('/')
}

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products'
		})
	})
}
